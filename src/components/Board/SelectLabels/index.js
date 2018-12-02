import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";
import chroma from "chroma-js";

import COLORS from "components/Board/constants";

const dot = (color = COLORS.SECONDARY_LIGHT_BG) => ({
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
  chroma.contrast(color, COLORS.LIGHT) > 2 ? COLORS.LIGHT : COLORS.DARK;

const optionBackgroundColor = (data, isSelected, isFocused) => {
  const color = chroma(data.color);
  if (isSelected) return data.color;
  return isFocused ? color.alpha(0.1).css() : null;
};

const colourStyles = error => ({
  control: styles => ({
    ...styles,
    backgroundColor: COLORS.LIGHT,
    borderColor: error ? COLORS.ERROR : styles.borderColor
  }),
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
});

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

const SelectLabels = ({
  labels,
  selectedLabel,
  handleSelectedLabelChange,
  error
}) => (
  <div style={{ margin: "10px 0" }}>
    <Select
      name="label"
      isDisabled={labels.length === 0}
      options={formatLabels(labels)}
      styles={colourStyles(error)}
      value={selectedLabel}
      onChange={handleSelectedLabelChange}
    />
    {error && <span style={{ color: COLORS.ERROR }}>{error}</span>}
  </div>
);

SelectLabels.defaultProps = {
  labels: [],
  selectedLabel: {},
  error: null
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
  error: PropTypes.string,
  handleSelectedLabelChange: PropTypes.func.isRequired
};

export default SelectLabels;
