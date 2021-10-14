const router = require("express").Router();
const path = require("path");
const articleCtrl = require(path.join(__dirname, "../controllers/article"));

router.post("/", articleCtrl.addArticle);
router.get("/", articleCtrl.getAllArticles);
router.delete("/", articleCtrl.deleteAllArticles);

module.exports = router;
