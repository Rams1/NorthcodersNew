import React from "react";
import { Card, Col, Button } from "react-materialize";
import PT from "prop-types";
import { Loading } from "./";

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
                {`${articles[articles.length - 1].body.slice(0 - 199)}   ...`}
              </Card>
            </Col>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};

TopStory.propTypes = {
  articles: PT.array.isRequired,
  users: PT.array.isRequired
};

export default TopStory;
