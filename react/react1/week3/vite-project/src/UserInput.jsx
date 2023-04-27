import React from "react";
import PropTypes from "prop-types";

const UserInput = ({ value, setValue }) => {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

UserInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default UserInput;
