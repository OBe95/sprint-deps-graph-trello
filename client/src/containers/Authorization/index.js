import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

import AuthorizationPopup from "components/AuthorizationPopup";
import "containers/Authorization/index.scss";
import TrelloIcon from "icons/Trello";

import { setTrelloToken } from "containers/Authorization/actions";
import { setMessage } from "containers/Home/actions";
import { getErrorMessage } from "containers/Trello/helper";

const Authorization = ({ dispatch }) => {
  const [disabled, setDisabled] = useState(false);

  const handleAuthorizeSuccess = token => {
    dispatch(setTrelloToken(token));
    dispatch(setMessage("Authorization granted", "success"));
  };

  const handleAuthorizeError = error => {
    dispatch(setMessage(getErrorMessage(error), "error"));
  };

  return (
    <div className="authorize-container">
      <Button
        className="button"
        onClick={() => setDisabled(true)}
        title="Authorize"
        disabled={disabled}
      >
        <div>
          <TrelloIcon />
          Authorize
        </div>
      </Button>

      {disabled && (
        <AuthorizationPopup
          handleClose={() => setDisabled(false)}
          handleSuccess={handleAuthorizeSuccess}
          handleError={handleAuthorizeError}
        />
      )}
    </div>
  );
};

Authorization.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Authorization);
