import React, { Component } from "react";
import { Card, Col, Button } from "react-materialize";
import * as api from "../api";
import PT from "prop-types";
class Article extends Component {
  state = {
    comments: [],
    body: "",
    userId: this.props.users[1]._id,
    vote: 0
  };

  componentDidMount() {
    api.getAllComments().then(commentData => {
      this.setState({
        comments: commentData.data.comments,
        users: this.props.users
      });
    });
  }
  componentDidUpdate() {
    api.getAllComments().then(commentsArr => {
      const comments = commentsArr.data.comments;

      if (JSON.stringify(comments) !== JSON.stringify(this.state.comments)) {
        const sortedComments = comments.sort(
          (a, b) => b.created_at - a.created_at
        );
        if (
          JSON.stringify(sortedComments) !== JSON.stringify(this.state.comments)
        )
          this.setState({
            comments: sortedComments
          });
      }
    });
  }

  render() {
    const { articles, article_id } = this.props;
    const { comments } = this.state;
    if (articles.length > 0 && article_id !== undefined && comments) {
      const article = articles.find((article, index) => {
        return article._id === article_id;
      });
      const commentArr = comments.filter(comment => {
        return (
          comment.belongs_to._id === article_id ||
          comment.belongs_to === article_id
        );
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
                <a>{`Created by ${article.created_by.username}`}</a>,
                <Button
                  id={article_id}
                  floating
                  className="red"
                  waves="light"
                  icon="arrow_upward"
                  onClick={() => this.handleVoteUpClick(article_id)}
                />,
                <Button
                  id={article_id}
                  floating
                  className="blue"
                  waves="light"
                  icon="arrow_downward"
                  onClick={() => this.handleVoteDownClick(article_id)}
                />
              ]}
            >
              {`${article.body}`}
            </Card>
          </Col>
          <div>
            <form onSubmit={this.handleOnSubmit}>
              <input
                className="comment-input"
                onChange={this.handleChange}
                placeholder="comment here"
              />
            </form>
          </div>
          <h3>Comments</h3>
          {commentArr.map((comment, index) => {
            return (
              <Col m={6} s={12}>
                <Card
                  className="blue-grey "
                  textClassName="white-text"
                  title={comment.created_by.username || comment.created_by}
                  actions={[
                    <a>{comment.votes} Votes</a>,
                    <Button
                      id={comment._id}
                      floating
                      className="red"
                      waves="light"
                      icon="arrow_upward"
                      onClick={() => this.handleCommentVoteUpClick(comment._id)}
                    />,
                    <Button
                      id={comment._id}
                      floating
                      className="blue"
                      waves="light"
                      icon="arrow_downward"
                      onClick={() =>
                        this.handleCommentVoteDownClick(comment._id)
                      }
                    />
                  ]}
                >
                  {`${comment.body}`}
                </Card>
                <Button
                  id={comment._id}
                  floating
                  className="orange"
                  waves="light"
                  icon="delete_forever"
                  onClick={() => this.handleDeleteClick(comment._id)}
                />
              </Col>
            );
          })}
        </div>
      );
    } else {
      return <div>hi there </div>;
    }
  }
  handleChange = e => {
    this.setState({
      body: e.target.value
    });
  };
  handleOnSubmit = e => {
    e.preventDefault();
    const { article_id } = this.props;
    const userId = this.state.userId;
    const body = this.state.body;
    api.PostAComment(body, article_id, userId).then(result => {
      console.log(result.data.comment);
      this.setState({
        comments: [result.data.comment, ...this.state.comments]
      });
    });
  };
  handleVoteUpClick = article_id => {
    api.alterVoteCount("up", article_id).then(result => {
      console.log(result, "res");
      this.props.incrementArticleVote(article_id);
    });
  };
  handleVoteDownClick = article_id => {
    api.alterVoteCount("down", article_id).then(result => {
      this.props.decrementArticleVote(article_id);
    });
  };
  handleCommentVoteUpClick = commentId => {
    api.alterCommentVoteCount("up", commentId).then(result => {
      this.incrementCommentVote(commentId);
    });
  };
  handleCommentVoteDownClick = commentId => {
    api.alterCommentVoteCount("down", commentId).then(result => {
      this.decrementCommentVote(commentId);
    });
  };
  handleDeleteClick = commentId => {
    api.deleteAComment(commentId).then(result => {
      const comments = [...this.state.comments];
      if (comments.length > 0) {
        comments.filter(comment => {
          comment._id !== commentId;
        });
        console.log(comments);
        this.setState({
          comments: comments
        });
      }
    });
  };
  incrementCommentVote = commentId => {
    const comments = this.state.comments;

    if (comments.length > 0)
      comments.map(comment => {
        if (comment._id === commentId) {
          comment.votes++;
          this.setState({
            comment: comments
          });
        }
      });
  };
  decrementCommentVote = commentId => {
    const comments = this.state.comments;

    if (comments.length > 0)
      comments.map(comment => {
        if (comment._id === commentId) {
          comment.votes--;
          this.setState({
            comment: comments
          });
        }
      });
  };
}

Article.propTypes = {
  articles: PT.array.isRequired,
  article_id: PT.string.isRequired,
  decrementArticleVote: PT.func.isRequired,
  incrementArticleVote: PT.func.isRequired
};

export default Article;
