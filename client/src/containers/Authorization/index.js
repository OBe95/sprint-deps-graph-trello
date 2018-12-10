import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import { setTrelloToken } from "containers/Authorization/actions";
import TrelloIcon from "icons/Trello";
import "containers/Authorization/index.scss";
import AuthorizationPopup from "components/AuthorizationPopup";

const Authorization = ({ dispatch }) => {
  const [disabled, setDisabled] = useState(false);

  const handleAuthorizeSuccess = token => {
    dispatch(setTrelloToken(token));
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
        />
      )}
    </div>
  );
};

Authorization.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Authorization);
