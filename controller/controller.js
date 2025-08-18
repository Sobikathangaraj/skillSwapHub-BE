const userSchema = require("../model/model");

//  GET all users
const getData =  async (req, res) => {
  try {
    const data = await userSchema.find();
    res.status(200).send({ result: data, message: "Data fetched successfully." });
  } catch (err) {
    res.status(500).send({ error: err.message, message: "Server error while fetching data..." });
  }
};

// GET users by skill
const getDataSkill = async (req, res) => {
  try {
    const { skill } = req.params;
     const data = await userSchema.find({
      $or: [
        { skilltoteach: skill },
        { skilltolearn: skill }
      ]
    });

    if (data.length === 0) {
      return res.status(404).send({ message: `No users found with skill '${skill}'.` });
    }

    res.status(200).send({ data, message: "Data fetched successfully." });
  } catch (err) {
    res.status(500).send({ error: err.message, message: "Server error while fetching data..." });
  }
};

// POST new user
const postData = async (req, res) => {
  try {
    const newUser = new userSchema(req.body);
    const savedUser = await newUser.save();
    res.status(201).send({ data: savedUser, message: "User added successfully." });
  } catch (err) {
    res.status(500).send({ error: err.message, message: "Server error while adding user." });
  }
};

//  update user by ID
const putDataId =  async (req, res) => {
  try {
    const {_id } = req.params;
    const updateData = req.body;
    const updatedUser = await userSchema.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).send({ data: updatedUser, message: "User updated successfully." });
  } catch (err) {
    res.status(500).send({ error: err.message, message: "Server error while updating user." });
  }
};

// update users by skill
const putDatabySkill =  async (req, res) => {
  try {
    const { skill } = req.params;
    const updateData = req.body;

    const result = await userSchema.updateMany({ skilltoteach: skill }, updateData);

    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "No users updated. Skill may not exist." });
    }

    res.status(200).send({ modifiedCount: result.modifiedCount, message: "Users updated successfully." });
  } catch (err) {
    res.status(500).send({ error: err.message, message: "Server error while updating users." });
  }
};

// DELETE user by ID
const deleteData = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedUser = await userSchema.findByIdAndDelete(_id);

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).send({ data: deletedUser, message: "User deleted successfully." });
  } catch (err) {
    res.status(500).send({ error: err.message, message: "Server error while deleting user." });
  }
};

// DELETE users by skill
const deleteDatabySkill = async (req, res) => {
  try {
    const { skill } = req.params;  
    const result = await userSchema.deleteMany({
      $or: [
        { skilltoteach: skill },
        { skilltolearn: skill }
      ]
    });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "No users found with that skill." });
    }

    res.status(200).send({ deletedCount: result.deletedCount, message: "Users deleted successfully." });
  } catch (err) {
    res.status(500).send({ error: err.message, message: "Server error while deleting users." });
  }
};


module.exports = {getData,getDataSkill,postData,putDataId,putDatabySkill,deleteData,deleteDatabySkill};
