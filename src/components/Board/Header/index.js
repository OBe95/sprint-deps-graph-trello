import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import isEmpty from "lodash/isEmpty";

import COLORS from "components/Board/constants";
import Logout from "components/Board/DependencyGraph/DependencyForm/icons/Logout";

const styles = {
  container: {
    height: "40px",
    padding: "0 10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY_BG,
    color: COLORS.PRIMARY_COLOR
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
    borderRight: `1px solid ${COLORS.PRIMARY_COLOR}`
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
    backgroundColor: COLORS.SECONDARY_BG,
    color: COLORS.SECONDARY_COLOR,
    borderRight: `1px solid ${COLORS.PRIMARY_COLOR}`,
    borderLeft: `1px solid ${COLORS.PRIMARY_COLOR}`
  },
  user: {
    margin: "0 5px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  initials: {
    padding: "3px",
    marginRight: "5px",
    backgroundColor: COLORS.PRIMARY_COLOR,
    color: COLORS.PRIMARY_BG,
    fontSize: "0.8em",
    borderRadius: "100%"
  },
  logout: {
    height: "40px",
    minWidth: "unset",
    backgroundColor: COLORS.SECONDARY_BG,
    color: COLORS.SECONDARY_COLOR,
    borderRight: `1px solid ${COLORS.PRIMARY_COLOR}`,
    borderLeft: `1px solid ${COLORS.PRIMARY_COLOR}`
  }
};

const Header = ({
  selectedBoard,
  selectedLabel,
  handleSelectBoard,
  user,
  handleLogout
}) => (
  <div style={styles.container}>
    <Button style={styles.button} onClick={handleSelectBoard}>
      {isEmpty(selectedBoard) ? "Select board / label" : "Change board / label"}
    </Button>

    <div style={styles.info}>
      {!isEmpty(selectedBoard) && !isEmpty(selectedLabel) && (
        <Fragment>
          <div style={styles.dot(selectedLabel.color)} />
          <div style={styles.label}>{selectedLabel.label}</div>
          <div style={styles.board}>{selectedBoard.label}</div>
        </Fragment>
      )}
    </div>

    {!isEmpty(user) && (
      <div style={styles.user}>
        <div style={styles.initials}>{user.initials}</div>
        <div>{user.fullName}</div>
      </div>
    )}

    <Button style={styles.logout} onClick={handleLogout} title="Logout">
      <Logout />
    </Button>
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
  handleSelectBoard: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default Header;
