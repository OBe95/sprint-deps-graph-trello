import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Authorization from '../Authorization';
import Board from '../Board';
import { makeSelectTrelloToken } from '../Authorization/selectors';

const Home = ({ trelloToken }) => (
  trelloToken ? (
    <Board></Board>
  ) : (
      <Authorization></Authorization >
    )
);

const mapStateToProps = (state) => ({
  trelloToken: makeSelectTrelloToken()(state)
});

Home.propTypes = {
  trelloToken: PropTypes.string,
};

export default connect(mapStateToProps)(Home);