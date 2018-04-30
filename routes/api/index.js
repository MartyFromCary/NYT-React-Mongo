const router = require("express").Router();
const articlesRoutes = require("./articles");

router.use("/articles", articlesRoutes);

module.exports = router;
