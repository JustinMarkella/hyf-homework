import React from "react";
import PropTypes from "prop-types";

const EditComponent = ({
  editedId,
  updatedValue,
  setUpdatedValue,
  handleUpdate,
}) => {
  return (
    <>
      <input
        type="text"
        value={updatedValue}
        onChange={(e) => setUpdatedValue(e.target.value)}
      />
      <button onClick={(e) => handleUpdate(editedId, e)}>Update</button>
    </>
  );
};

EditComponent.propTypes = {
  editedId: PropTypes.number.isRequired,
  updatedValue: PropTypes.string.isRequired,
  setUpdatedValue: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default EditComponent;
