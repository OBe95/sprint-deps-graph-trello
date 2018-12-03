import chroma from "chroma-js";

import COLORS from "styles/colors";

const optionBackgroundColor = (isSelected, isFocused, data = null) => {
  const color = data.color || COLORS.PRIMARY_LIGHT_BG;
  if (isSelected) return color;
  return isFocused
    ? chroma(color)
        .alpha(0.2)
        .css()
    : null;
};

const dot = (color = COLORS.SECONDARY_LIGHT_BG) => ({
  alignItems: "center",
  display: "inline-block",
  maxWidth: "calc(100% - 20px)",

  ":before": {
    backgroundColor: color,
    borderRadius: "10px",
    content: '" "',
    display: "inline-block",
    marginRight: "8px",
    height: "10px",
    width: "10px"
  }
});

const adaptContrast = color =>
  chroma.contrast(color, COLORS.LIGHT) > 2 ? COLORS.LIGHT : COLORS.DARK;

export const colourStyles = error => ({
  control: styles => ({
    ...styles,
    backgroundColor: COLORS.LIGHT,
    borderColor: error ? COLORS.ERROR : COLORS.PRIMARY_LIGHT_BG,
    boxShadow: "none",
    ":hover": {
      borderColor: COLORS.SECONDARY_LIGHT_BG
    }
  }),
  option: (styles, { data, isFocused, isSelected }) => {
    const color = data.color || COLORS.PRIMARY_LIGHT_BG;
    return {
      ...styles,
      backgroundColor: optionBackgroundColor(isSelected, isFocused, data),
      color: isSelected ? adaptContrast(chroma(color)) : color
    };
  }
});

export const colourStylesWithDot = error => ({
  ...colourStyles(error),
  input: styles => ({ ...styles, ...dot() }),
  placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
});

export const colourStylesMulti = error => ({
  ...colourStyles(error),
  multiValue: (styles, { data }) => {
    const color = data.color || COLORS.PRIMARY_LIGHT_BG;
    return {
      ...styles,
      backgroundColor: chroma(color)
        .alpha(0.1)
        .css()
    };
  },
  multiValueLabel: (styles, { data }) => {
    const color = data.color || COLORS.PRIMARY_LIGHT_BG;
    return {
      ...styles,
      color
    };
  },
  multiValueRemove: (styles, { data }) => {
    const color = data.color || COLORS.PRIMARY_LIGHT_BG;
    return {
      ...styles,
      color,
      ":hover": {
        backgroundColor: color,
        color: "white"
      }
    };
  }
});

export const formatColor = color => {
  let allowedColor = null;
  try {
    allowedColor = chroma(color);
  } catch (err) {
    allowedColor = chroma(COLORS.LABELS_DEFAULT_COLOR);
  }
  return allowedColor.darken().hex();
};
