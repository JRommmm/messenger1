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

Message.countUnreadMessages = async (conversationId, userId) => {
  const unreadCount = await Message.count({
    where: {
      conversationId,
      senderId: {
        [Sequelize.Op.not]: userId
      },
      read: false
    }
  });
  return unreadCount;
};

module.exports = Message;
