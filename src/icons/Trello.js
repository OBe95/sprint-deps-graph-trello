import React from "react";
import PropTypes from "prop-types";

import COLORS from "components/Board/constants";

const TrelloIcon = ({ color }) => (
  <svg x="0px" y="0px" viewBox="0 0 512 512" width="48px" height="48px">
    <g>
      <path
        d="M448,0H64C28.672,0,0,28.672,0,64v384c0,35.328,28.672,64,64,64h384c35.328,0,64-28.672,64-64V64    C512,28.64,483.328,0,448,0z M224,384c0,17.664-14.336,32-32,32H96c-17.664,0-32-14.336-32-32V96c0-17.696,14.336-32,32-32h96    c17.664,0,32,14.304,32,32V384z M448,256c0,17.664-14.336,32-32,32h-96c-17.664,0-32-14.336-32-32V96c0-17.696,14.336-32,32-32h96    c17.664,0,32,14.304,32,32V256z"
        fill={color}
      />
    </g>
  </svg>
);

TrelloIcon.defaultProps = {
  color: COLORS.PRIMARY_COLOR
};

TrelloIcon.propTypes = {
  color: PropTypes.string
};

export default TrelloIcon;
