const { Users } = require("../models");

//POST
async function register(req, res) {
  const { email, ...reqBody } = req.body;
  console.log(reqBody);
  console.log(email);
  //   const { uid, username, email } = req.body;
  try {
    const foundUser = await Users.findOne({
      email: email,
    });
    if (!foundUser) {
      const { _id } = await Users.create({
        email: email,
        ...reqBody,
      });
      return res.status(200).send({
        message: "User created very successfully",
        data: {
          userId: _id,
        },
      });
    } else {
      return res.status(201).send({
        message: "User already exists asshole",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      error: error.message,
    });
  }
}

//PATCH
async function updateById(req, res) {
  const { id } = req.params;
  const bodyReq = req.body;
  try {
    console.log("id => ", id);
    console.log("bodyReq => ", bodyReq);
    const dbResponse = await Users.findByIdAndUpdate(id, bodyReq, {
      new: true,
    });

    if (!dbResponse) {
      return res.status(400).send(
        generateResponse({
          data: null,
          error: "User ID doesn't exist",
        })
      );
    }

    return res.status(200).send({
      data: dbResponse,
    });
  } catch (error) {
    return res.status(500).send({
      data: req.params.id,
      error: error.message,
    });
  }
}

//GET
async function getById(req, res) {
  const { id: firebase_id } = req.params;
  try {
    const foundUser = await Users.findOne({
      firebase_id: firebase_id,
    });
    return res.status(200).send({
      message: "User found",
      currentUser: foundUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      data: req.params.id,
      error: error.message,
    });
  }
}

async function getByEmail(req, res) {
  const { email } = req.params;
  try {
    const foundUser = await Users.findOne({
      email: email,
    });
    return res.status(200).send({
      message: "User found",
      currentUser: foundUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      data: req.params.email,
      error: error.message,
    });
  }
}

module.exports = {
  register: register,
  updateProfile: updateById,
  getById: getById,
  getByEmail: getByEmail,
};
