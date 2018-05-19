import axios from "axios";

export function getAllUsers() {
  return axios.get("https://northcoders-news1.herokuapp.com/api/users");
}

export function filterTopics(arr, topicId) {
  return arr.filter(article => {
    return article.belongs_to._id === topicId;
  });
}

export const getAllArticles = () => {
  return axios.get("https://northcoders-news1.herokuapp.com/api/articles");
};

export const getAllComments = () => {
  return axios.get("https://northcoders-news1.herokuapp.com/api/comments");
};
export const getAllTopics = () => {
  return axios.get("https://northcoders-news1.herokuapp.com/api/topics");
};

export const PostAComment = (body, articleId, userId) => {
  const data = {
    body: body,
    created_by: userId
  };
  return axios.post(
    `https://northcoders-news1.herokuapp.com/api/articles/${articleId}/comments`,
    data
  );
};
export const PostAnArticle = (title, body, topicId, userId) => {
  const data = {
    title: title,
    body: body,
    belongs_to: topicId,
    created_by: userId
  };
  return axios.post(
    `https://northcoders-news1.herokuapp.com/api/topics/${topicId}/articles`,
    data
  );
};

export const alterVoteCount = (vote, articleId) => {
  return axios.put(
    `https://northcoders-news1.herokuapp.com/api/articles/${articleId}?vote=${vote}`
  );
};
export const alterCommentVoteCount = (vote, commentId) => {
  return axios.put(
    `https://northcoders-news1.herokuapp.com/api/comments/${commentId}?vote=${vote}`
  );
};

export const handleVoteClick = (article_id, vote) => {};
