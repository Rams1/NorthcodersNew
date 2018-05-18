import React, { Component } from "react";
import { Card, Col, Button, Icon } from "react-materialize";
import TopStory from "./TopStory";
import Article from "./Article";
import * as api from "../api";
import Topics from "./Topics";

class Articles extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    api.getAllArticles().then(results => {
      this.setState({
        articles: results.data.articles
      });
    });
  }
  render() {
    if (this.state.articles.length > 0) {
      const { users } = this.props;
      const orderedArticles = [...this.state.articles.reverse()];
      const path = this.props.match.path;
      const displayAllArticles = (
        <div className="all-articles-wrapper">
          {orderedArticles.map((article, index) => {
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
                    <a>{articleCreator[0].username} User</a>,
                    <Button
                      id={`${article._id}`}
                      waves="light"
                      tooltip="Click for Comments"
                      onClick={this.handleClick}
                    >
                      read more<Icon left>chat</Icon>
                    </Button>
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
      const { article_id } = this.props.match.params;
      const displayArticleById = (
        <Article articles={orderedArticles} article_id={article_id} />
      );
      const displayTopStory = (
        <TopStory articles={this.state.articles} users={this.props.users} />
      );
      const { topic_id } = this.props.match.params;

      const displayTopics = (
        <Topics
          articles={orderedArticles}
          topicId={topic_id}
          users={this.props.users}
        />
      );
      const getCommentsForAnArticle = (
        <Article articles={orderedArticles} article_id={article_id} />
      );

      const render =
        path === "/topics/:topic_id"
          ? displayTopics
          : path === "/"
            ? displayTopStory
            : path === "/Articles"
              ? displayAllArticles
              : path === "/Articles/:article_id"
                ? displayArticleById
                : null;
      return render;
    } else {
      return <div />;
    }
  }
}

export default Articles;
