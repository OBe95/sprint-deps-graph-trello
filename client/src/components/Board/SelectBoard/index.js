import PropTypes from "prop-types";
import React from "react";

import Select from "react-select";

import { colourStyles } from "components/Board/helpers";
import "components/Board/SelectBoard/index.scss";

const formatBoards = boards =>
  boards.map(board => ({
    value: board.id,
    label: board.name
  }));

const SelectBoard = ({
  boards,
  selectedBoard,
  handleSelectedBoardChange,
  error
}) => (
  <div style={{ margin: "10px 0" }}>
    <Select
      name="board"
      isDisabled={boards.length === 0}
      isClearable
      isSearchable
      styles={colourStyles(error)}
      options={formatBoards(boards)}
      value={selectedBoard}
      onChange={handleSelectedBoardChange}
    />
    {error && <span className="error">{error}</span>}
  </div>
);

SelectBoard.defaultProps = {
  boards: [],
  selectedBoard: {},
  error: null
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
  error: PropTypes.string,
  handleSelectedBoardChange: PropTypes.func.isRequired
};

export default SelectBoard;
