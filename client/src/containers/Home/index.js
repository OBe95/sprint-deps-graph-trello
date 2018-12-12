import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";

import WaterMark from "components/WaterMark";
import Authorization from "containers/Authorization";
import Board from "containers/Board";
import Toaster from "containers/Toaster";

import { setTrelloToken } from "containers/Authorization/actions";
import { makeSelectTrelloToken } from "containers/Authorization/selectors";
import { fetchUser } from "containers/Board/actions";
import { resetMessage } from "containers/Home/actions";
import { makeSelectMessageAndType } from "containers/Home/selectors";
import { LOCAL_STORAGE_KEY } from "containers/Trello/constants";

const Home = ({ dispatch, trelloToken, messageAndType }) => {
  useEffect(
    () => {
      const oldTrelloToken = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (oldTrelloToken) {
        dispatch(setTrelloToken(oldTrelloToken));
        dispatch(fetchUser());
      }
    },
    [trelloToken]
  );

  return (
    <Fragment>
      {trelloToken ? <Board /> : <Authorization />}
      <WaterMark />
      {messageAndType.message && (
        <Toaster onClose={() => dispatch(resetMessage())} {...messageAndType} />
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  trelloToken: makeSelectTrelloToken()(state),
  messageAndType: makeSelectMessageAndType()(state)
});

Home.defaultProps = {
  trelloToken: null,
  messageAndType: {}
};

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  trelloToken: PropTypes.string,
  messageAndType: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string
  })
};

export default connect(mapStateToProps)(Home);
