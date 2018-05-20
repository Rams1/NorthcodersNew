import React from "react";
import "./Header.css";
import PT from "prop-types";

const Header = props => {
  const { users } = props;
  if (users.length > 0)
    return (
      <div className={"header-wrapper"}>
        <div className="title-wrapper">
          <h1>Northcoders News</h1>
        </div>
        <div className="login">
          <p>logged in as {users[1].username}</p>
        </div>
      </div>
    );
};

Header.propTypes = {
  users: PT.array.isRequired
};

export default Header;
