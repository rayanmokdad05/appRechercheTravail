import UsersList from "../components/usersList/UsersList";
import { USERS } from "../data/users";

const Users = () => {
  return <UsersList items={USERS} />;
};

export default Users;
