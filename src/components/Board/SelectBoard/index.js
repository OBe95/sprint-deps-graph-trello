import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";

const formatBoards = boards =>
  boards.map(board => ({
    value: board.id,
    label: board.name
  }));

const SelectBoard = ({ boards, selectedBoard, handleSelectedBoardChange }) => (
  <Select
    classNamePrefix="board"
    isDisabled={boards.length === 0}
    isClearable
    isSearchable
    name="board"
    options={formatBoards(boards)}
    value={selectedBoard}
    onChange={handleSelectedBoardChange}
  />
);

SelectBoard.defaultProps = {
  boards: [],
  selectedBoard: {}
};

SelectBoard.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ),
  selectedBoard: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  handleSelectedBoardChange: PropTypes.func.isRequired
};

export default SelectBoard;
