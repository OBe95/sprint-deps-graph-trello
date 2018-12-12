import React, { useEffect } from "react";
import PropTypes from "prop-types";

import io from "socket.io-client";

const POPUP_NAME = "TRELLO_AUTH_POPUP";

const AuthorizationPopup = ({ handleClose, handleSuccess, handleError }) => {
  let popup = null;
  let socket = null;
  let authorized = false;

  const close = () => {
    if (!authorized) {
      // avoid setting the state of an unmounted component
      handleClose();
    }
    if (socket) {
      socket.disconnect();
    }
    popup = popup || window.open("", POPUP_NAME);
    if (popup) {
      popup.close();
    }
  };

  const check = () => {
    const checker = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(checker);
        close();
      }
    }, 1000);
  };

  const open = () => {
    const width = 500;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const url = `${process.env.REACT_APP_API_URL}/authorize?socketId=${
      socket.id
    }`;
    return window.open(
      url,
      POPUP_NAME,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  };

  useEffect(() => {
    socket = io(process.env.REACT_APP_API_URL);

    socket.on("connect", () => {
      popup = open();

      check();
    });

    socket.on("authorized", token => {
      authorized = true;
      handleSuccess(token);
      close();
    });

    socket.on("unauthorized", error => {
      handleError(error);
      close();
    });

    return () => {
      close();
    };
  }, []);

  return <span />;
};

AuthorizationPopup.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired
};

export default AuthorizationPopup;
