const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

Conversation.getPreview = async function (conversationId, userId) {
  const conversationWithLatest = await this.findByPk(conversationId, {
    include: [
      {
        model: Message,
        order: [["createdAt", "DESC"]],
        limit: 1,
        attributes: ["text"],
        required: false
      }
    ]
  });

  const conversationWithUnread = await this.findByPk(conversationId, {
    include: [
      {
        model: Message,
        where: {
          senderId: {
            [Op.not]: userId
          },
          read: false
        },
        attributes: ["id"],
        required: false
      }
    ]
  });

  return {
    unreadCount: conversationWithUnread.messages.length,
    latestMessageText: conversationWithLatest.messages[0]
      ? conversationWithLatest.messages[0].text
      : ""
  };
};

module.exports = Conversation;
