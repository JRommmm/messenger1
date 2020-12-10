const router = require("express").Router();
const { User } = require("../../db/models");

router.post("/register", async (req, res, next) => {
  try {
    // expects {username, email, password} in req.body
    const { username, password, email } = req.body;

    if (!username || !password || !email)
      return res.status(400).json({ error: "Username, password, and email required" });
    if (password.length < 6)
      return res.status(400).json({ error: "Password must be at least 6 characters" });

    const user = await User.create(req.body);

    req.login(user, (error) => {
      if (error) next(error);
      else res.status(201).json(user);
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError")
      res.status(401).json({ error: "User already exists" });
    else next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    // expects username and password in req.body
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });

    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user) {
      console.log({ error: `No user found for username: ${username}` });
      res.status(401).json({ error: "Wrong username and/or password" });
    } else if (!user.correctPassword(password)) {
      console.log({ error: `Password incorrect for user: ${username}` });
      res.status(401).json({ error: "Wrong username and/or password" });
    } else {
      req.login(user, (error) => {
        if (error) next(error);
        else res.json(user);
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

module.exports = router;
