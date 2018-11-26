import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";
import chroma from "chroma-js";

const DEFAULT_COLOR = "lightblue";

const contrastAdapt = color =>
  chroma.contrast(color, "white") > 2 ? "white" : "black";

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isFocused
        ? chroma("gray")
            .alpha(0.1)
            .css()
        : null,
      color: isSelected ? contrastAdapt(color) : data.color
    };
  },
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: data.color
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: contrastAdapt(chroma(data.color))
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: contrastAdapt(chroma(data.color))
  })
};

const formatColor = color => {
  try {
    chroma(color);
    return color;
  } catch (err) {
    return DEFAULT_COLOR;
  }
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
  selectedLabels,
  handleSelectedLabelsChange
}) => (
  <Select
    closeMenuOnSelect={false}
    isDisabled={labels.length === 0}
    isMulti
    options={formatLabels(labels)}
    styles={colourStyles}
    value={selectedLabels}
    onChange={handleSelectedLabelsChange}
  />
);

SelectLabels.defaultProps = {
  labels: [],
  selectedLabels: []
};

SelectLabels.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      color: PropTypes.string
    })
  ),
  selectedLabels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      color: PropTypes.string
    })
  ),
  handleSelectedLabelsChange: PropTypes.func.isRequired
};

export default SelectLabels;
