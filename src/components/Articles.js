import React, { Component } from "react";
import { Card, Col, Button } from "react-materialize";
import TopStory from "./TopStory";
import Article from "./Article";
import * as api from "../api";
import Topics from "./Topics";
import PT from "prop-types";
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
              return (
                user._id === article.created_by._id ||
                user._id === article.created_by
              );
            });
            return (
              <Col key={article._id} m={6} s={12}>
                <Card
                  key={article.belongs_to._id}
                  className="blue-grey"
                  textClassName="white-text"
                  title={article.title}
                  actions={[
                    <a>{article.votes} Votes</a>,
                    <a>{articleCreator[0].username} User</a>,
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
      const { article_id } = this.props.match.params;
      const displayArticleById = (
        <Article
          users={this.props.users}
          articles={orderedArticles}
          article_id={article_id}
          incrementArticleVote={this.incrementArticleVote}
          decrementArticleVote={this.decrementArticleVote}
        />
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
          addArticleToArr={this.addArticleToArr}
        />
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

  incrementArticleVote = article_id => {
    const articles = [...this.state.articles];

    if (articles.length > 0)
      articles.map(article => {
        if (article._id === article_id) {
          article.votes = article.votes += 1;
          this.setState({
            articles: articles
          });
        }
      });
  };
  decrementArticleVote = article_id => {
    console.log(article_id);
    const articles = [...this.state.articles];

    if (articles.length > 0)
      articles.map(article => {
        if (article._id === article_id) {
          article.votes = article.votes -= 1;
          this.setState({
            articles: articles
          });
        }
      });
  };
  addArticleToArr = newArticle => {
    this.setState({
      articles: [newArticle, ...this.state.articles]
    });
  };
}
Articles.propTypes = {
  users: PT.array.isRequired
};
export default Articles;
