import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import DependencyGraph from "components/Board/DependencyGraph";
import Header from "components/Board/Header";
import {
  fetchCards,
  logout,
  resetCards,
  setSelectedBoard,
  setSelectedLabel
} from "containers/Board/actions";
import SelectDialog from "containers/Board/SelectDialog";
import {
  makeSelectCards,
  makeSelectSelectedBoard,
  makeSelectSelectedLabel,
  makeSelectUser
} from "containers/Board/selectors";
import { setMessage } from "containers/Home/actions";

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
        handleLogout={() => dispatch(logout())}
      />

      <SelectDialog
        isSelectDialogOpen={isSelectDialogOpen}
        handleSubmitSelectDialog={handleSubmitSelectDialog}
        handleCloseSelectDialog={() => setIsSelectDialogOpen(false)}
      />

      {cards.length > 0 && (
        <DependencyGraph
          cards={cards}
          displayToaster={(message, type) =>
            dispatch(setMessage(message, type))
          }
        />
      )}
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
