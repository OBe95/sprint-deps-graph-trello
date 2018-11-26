import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { askAuthorization } from "containers/Authorization/actions";

const Authorization = ({ dispatch }) => (
  <button type="button" onClick={() => dispatch(askAuthorization())}>
    Authorize
  </button>
);

Authorization.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Authorization);
