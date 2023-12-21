import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/actions/userActions";

const UserList = ({ users, fetchUsers }) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h1>User List</h1>
      {users.map((user) => (
        <div key={user._id}>
          <p>{user.userId}</p>
          <p>{user.mobileNumber}</p>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
