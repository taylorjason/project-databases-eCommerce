import React, { useState, useEffect } from 'react';

function Users({ id }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetch(`http://localhost:3001/users/`);

      await console.log('running useEffect');
      //   if (!result.ok) return;

      const jsonResult = await result.json();
      console.log(jsonResult);

      setUserData(jsonResult);
    })();
  }, []);

  return (
    <div>
      User Page {console.log('userData is', userData)}
      <ul>
        {userData.map((user) => (
          <li>{user.first_name ? user.first_name : 'loading...'}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
