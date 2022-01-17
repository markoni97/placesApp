import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [{
    id: 'u1',
    name: 'Marko Radenkovic',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvPsRD3eL3ZRUbHVNgd3vsuLOaHNkTzQK4bQ&usqp=CAU',
    places: 3
  }];

  return <UsersList items={USERS}/>;
}

export default Users;