import React, { Component } from "react";
import { Card, Col, Button } from "react-materialize";
import * as api from "../api";
import PT from "prop-types";
import { VoteButton, Loading } from "./";
class Article extends Component {
  state = {
    comments: [],
    body: "",
    userId: this.props.users[1]._id,
    vote: 0
  };

  componentDidMount() {
    api.getAllComments().then(commentData => {
      const comments = commentData.data.comments.sort(
        (a, b) => b.created_at - a.created_at
      );
      this.setState({
        comments: comments,
        users: this.props.users
      });
    });
  }
  componentDidUpdate() {
    const articleComments = this.state.comments
      .filter(comment => {
        return comment.belongs_to._id === this.props.article_id;
      })
      .sort((a, b) => b.created_at - a.created_at);
    api.getArticleComments(this.props.article_id).then(res => {
      let artComs = res.data.comments.sort(
        (a, b) => b.created_at - a.created_at
      );

      if (JSON.stringify(artComs) !== JSON.stringify(articleComments)) {
        api.getAllComments().then(commentData => {
          let comments = commentData.data.comments.sort(
            (a, b) => b.created_at - a.created_at
          );
          this.setState({
            comments: comments
          });
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
      if (this.state.userId.length > 0)
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
                  <div />,
                  <VoteButton
                    id={article._id}
                    colour="red"
                    func={this.handleVote}
                    direction="up"
                    icon="arrow_upward"
                  />,
                  <VoteButton
                    id={article._id}
                    colour="blue"
                    func={this.handleVote}
                    direction="down"
                    icon="arrow_downward"
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
                      <VoteButton
                        id={comment._id}
                        colour="red"
                        func={this.handleCommentVoteClick}
                        direction="up"
                        icon="arrow_upward"
                      />,
                      <VoteButton
                        id={comment._id}
                        colour="blue"
                        func={this.handleCommentVoteClick}
                        direction="down"
                        icon="arrow_downward"
                      />
                    ]}
                  >
                    {`${comment.body}`}
                  </Card>
                  <VoteButton
                    id={comment._id}
                    colour="orange"
                    func={this.handleDeleteClick}
                    direction=""
                    icon="delete_forever"
                  />
                </Col>
              );
            })}
          </div>
        );
    } else {
      return <Loading />;
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
    console.log(userId);
    const body = this.state.body;
    api.PostAComment(body, article_id, userId).then(result => {
      console.log(result.data.comment);
      this.setState({
        comments: [result.data.comment, ...this.state.comments]
      });
    });
  };
  handleCommentVoteClick = (commentId, direction) => {
    api.alterCommentVoteCount(direction, commentId).then(result => {
      this.incrementCommentVote(commentId, direction);
    });
  };

  handleDeleteClick = commentId => {
    api.deleteAComment(commentId).then(result => {
      const comments = [...this.state.comments];
      if (comments.length > 0) {
        comments.filter(comment => {
          return comment._id !== commentId;
        });
        console.log(comments);
        this.setState({
          comments: comments
        });
      }
    });
  };
  alreadyVotedOnArticle = false;

  handleVote = (articleId, direction) => {
    const vote = direction === "up" ? 1 : -1;
    if (!this.alreadyVotedOnArticle) {
      api.voteOnArticle(articleId, direction).then(() => {
        this.props.ArticleVote(articleId, vote);
      });
      this.alreadyVotedOnArticle = true;
    }
  };

  alreadyVotedOnComment = false;

  incrementCommentVote = (commentId, direction) => {
    const comments = [...this.state.comments];
    const vote = direction === "up" ? 1 : -1;
    if (comments.length > 0 && !this.alreadyVotedOnComment)
      comments.map(comment => {
        if (comment._id === commentId) {
          comment.votes += vote;
          this.setState({
            comment: comments
          });
          this.alreadyVotedOnComment = true;
        }
      });
  };
}

Article.propTypes = {
  articles: PT.array.isRequired,
  article_id: PT.string.isRequired,
  ArticleVote: PT.func.isRequired
};

export default Article;
