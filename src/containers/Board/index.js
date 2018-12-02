import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SelectDialog from "containers/Board/SelectDialog";
import {
  makeSelectSelectedBoard,
  makeSelectSelectedLabel,
  makeSelectCards,
  makeSelectUser
} from "containers/Board/selectors";
import {
  setSelectedBoard,
  setSelectedLabel,
  fetchCards,
  resetCards
} from "containers/Board/actions";
import DependencyGraph from "components/Board/DependencyGraph";
import Header from "components/Board/Header";

const Board = ({ dispatch, selectedBoard, selectedLabel, cards, user }) => {
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
      <Header
        selectedBoard={selectedBoard}
        selectedLabel={selectedLabel}
        user={user}
        handleSelectBoard={() => setIsSelectDialogOpen(true)}
      />

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
  cards: [],
  user: null
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
  ),
  user: PropTypes.shape({
    id: PropTypes.string,
    fullName: PropTypes.string,
    initial: PropTypes.string
  })
};

const mapStateToProps = state => ({
  selectedBoard: makeSelectSelectedBoard()(state),
  selectedLabel: makeSelectSelectedLabel()(state),
  cards: makeSelectCards()(state),
  user: makeSelectUser()(state)
});

export default connect(mapStateToProps)(Board);
