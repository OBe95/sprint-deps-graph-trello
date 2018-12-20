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
  if (isSelected) return COLORS.PRIMARY_LIGHT_BG;
  return isFocused
    ? chroma(COLORS.PRIMARY_LIGHT_BG)
        .alpha(0.5)
        .css()
    : null;
};

const colourStyles = error => ({
  control: styles => ({
    ...styles,
    backgroundColor: COLORS.LIGHT,
    borderColor: error ? COLORS.ERROR : styles.borderColor
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: optionBackgroundColor(isSelected, isFocused),
    color: isFocused || isSelected ? COLORS.LIGHT : COLORS.DARK
  })
});

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
    {error && <span style={{ color: COLORS.ERROR }}>{error}</span>}
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
