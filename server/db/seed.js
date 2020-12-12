const db = require("./db");
const { User, Message, Conversation } = require("./models");
const { Op } = require("sequelize");

/*include: [
      {
        model: User,
        as: "user1"
      },
      { model: User, as: "user2" }
    ]
*/
async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const users = await Promise.all([
    User.create({
      username: "user1",
      email: "user1@email.com",
      password: "123456"
    }),
    User.create({
      username: "user2",
      email: "user2@email.com",
      password: "my#Password"
    }),
    User.create({
      username: "user3",
      email: "user3@email.com",
      password: "helloWorld7@"
    }),
    User.create({
      username: "user4",
      email: "user4@email.com",
      password: "65password45"
    }),
    User.create({
      username: "user5",
      email: "user5@email.com",
      password: "testPassword45"
    })
  ]);

  const message = await Message.create({ text: "test", senderId: users[0].id });
  const message2 = await Message.create({ text: "teset2", senderId: users[0].id });

  const convo = await Conversation.create({ user1Id: users[0].id, user2Id: users[1].id });
  const convo2 = await Conversation.create({ user1Id: users[4].id, user2Id: users[0].id });
  await message.setConversation(convo);
  await message2.setConversation(convo2);
  let data = await Conversation.findAll({
    where: {
      [Op.or]: {
        user1Id: users[0].id,
        user2Id: users[0].id
      }
    },
    include: [
      {
        model: User,
        as: "user1"
      },
      { model: User, as: "user2" }
    ]
  });
  console.log(data[0].user1);
  console.log(`seeded ${users.length} users`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
