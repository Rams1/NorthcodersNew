import React from "react";
import { Card, Col } from "react-materialize";

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
      <div className="top-article">
        <h2>Top Article</h2>
        <Col m={6} s={12}>
          <Card
            className="blue-grey "
            textClassName="white-text"
            title={articles[articles.length - 1].title}
            actions={[
              <a>{articles[articles.length - 1].votes} Votes</a>,
              <a>{`Created by ${userObj.name}`}</a>
            ]}
          >
            {`${articles[articles.length - 1].body}
              
            ${userObj.name}`}
          </Card>
        </Col>
      </div>
    );
  } else {
    return <div />;
  }
};

export default TopStory;
