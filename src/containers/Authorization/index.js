import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setTrelloToken } from "containers/Authorization/actions";
import { Trello, LOCAL_STORAGE_KEY, config } from "utils/Trello";

const onClick = dispatch => () => {
  Trello.authorize({
    ...config,
    success() {
      // TODO: show welcome toaster
      dispatch(setTrelloToken(localStorage.getItem(LOCAL_STORAGE_KEY)));
    },
    error() {
      // TODO: show error toaster
    }
  });
};

const Authorization = ({ dispatch }) => (
  <button type="button" onClick={onClick(dispatch)}>
    Authorize
  </button>
);

Authorization.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Authorization);
