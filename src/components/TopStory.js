import React from "react";
import { Card, Col, Button } from "react-materialize";
import PT from "prop-types";

const TopStory = ({ articles, users }) => {
  const sorted = articles.sort((a, b) => {
    let c = a.votes;
    let d = b.votes;
    return c - d;
  });

  if (articles.length > 0 && users.length > 0) {
    const userObj = users.find((user, index) => {
      return user._id === sorted[articles.length - 1].created_by._id;
    });
    return (
      <div className="jon">
        <div className="top-article">
          <h2>Top Article</h2>
          <div className="card-wrapper">
            <Col m={6} s={12}>
              <Card
                className="blue-grey "
                textClassName="white-text"
                title={articles[articles.length - 1].title}
                actions={[
                  <a>{articles[articles.length - 1].votes} Votes</a>,
                  <a>{`Created by ${userObj.name}`}</a>,
                  <Button
                    waves="light"
                    node="a"
                    href={`/articles/${articles[articles.length - 1]._id}`}
                  >
                    {" "}
                    read More{" "}
                  </Button>
                ]}
              >
                {`${articles[articles.length - 1].body}
              
            ${userObj.name}`}
              </Card>
            </Col>
          </div>
        </div>
        <div className="profile">
          <h2>Profile</h2>
          <li>{users[1].name}</li>
          <li>{users[1].username}</li>
          <img src={users[1].avatar_url} alt="userAvatar" />
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

TopStory.propTypes = {
  articles: PT.array.isRequired,
  users: PT.array.isRequired
};

export default TopStory;
