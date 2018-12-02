import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import Select from "react-select";

const styles = {
  container: {
    height: "40px",
    margin: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  select: {
    flex: 1
  },
  text: {
    margin: "0 10px"
  },
  button: {
    marginLeft: "10px"
  }
};

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
  handleSubmit
}) => (
  <div style={styles.container}>
    <div style={styles.select}>
      <Select
        name="targets"
        isMulti
        options={formatCards(cards)}
        value={selectedTargets}
        onChange={setSelectedTargets}
      />
    </div>
    <span style={styles.text}>depend on</span>
    <div style={styles.select}>
      <Select
        name="sources"
        isMulti
        options={formatCards(cards)}
        value={selectedSources}
        onChange={setSelectedSources}
      />
    </div>
    <Button
      style={styles.button}
      onClick={handleSubmit}
      variant="contained"
      color="primary"
    >
      Add
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
  handleSubmit: PropTypes.func.isRequired
};

export default DependencyForm;
