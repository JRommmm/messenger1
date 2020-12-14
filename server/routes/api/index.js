const router = require("express").Router();

router.use("/message", require("./message"));
router.use("/conversations", require("./conversations"));
router.use("/user", require("./user"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
