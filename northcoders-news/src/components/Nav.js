import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-materialize";
import "../Nav.css";
import * as api from "../api";
class Nav extends Component {
  state = {
    topics: []
  };
  componentDidMount() {
    api.getAllTopics().then(topics => {
      this.setState({
        topics: topics.data.topics
      });
    });
  }
  render() {
    const topics = this.state.topics;
    if (topics.length > 0) {
      return (
        <Navbar className="navbar" brand="Northcoders News" left>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {topics.map((topic, i) => {
            const { slug, _id } = topic;
            return (
              <li>
                <NavLink to={`/topics/${_id}`}>{slug}</NavLink>
              </li>
            );
          })}

          <li>
            <NavLink to="/articles">Articles</NavLink>
          </li>
        </Navbar>
      );
    } else {
      return null;
    }
  }
}

export default Nav;
