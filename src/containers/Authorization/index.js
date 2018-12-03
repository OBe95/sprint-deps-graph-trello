import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import chroma from "chroma-js";

import COLORS from "components/Board/constants";
import { askAuthorization } from "containers/Authorization/actions";
import TrelloIcon from "icons/Trello";

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    backgroundImage: `url("/images/home_bg.jpg")`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  authorize: {
    width: "150px",
    height: "150px",
    backgroundColor: COLORS.SECONDARY_BG,
    color: COLORS.SECONDARY_COLOR,
    margin: "auto",
    borderRadius: "100%",
    boxShadow: `0 0 10px ${chroma(COLORS.SECONDARY_COLOR).alpha(0.3)}`
  }
};

const Authorization = ({ dispatch }) => (
  <div style={styles.container}>
    <Button
      style={styles.authorize}
      onClick={() => dispatch(askAuthorization())}
      title="Authorize"
    >
      <div>
        <TrelloIcon />
        Authorize
      </div>
    </Button>
  </div>
);

Authorization.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Authorization);
