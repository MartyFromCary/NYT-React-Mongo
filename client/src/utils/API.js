import axios from "axios";

export default {
  getArticle: () => axios.get("/api/articles"),
  saveArticle: data => axios.post("/api/articles", data),
  deleteArticle: data => axios.delete("/api/articles", data)
};
