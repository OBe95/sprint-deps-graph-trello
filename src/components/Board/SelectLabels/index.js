import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";
import chroma from "chroma-js";

import COLORS from "components/Board/constants";

const dot = (color = COLORS.GREY) => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10
  }
});

const adaptContrast = color =>
  chroma.contrast(color, COLORS.WHITE) > 2 ? COLORS.WHITE : COLORS.BLACK;

const optionBackgroundColor = (data, isSelected, isFocused) => {
  const color = chroma(data.color);
  if (isSelected) return data.color;
  return isFocused ? color.alpha(0.1).css() : null;
};

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: COLORS.WHITE }),
  option: (styles, { data, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: optionBackgroundColor(data, isSelected, isFocused),
      color: isSelected ? adaptContrast(color) : data.color
    };
  },
  input: styles => ({ ...styles, ...dot() }),
  placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
};

const formatColor = color => {
  let allowedColor = null;
  try {
    allowedColor = chroma(color);
  } catch (err) {
    allowedColor = chroma(COLORS.LABELS_DEFAULT_COLOR);
  }
  return allowedColor.darken().hex();
};

const formatLabels = labels =>
  labels.length > 0
    ? labels
        .filter(label => !!label.name)
        .map(label => ({
          value: label.id,
          label: label.name,
          color: formatColor(label.color)
        }))
    : [];

const SelectLabels = ({ labels, selectedLabel, handleSelectedLabelChange }) => (
  <Select
    label="Single select"
    isDisabled={labels.length === 0}
    options={formatLabels(labels)}
    styles={colourStyles}
    value={selectedLabel}
    onChange={handleSelectedLabelChange}
  />
);

SelectLabels.defaultProps = {
  labels: [],
  selectedLabel: {}
};

SelectLabels.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      color: PropTypes.string
    })
  ),
  selectedLabel: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string
  }),
  handleSelectedLabelChange: PropTypes.func.isRequired
};

export default SelectLabels;
