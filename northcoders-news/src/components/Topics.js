import React, { Component } from "react";
import * as api from "../api";
import { Card, Col } from "react-materialize";

class Topics extends Component {
  render() {
    if (this.props.articles || this.props.topicId === String) {
      const { articles, topicId, users } = this.props;
      console.log(users);
      const topicsArts = api.filterTopics(articles, topicId);
      const display = (
        <div>
          {topicsArts.map((article, index) => {
            const articleCreator = users.filter(user => {
              return user._id === article.created_by._id;
            });

            return (
              <Col key={article._id} m={6} s={12}>
                <Card
                  className="blue-grey "
                  textClassName="white-text"
                  title={article.title}
                  actions={[
                    <a>{article.votes} Votes</a>,
                    <a>{articleCreator[0].username}</a>
                  ]}
                >
                  {article.body}
                  {article.votes}
                </Card>
              </Col>
            );
          })}
        </div>
      );

      const render = topicsArts.length > 0 ? display : <div />;
      return render;
    }
  }
}

export default Topics;
