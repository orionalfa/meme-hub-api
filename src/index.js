// imports
const app = require("./server");
const { config } = require("./config");
const db = require("./models");
const { connect } = require("./db");

// connection and connection test
connect().then(async function seed() {
  console.log("connection success");
  const existingUsers = await db.Users.find({});
  if (existingUsers.length != 0) {
    console.log("some user exists");
  } else {
    const { _id } = await db.Users.create({
      username: "admin",
      email: "admin@admin.com",
      firstname: "adminName",
      lastname: "adminLastName",
    });
  }
});

// port conenction test
app.listen(config.app.PORT, () =>
  console.log("server running on port " + config.app.PORT)
);
