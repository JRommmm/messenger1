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

    // const user = await User.findOne({
    //   where: {
    //     username: req.params.username
    //   }
    // });
    // if (!user) {
    //   return res.json({});
    // }
    // const conversation = await Conversation.findConversation(user.username, req.user.id);
    // res.json(conversation || { id: null, otherUser: user, messages: [] });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
