import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import isEmpty from "lodash/isEmpty";

import SelectDialog from "containers/Board/SelectDialog";
import {
  makeSelectSelectedBoard,
  makeSelectSelectedLabel,
  makeSelectCards
} from "containers/Board/selectors";
import {
  setSelectedBoard,
  setSelectedLabel,
  fetchCards,
  resetCards
} from "containers/Board/actions";
import DependencyGraph from "components/Board/DependencyGraph";

const Board = ({ dispatch, selectedBoard, selectedLabel, cards }) => {
  const [isSelectDialogOpen, setIsSelectDialogOpen] = useState(false);

  const handleSubmitSelectDialog = (board, label) => {
    dispatch(resetCards());

    dispatch(setSelectedBoard(board));
    dispatch(setSelectedLabel(label));
    dispatch(fetchCards(board.value, label.label));
    setIsSelectDialogOpen(false);
  };

  return (
    <Fragment>
      {!isEmpty(selectedBoard) && <span>{selectedBoard.label}</span>}
      {!isEmpty(selectedLabel) && (
        <span
          style={{
            backgroundColor: selectedLabel.color,
            padding: "5px 20px",
            borderRadius: "10px"
          }}
        >
          {selectedLabel.label}
        </span>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsSelectDialogOpen(true)}
      >
        Select Board
      </Button>
      <SelectDialog
        isSelectDialogOpen={isSelectDialogOpen}
        handleSubmitSelectDialog={handleSubmitSelectDialog}
        handleCloseSelectDialog={() => setIsSelectDialogOpen(false)}
      />

      {cards.length > 0 && <DependencyGraph cards={cards} />}
    </Fragment>
  );
};

Board.defaultProps = {
  selectedBoard: {},
  selectedLabel: {},
  cards: []
};

Board.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedBoard: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  }),
  selectedLabel: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.string
  }),
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      idShort: PropTypes.number
    })
  )
};

const mapStateToProps = state => ({
  selectedBoard: makeSelectSelectedBoard()(state),
  selectedLabel: makeSelectSelectedLabel()(state),
  cards: makeSelectCards()(state)
});

export default connect(mapStateToProps)(Board);
