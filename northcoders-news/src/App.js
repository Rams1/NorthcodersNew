import React, { Component } from "react";
import "./App.css";
import Articles from "./components/Articles";
import Nav from "./components/Nav";
import Header from "./components/Header";
import { Route, Switch } from "react-router-dom";
import * as api from "./api";

class App extends Component {
  state = {
    users: []
  };
  componentDidMount() {
    api.getAllUsers().then(usersData => {
      this.setState({
        users: usersData.data.users
      });
    });
  }
  render() {
    if (this.state.users.length > 0)
      return (
        <div className="App">
          <Nav />
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={props => {
                return <Articles {...props} users={this.state.users} />;
              }}
            />
            <Route
              exact
              path="/Articles"
              render={props => {
                return <Articles {...props} users={this.state.users} />;
              }}
            />
            <Route path="/Articles/:article_id" component={Articles} />
            <Route
              path="/topics/:topic_id"
              render={props => {
                return <Articles {...props} users={this.state.users} />;
              }}
            />
            <Route path="/articles/:article_id/comments" component={Articles} />
          </Switch>
        </div>
      );
    return <div />;
  }
}

export default App;
