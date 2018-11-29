import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import isEmpty from "lodash/isEmpty";

import {
  fetchBoards,
  resetBoards,
  fetchLabels,
  resetLabels
} from "containers/Board/actions";
import { makeSelectBoards, makeSelectLabels } from "containers/Board/selectors";

import SelectBoard from "components/Board/SelectBoard";
import SelectLabels from "components/Board/SelectLabels";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const SelectDialog = ({
  dispatch,
  boards,
  labels,
  isSelectDialogOpen,
  handleCloseSelectDialog,
  handleSubmitSelectDialog
}) => {
  const [selectedBoard, setSelectedBoard] = useState({});
  const [selectedLabel, setSelectedLabel] = useState({});
  const [selectedBoardError, setSelectedBoardError] = useState(null);
  const [selectedLabelError, setSelectedLabelError] = useState(null);

  const handleSelectedBoardChange = board => {
    setSelectedBoardError(null);
    setSelectedBoard(board);
    setSelectedLabel({});
    dispatch(resetLabels());

    if (board && board.value) {
      dispatch(fetchLabels(board.value));
    }
  };

  const handleSelectedLabelChange = label => {
    setSelectedLabelError(null);
    setSelectedLabel(label);
  };

  const validateAndSubmit = () => {
    let hasError = false;

    if (isEmpty(selectedBoard)) {
      hasError = true;
      setSelectedBoardError("Please select a board to proceed");
    }
    if (isEmpty(selectedLabel)) {
      hasError = true;
      setSelectedLabelError("Please select a label to proceed");
    }

    if (!hasError) {
      handleSubmitSelectDialog(selectedBoard, selectedLabel);
    }
  };

  useEffect(() => {
    dispatch(fetchBoards());

    return () => {
      dispatch(resetBoards());
      dispatch(resetLabels());
    };
  }, []);

  return (
    <div>
      <Dialog
        open={isSelectDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseSelectDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Select your board and label"}
        </DialogTitle>
        <DialogContent>
          <Fragment>
            <SelectBoard
              boards={boards || []}
              selectedBoard={selectedBoard}
              handleSelectedBoardChange={handleSelectedBoardChange}
              error={selectedBoardError}
            />
            <SelectLabels
              labels={labels || []}
              selectedLabel={selectedLabel}
              handleSelectedLabelChange={handleSelectedLabelChange}
              error={selectedLabelError}
            />
          </Fragment>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSelectDialog} color="primary">
            Close
          </Button>
          <Button onClick={validateAndSubmit} color="primary">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SelectDialog.defaultProps = {
  boards: [],
  labels: [],
  isSelectDialogOpen: false
};

SelectDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ),
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      color: PropTypes.string
    })
  ),
  isSelectDialogOpen: PropTypes.bool,
  handleCloseSelectDialog: PropTypes.func.isRequired,
  handleSubmitSelectDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  boards: makeSelectBoards()(state),
  labels: makeSelectLabels()(state)
});

export default connect(mapStateToProps)(SelectDialog);
