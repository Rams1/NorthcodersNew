import React, { Component } from "react";
import * as api from "../api";
import { Card, Col, Button } from "react-materialize";
import PT from "prop-types";
import { AddArticle, Loading } from "./";

class Topics extends Component {
  state = {
    title: "",
    body: "",
    articles: []
  };

  componentDidMount() {
    const articles = this.props.articles;
    this.setState({
      articles: articles
    });
  }
  render() {
    if (this.state.articles.length > 1 || this.props.topicId === String) {
      const { topicId, users } = this.props;
      const { articles } = this.state;
      console.log(articles);
      const topicsArts = api.filterTopics(articles, topicId);
      const display = (
        <div>
          <h4 className="topic">{topicsArts[1].belongs_to.slug}</h4>
          <AddArticle
            titleSetState={this.titleSetState}
            bodySetState={this.bodySetState}
            onArticleSubmission={this.onArticleSubmission}
          />
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
                    <a>{articleCreator[0].username}</a>,
                    <Button
                      waves="light"
                      node="a"
                      href={`/articles/${article._id}`}
                    >
                      {" "}
                      read More{" "}
                    </Button>
                  ]}
                >
                  {article.body}
                </Card>
              </Col>
            );
          })}
        </div>
      );

      const render = topicsArts.length > 0 ? display : <div />;
      return render;
    } else {
      return <Loading />;
    }
  }
  bodySetState = e => {
    console.log(e.target.value, "body");
    this.setState({
      body: e.target.value
    });
  };
  titleSetState = e => {
    console.log(e.target.value, "t");
    this.setState({
      title: e.target.value
    });
  };
  onArticleSubmission = e => {
    e.preventDefault();
    const { topicId, addArticleToArr, users } = this.props;
    const { body, title } = this.state;
    if (body.length > 0 && title.length > 0) {
      api
        .postAnArticle(title, body, topicId, users[1]._id)
        .then(articleData => {
          console.log(addArticleToArr);
          console.log(articleData.data.article);
          const newArticle = articleData.data.article;
          if (newArticle.title.length > 0)
            this.setState({
              articles: [newArticle, ...this.state.articles]
            });
        });
    }
  };
}
Topics.propTypes = {
  articles: PT.array.isRequired,
  users: PT.array.isRequired,
  topicId: PT.string
};

export default Topics;
