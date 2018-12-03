import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import { askAuthorization } from "containers/Authorization/actions";
import TrelloIcon from "icons/Trello";
import "containers/Authorization/index.scss";

const Authorization = ({ dispatch }) => (
  <div className="authorize-container">
    <Button
      className="button"
      onClick={() => dispatch(askAuthorization())}
      title="Authorize"
    >
      <div>
        <TrelloIcon />
        Authorize
      </div>
    </Button>
  </div>
);

Authorization.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Authorization);
