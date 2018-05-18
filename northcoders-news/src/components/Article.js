import React, { Component } from "react";
import { Card, Col, Button, Icon } from "react-materialize";
import * as api from "../api";
class Article extends Component {
  state = {
    comments: []
  };

  componentDidMount() {
    api.getAllComments().then(commentData => {
      this.setState({
        comments: commentData.data.comments
      });
    });
  }
  render() {
    const { articles, article_id, resetState } = this.props;
    const comments = this.state.comments;
    if (articles.length > 0 && article_id !== undefined && comments) {
      const article = articles.find((article, index) => {
        return article._id === article_id;
      });
      const commentArr = comments.filter(comment => {
        return comment.belongs_to._id === article_id;
      });
      return (
        <div>
          <Col m={6} s={12}>
            <Card
              className="blue-grey "
              textClassName="white-text"
              title={article.title}
              actions={[
                <a>{article.votes} Votes</a>,
                <a>{`Created by ${article.created_by.username}`}</a>
              ]}
            >
              {`${article.body}`}
            </Card>
            <Button onClick={e => this.handleClick(e)} waves="light">
              Comments<Icon left>chat</Icon>
            </Button>
          </Col>
          {commentArr.map((comment, index) => {
            return (
              <Col m={6} s={12}>
                <Card
                  className="blue-grey "
                  textClassName="white-text"
                  title={comment.created_by.username}
                  actions={[
                    <a>{comment.votes} Votes</a>,
                    <Button
                      floating
                      large
                      className="red"
                      waves="light"
                      icon="add"
                    />
                  ]}
                >
                  {`${comment.body}`}
                </Card>
              </Col>
            );
          })}
        </div>
      );
    } else {
      return <div>hi there </div>;
    }
  }
}

export default Article;
