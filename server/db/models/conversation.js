const { Op } = require("sequelize");
const db = require("../db");
const { User } = require("./user");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids
// include user models so we have info on username/profile pic, and not have to store that data in every single message

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    },
    include: [
      { model: db.models.user, as: "user1" },
      { model: db.models.user, as: "user2" }
    ]
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
