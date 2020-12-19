const router = require("express").Router();
const { User, Conversation } = require("../../db/models");
const { Op } = require("sequelize");

// find users by username, and find coversation if user exists
router.get("/:username", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { username } = req.params;

    const users = await User.findAll({
      where: {
        username: {
          [Op.substring]: username
        }
      }
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
