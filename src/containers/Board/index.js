import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  fetchBoards,
  resetBoards,
  fetchLabels,
  resetLabels
} from "containers/Board/actions";
import { makeSelectBoards, makeSelectLabels } from "containers/Board/selectors";

import SelectBoard from "components/Board/SelectBoard";
import SelectLabels from "components/Board/SelectLabels";

const Board = ({ dispatch, boards, labels }) => {
  const [selectedBoard, setSelectedBoard] = useState({});
  const [selectedLabels, setSelectedLabels] = useState([]);

  const handleSelectedBoardChange = board => {
    setSelectedBoard(board);
    setSelectedLabels([]);
    dispatch(resetLabels());

    if (board && board.value) {
      dispatch(fetchLabels(board.value));
    }
  };

  useEffect(() => {
    dispatch(fetchBoards());

    return () => {
      dispatch(resetBoards());
      dispatch(resetLabels());
    };
  }, []);

  return (
    <Fragment>
      <SelectBoard
        boards={boards || []}
        selectedBoard={selectedBoard}
        handleSelectedBoardChange={handleSelectedBoardChange}
      />
      <SelectLabels
        labels={labels || []}
        selectedLabels={selectedLabels}
        handleSelectedLabelsChange={setSelectedLabels}
      />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  boards: makeSelectBoards()(state),
  labels: makeSelectLabels()(state)
});

Board.defaultProps = {
  boards: [],
  labels: []
};

Board.propTypes = {
  dispatch: PropTypes.func.isRequired,
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ),
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      color: PropTypes.string
    })
  )
};
export default connect(mapStateToProps)(Board);
