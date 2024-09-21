import { useEffect, useState } from 'react';
import UsersList from '../components/usersList/UsersList';
import ModalMessageErreur from '../components/UIElements/ModalMessageErreur';
import Spinner from '../components/UIElements/LoadingSpinner';

import { USERS } from '../data/users';
const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState(USERS);

  return (
    <>
      <UsersList items={loadedUsers} />
    </>
  );
};

export default Users;
