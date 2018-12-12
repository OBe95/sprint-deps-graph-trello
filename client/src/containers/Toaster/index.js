import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import "containers/Toaster/index.scss";
import CloseIcon from "icons/Close";

import { resetMessage } from "containers/Home/actions";

const AUTO_CLOSE_TIMEOUT = 3000;

const Toaster = ({ type, message, onClose, dispatch }) => {
  let timer = null;

  useEffect(() => {
    timer = setTimeout(() => {
      dispatch(resetMessage());
    }, AUTO_CLOSE_TIMEOUT);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <SnackbarContent
      className={`toaster ${type}`}
      message={message}
      action={[
        <IconButton key="close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};

Toaster.propTypes = {
  type: PropTypes.oneOf(["success", "error"]).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(Toaster);
