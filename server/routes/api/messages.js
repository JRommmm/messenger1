const router = require("express").Router();
const { Conversation, Message, User } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId } = req.body;

    // we will only send back sender info if we're creating a branc new conversation
    let sender = null;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(senderId, recipientId);

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({ user1Id: senderId, user2Id: recipientId });
      sender = await User.findByPk(senderId);
      if (onlineUsers[sender.id]) {
        sender = sender.toJSON();
        sender.online = true;
      }
    }
    const message = await Message.create({ senderId, text, conversationId: conversation.id });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
