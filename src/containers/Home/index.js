import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Authorization from "containers/Authorization";
import Board from "containers/Board";
import { makeSelectTrelloToken } from "containers/Authorization/selectors";
import { setTrelloToken } from "containers/Authorization/actions";
import { LOCAL_STORAGE_KEY } from "constants/Trello";

const Home = ({ dispatch, trelloToken }) => {
  useEffect(() => {
    dispatch(setTrelloToken(localStorage.getItem(LOCAL_STORAGE_KEY)));
  }, []);

  return trelloToken ? <Board /> : <Authorization />;
};

const mapStateToProps = state => ({
  trelloToken: makeSelectTrelloToken()(state)
});

Home.defaultProps = {
  trelloToken: null
};

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  trelloToken: PropTypes.string
};

export default connect(mapStateToProps)(Home);
