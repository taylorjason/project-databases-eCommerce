import React, { useState, useEffect } from 'react';

function Users({ id }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetch(`http://localhost:3001/users/`);
      if (!result.ok) return;

      const jsonResult = await result.json();
      setUserData(jsonResult);
    })();
  }, []);

  return (
    <div>
      Current Users {console.log('userData is', userData)}
      <ul>
        {userData.map((user) => (
          <li key={user.id}>
            {user.first_name
              ? user.first_name + ' ' + user.last_name
              : 'loading...'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
