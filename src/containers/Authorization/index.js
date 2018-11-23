import React from 'react';
import { connect } from 'react-redux'

import { setTrelloToken } from './actions';
import { Trello, LOCAL_STORAGE_KEY, config } from '../../utils/Trello';

const onClick = (dispatch) => () => {
  Trello.authorize({
    ...config,
    success: function () {
      console.log("Successful authentication, show toaster");
      dispatch(setTrelloToken(localStorage.getItem(LOCAL_STORAGE_KEY)));
    },
    error: function () { console.log("Failed authentication, show toaster"); }
  });
};

const Authorization = ({ dispatch }) => {
  return (
    <button onClick={onClick(dispatch)}>Authorize</button>
  );
};

export default connect()(Authorization);