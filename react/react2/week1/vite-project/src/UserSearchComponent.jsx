import React, { useState, useEffect } from "react";
import UserInput from "./UserInput";
import myToken from "./token.js";

const UserSearchComponent = () => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // To prevent showing latest result
    setUsers([]);
    // I created func with short delay to fetch data only when user stopped typing
    const delayInput = setTimeout(() => {
      async function fetchData() {
        try {
          const data = await fetch(
            `https://api.github.com/search/users?q=${value}`,
            {
              headers: {
                Authorization: `${myToken}`,
              },
            }
          );
          const res = await data.json();
          const items = res.items;
          if (items) {
            setError(null);
            const gitUsers = items.map(({ login, id }) => ({
              login,
              id,
            }));
            setUsers(gitUsers);
            console.log(users);
          }
        } catch (error) {
          setError("Error fetching: " + error.message);
        }
      }
      if (value !== "") {
        fetchData();
        setLoading(false);
      }
    }, 200);
    return () => clearTimeout(delayInput);
  }, [value]);
  return (
    <>
      <h1>Github user searcher</h1>
      <h2>{value}</h2>
      <UserInput value={value} setValue={setValue} />
      {value.length > 0 && (
        <ul>
          {loading && <p>Loading...</p>}
          {!loading && users.map((user) => <li key={user.id}>{user.login}</li>)}
        </ul>
      )}
      {users.length === 0 && !loading && <p>No results</p>}
      {error && <p>{error}</p>}
    </>
  );
};

export default UserSearchComponent;
