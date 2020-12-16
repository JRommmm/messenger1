const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");

// set messages as read by reciever (messages will be unread as default upon creation)
// will be called after all messages load for an individual conversation
// expects conversationId in body
router.put("/read", async (req, res, next) => {
  try {
    const { conversationId } = req.body;

    if (!req.user) {
      return res.sendStatus(401);
    }

    const conversation = await Conversation.findByPk(conversationId, {
      attributes: ["user1Id", "user2Id"]
    });

    const isAuthorized =
      conversation.user1Id === req.user.id || conversation.user2Id === req.user.id;
    if (!isAuthorized) {
      return res.sendStatus(401);
    }

    // find all messages that weren't sent by current user and haven't been read
    const messages = await Message.findAll({
      where: {
        conversationId,
        read: false,
        senderId: {
          [Op.not]: req.user.id
        }
      }
    });

    // set all unread messages to read
    for (const message of messages) {
      message.read = true;
      await message.save();
    }

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// get all conversations for a user, include latest message text for preview and count of unread messages for notifcations, and all messages
// include user model so we have info on username/profile pic (don't include current user info)

router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId
        }
      },
      include: [
        { model: Message, order: ["id", "DESC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId
            }
          },
          required: false
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId
            }
          },
          required: false
        }
      ],
      attributes: ["id"]
    });

    for (let i = 0; i < conversations.length; i++) {
      const data = await Conversation.getUnreadCount(conversations[i].id, userId);
      const conversationJSON = conversations[i].toJSON();
      conversationJSON.latestMessageText = data.latestMessageText;
      conversationJSON.unreadCount = data.unreadCount;
      conversations[i] = conversationJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
