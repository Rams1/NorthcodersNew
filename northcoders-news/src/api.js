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
  return axios.post(
    `https://northcoders-news1.herokuapp.com/api/articles/${articleId}/comments`,
    {
      body: `${body}`,
      created_by: `${userId}`
    }
  );
};
export const PostAnArticle = (title, body, topicId, userId) => {
  return axios.post(
    `https://northcoders-news1.herokuapp.com/api/topics/${topicId}/articles`,
    {
      title: `${title}`,
      body: `${body}`,
      belongs_to: `${topicId}`,
      created_by: `${userId}`
    }
  );
};
