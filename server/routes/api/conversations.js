const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");

// use this route when clicking on a conversation on sidebar
// get all messages in a conversation in descending order
router.get("/messages/:conversationId", async (req, res, next) => {
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

// route to set messages as READ by reciever (messages will be unread as default upon creation)
// expects conversationId in body
router.put("/read", async (req, res, next) => {
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

module.exports = router;
