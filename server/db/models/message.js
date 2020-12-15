const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Message.getPreview = async function (conversationId, userId) {
  const latestMessage = await this.findAll({
    limit: 1,
    where: {
      conversationId
    },
    attributes: ["text"],
    order: [["createdAt", "DESC"]]
  });

  const unreadMessages = await this.findAll({
    where: {
      senderId: {
        [Sequelize.Op.not]: userId
      },
      read: false,
      conversationId
    },
    attributes: ["id"]
  });

  return {
    unreadCount: unreadMessages.length,
    latestMessageText: latestMessage[0] ? latestMessage[0].text : ""
  };
};

module.exports = Message;
