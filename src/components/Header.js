import React from "react";
import "./Header.css";
import PT from "prop-types";
import { Loading } from "./";

const Header = props => {
  const { users } = props;
  if (users.length > 0) {
    return (
      <div className={"header-wrapper"}>
        <div className="title-wrapper">
          <div className="login">
            <img
              className="header-user-pic"
              src={users[1].avatar_url}
              alt="user-pic"
            />
            <p>logged in as {users[1].username}</p>
          </div>
          <h1>Northcoders News</h1>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};

Header.propTypes = {
  users: PT.array.isRequired
};

export default Header;
