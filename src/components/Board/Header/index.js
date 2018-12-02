import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import isEmpty from "lodash/isEmpty";

import COLORS from "components/Board/constants";

const styles = {
  container: {
    height: "40px",
    padding: "0 10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.HEADER_BG,
    color: COLORS.WHITE
  },
  info: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  board: {
    paddingLeft: "10px"
  },
  label: {
    textTransform: "uppercase",
    paddingRight: "10px",
    borderRight: `1px solid ${COLORS.WHITE}`
  },
  dot: color => ({
    width: "15px",
    height: "15px",
    margin: "0 5px",
    backgroundColor: color,
    borderRadius: "100%"
  }),
  button: {
    height: "40px",
    backgroundColor: COLORS.PRIMARY_BG,
    color: COLORS.PRIMARY_COLOR,
    borderRadius: 0,
    borderRight: `1px solid ${COLORS.WHITE}`,
    borderLeft: `1px solid ${COLORS.WHITE}`
  },
  user: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  initials: {
    padding: "3px",
    marginLeft: "5px",
    backgroundColor: COLORS.WHITE,
    color: COLORS.PRIMARY_COLOR,
    borderRadius: "100%"
  }
};

const Header = ({ selectedBoard, selectedLabel, handleSelectBoard, user }) => (
  <div style={styles.container}>
    <Button style={styles.button} onClick={handleSelectBoard}>
      {isEmpty(selectedBoard) ? "Select board" : "Change board"}
    </Button>

    {!isEmpty(selectedBoard) && !isEmpty(selectedLabel) && (
      <div style={styles.info}>
        <div style={styles.dot(selectedLabel.color)} />
        <div style={styles.label}>{selectedLabel.label}</div>
        <div style={styles.board}>{selectedBoard.label}</div>
      </div>
    )}

    {!isEmpty(user) && (
      <div style={styles.user}>
        <div>{user.fullName}</div>
        <div style={styles.initials}>{user.initials}</div>
      </div>
    )}
  </div>
);

Header.defaultProps = {
  selectedBoard: {},
  selectedLabel: {},
  user: null
};

Header.propTypes = {
  selectedBoard: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  }),
  selectedLabel: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.string
  }),
  user: PropTypes.shape({
    id: PropTypes.string,
    fullName: PropTypes.string,
    initial: PropTypes.string
  }),
  handleSelectBoard: PropTypes.func.isRequired
};

export default Header;
