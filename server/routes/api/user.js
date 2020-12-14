const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");

// get all conversations for a user
// include unread messages (that aren't sent by current user) so we know how many there are for notifications, we can use text for displaying preview, and length for notifictaion count - there has to be a more optimized way, but starting with this
// include user models so we have info on username/profile pic, and not have to store that data in every single message

router.get("/conversations/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId
        }
      },
      include: [
        {
          model: Message,
          where: {
            senderId: {
              [Op.not]: userId
            },
            read: false
          },
          order: [["createdAt", "DESC"]],
          attributes: ["text"]
        },
        { model: User, as: "user1" },
        { model: User, as: "user2" }
      ]
    });
    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

// find user by username, and find coversation if user exists
router.get("/:username:/currentUserId", async (req, res, next) => {
  try {
    const { username, currentUserId } = req.params;
    const user = await User.findOne({
      where: {
        username
      }
    });
    if (!user) {
      return res.json({});
    }
    const conversation = await Conversation.findConversation(currentUserId, user.id);
    res.json(conversation);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
