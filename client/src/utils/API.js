import axios from "axios";

export default {
  callURL: url => axios.get(url),

  getArticle: () => axios.get("/api/articles"),
  saveArticle: data => axios.post("/api/articles", data),
  deleteArticle: data =>
    axios({ method: "DELETE", url: "/api/articles", data: { _id: data._id } })
};
