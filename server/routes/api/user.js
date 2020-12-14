const router = require("express").Router();
const { User, Conversation } = require("../../db/models");

// find user by username, and find coversation if user exists
router.get("/:username:/currentUserId", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { username } = req.params;
    const user = await User.findOne({
      where: {
        username
      }
    });
    if (!user) {
      return res.json({});
    }
    const conversation = await Conversation.findConversation(currentUserId, req.user.id);
    res.json(conversation);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
