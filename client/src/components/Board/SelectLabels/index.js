import PropTypes from "prop-types";
import React from "react";

import Select from "react-select";

import { colourStylesWithDot, formatColor } from "components/Board/helpers";
import "components/Board/SelectLabels/index.scss";

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
      styles={colourStylesWithDot(error)}
      value={selectedLabel}
      onChange={handleSelectedLabelChange}
    />
    {error && <span className="error">{error}</span>}
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
