import PropTypes from "prop-types";
import React from "react";

import Button from "@material-ui/core/Button";

import Select from "react-select";

import "components/Board/DependencyGraph/DependencyForm/index.scss";
import { colourStylesMulti } from "components/Board/helpers";
import FitToPageIcon from "icons/FitToPage";

const formatCards = cards =>
  cards
    .map(card => ({
      value: card.idShort,
      label: `#${card.idShort}`
    }))
    .sort((card1, card2) => {
      if (card1.value < card2.value) return -1;
      return 1;
    });

const DependencyForm = ({
  cards,
  selectedTargets,
  setSelectedTargets,
  selectedSources,
  setSelectedSources,
  handleSubmit,
  handleFitToPage
}) => (
  <div className="dependency-form">
    <div className="select">
      <Select
        name="targets"
        isMulti
        styles={colourStylesMulti()}
        options={formatCards(cards)}
        value={selectedTargets}
        onChange={setSelectedTargets}
      />
    </div>

    <span className="text">depend on</span>

    <div className="select">
      <Select
        name="sources"
        isMulti
        options={formatCards(cards)}
        value={selectedSources}
        onChange={setSelectedSources}
      />
    </div>

    <Button className="add-button" onClick={handleSubmit}>
      Add
    </Button>

    <Button
      className="fit-button"
      title="Fit to page"
      onClick={handleFitToPage}
    >
      <FitToPageIcon />
    </Button>
  </div>
);

DependencyForm.defaultProps = {
  cards: [],
  selectedSources: [],
  selectedTargets: []
};

DependencyForm.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      idShort: PropTypes.number
    })
  ),
  selectedTargets: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string
    })
  ),
  setSelectedTargets: PropTypes.func.isRequired,
  selectedSources: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string
    })
  ),
  setSelectedSources: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFitToPage: PropTypes.func.isRequired
};

export default DependencyForm;
