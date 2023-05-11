import React from "react";

const UserSearchResultComponent = ({ user }) => {
  return <li key={user.id}>{user.login}</li>;
};

export default UserSearchResultComponent;
