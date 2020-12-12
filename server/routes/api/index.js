const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");

// find user by username, and find coversation if user exists
router.get("/users/:username:/currentUserId", async (req, res, next) => {
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

// route to set messages as READ by reciever
// expects conversationId in body

router.put("/conversations/read", async (req, res, next) => {
  try {
    const { conversationId, userId } = req.body;
    // set every message that isn't sent by userId in conversation to read = true
    const messages = await Message.findAll({
      where: {
        conversationId,
        read: false,
        senderId: {
          [Op.not]: userId
        }
      }
    });
    // set all unread messages to read
    for (let message of messages) {
      message.read = true;
      await message.save();
    }
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// get all conversations for a user
// include unread messages (that aren't send by current user) so we know how many there are for notifications, we can use text for displaying preview, and length for notifictaion count
// include user models so we have info on username/profile pic, and not have to store that data in every single message

router.get("/users/conversations/:userId", async (req, res, next) => {
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

// user this route when clicking on a conversation on sidebar
// get all messages in a conversation in descending order
router.get("/conversation/messages/:conversationId", async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    console.log(typeof conversationId);
    const messages = await Message.findAll({
      where: {
        conversationId
      },
      order: [["createdAt", "DESC"]]
    });

    res.json(messages);
  } catch (error) {
    next(error);
  }
});

router.use("/message", require("./message"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
