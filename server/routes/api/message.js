const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");

// expects {senderId, recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    const { senderId, recipientId, text, conversationId } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json(message);
    }

    // TODO- refactor because we don't need  the messages???
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(senderId, recipientId);

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({ user1Id: senderId, user2Id: recipientId });
    }
    const message = await Message.create({ senderId, text, conversationId: conversation.id });
    res.json(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
