const db = require("./db");
const { User } = require("./models");

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
