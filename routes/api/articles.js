const router = require("express").Router();
const articlesController = require("../../controllers/Articles");

// Matches with "/api/articles"
router
  .route("/")
  .get(articlesController.get)
  .post(  articlesController.create)
  .delete(articlesController.delete);

module.exports = router;
