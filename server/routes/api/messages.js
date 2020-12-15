const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");

// use this route when clicking on a conversation on sidebar
// get all messages in a conversation in descending order by time created
// the conversation will already have loaded username/profile picture, so we don't have to eager load it on the messages
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findByPk(id, {
      include: [{ model: Message, order: [["createdAt", "DESC"]] }]
    });

    res.json(conversation);
  } catch (error) {
    next(error);
  }
});

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json(message);
    }
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
