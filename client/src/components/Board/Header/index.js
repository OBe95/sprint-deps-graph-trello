import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import isEmpty from "lodash/isEmpty";

import LogoutIcon from "icons/Logout";
import "components/Board/Header/index.scss";

const dot = color => ({
  width: "15px",
  height: "15px",
  margin: "0 5px",
  backgroundColor: color,
  borderRadius: "100%"
});

const Header = ({
  selectedBoard,
  selectedLabel,
  handleSelectBoard,
  user,
  handleLogout
}) => (
  <div className="header">
    <Button className="button" onClick={handleSelectBoard}>
      {isEmpty(selectedBoard) ? "Select board / label" : "Change board / label"}
    </Button>

    <div className="info">
      {!isEmpty(selectedBoard) && !isEmpty(selectedLabel) && (
        <Fragment>
          <div style={dot(selectedLabel.color)} />
          <div className="label">{selectedLabel.label}</div>
          <div className="board">{selectedBoard.label}</div>
        </Fragment>
      )}
    </div>

    {!isEmpty(user) && (
      <div className="user">
        <div className="initials">{user.initials}</div>
        <div>{user.fullName}</div>
      </div>
    )}

    <Button className="logout" onClick={handleLogout} title="Logout">
      <LogoutIcon />
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
