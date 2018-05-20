import React from "react";
import { Card, Col } from "react-materialize";
import PT from "prop-types";

const Users = props => {
  const users = props.users;

  return (
    <div>
      {users.map(user => {
        return (
          <Col m={7} s={12}>
            <Card
              className="blue-grey"
              textClassName="white-text"
              horizontal
              header={<img src={user.avatar_url} alt="user-pic" />}
              actions={[
                <a>Username {user.username}</a>,
                <a>user Id {user._id}</a>
              ]}
            >
              {user.name}
            </Card>
          </Col>
        );
      })}
    </div>
  );
};

Users.propTypes = {
  users: PT.array.isRequired
};
export default Users;
