import React, { Component } from "react";
import * as api from "../api";

class Comments extends Component {
  state = {
    comments: []
  };

  componentDidMount() {
    api.getAllComments().then(commentsData => {
      this.setState({
        comments: commentsData.data.comments
      });
    });
  }
  render() {
    return <div />;
  }
}

export default Comments;
