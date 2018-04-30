const router = require("express").Router();
const articleRoutes = require("./article");

router.use("/articles", articlesRoutes);

module.exports = router;
