import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";
import chroma from "chroma-js";

import COLORS from "components/Board/constants";

const formatBoards = boards =>
  boards.map(board => ({
    value: board.id,
    label: board.name
  }));

const optionBackgroundColor = (isSelected, isFocused) => {
  if (isSelected) return COLORS.SELECTED_BOARD;
  return isFocused
    ? chroma(COLORS.SELECTED_BOARD)
        .alpha(0.5)
        .css()
    : null;
};

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: COLORS.WHITE }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: optionBackgroundColor(isSelected, isFocused),
    color: isFocused || isSelected ? COLORS.WHITE : COLORS.BLACK
  })
};

const SelectBoard = ({ boards, selectedBoard, handleSelectedBoardChange }) => (
  <Select
    isDisabled={boards.length === 0}
    isClearable
    isSearchable
    styles={colourStyles}
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
