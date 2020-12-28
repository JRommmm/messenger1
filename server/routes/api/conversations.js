const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

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

    // set all unread messages to read that weren't sent by current user
    await Message.update(
      { read: true },
      {
        where: {
          conversationId,
          read: false,
          senderId: {
            [Op.not]: req.user.id
          }
        }
      }
    );

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// get all conversations for a user, include latest message text for preview and count of unread messages for notifcations, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
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
      attributes: ["id"],
      order: [[Message, "createdAt", "DESC"]],
      include: [
        { model: Message, order: ["createdAt", "DESC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId
            }
          },
          attributes: ["id", "username", "photoUrl"],
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
          attributes: ["id", "username", "photoUrl"],
          required: false
        }
      ]
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const unreadCount = await Message.countUnreadMessages(convo.id, userId);

      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers[convoJSON.otherUser.id]) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[0].text;
      convoJSON.unreadCount = unreadCount;
      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
