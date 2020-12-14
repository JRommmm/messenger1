const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");

// use this route when clicking on a conversation on sidebar
// get all messages in a conversation in descending order by time created
// the conversation will already have loaded username/profile picture, so we don't have to eager load it on the messages
router.get("/messages/:conversationId", async (req, res, next) => {
  try {
    const { conversationId } = req.params;

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

// set messages as read by reciever (messages will be unread as default upon creation)
// will be called after all messages load for an individual conversation
// expects conversationId in body
router.put("/read", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { conversationId } = req.body;
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

// get all conversations for a user
// include unread messages (that aren't sent by current user) so we know how many there are for notifications (I haven't figured out yet how to also get the lastest message, whether it is read/sent by user or not (to display on the sidebar))
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
        {
          model: Message,

          where: {
            senderId: {
              [Op.not]: userId
            },
            read: false
          },
          required: false,
          attributes: ["id"]
        },

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
      ]
    });
    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
