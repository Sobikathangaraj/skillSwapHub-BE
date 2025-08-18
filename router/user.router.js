var express = require("express");
var router = express.Router();
var {
  getData,
  getDataSkill,
  postData,
  putDataId,
  putDatabySkill,
  deleteData,
  deleteDatabySkill
} = require("../controller/controller");

// GET
router.get("/getdata", getData);
router.get("/getdata/:skill", getDataSkill);
router.post("/postdata", postData);
router.put("/updatedata/:_id", putDataId);
router.put("/updatedata/skill/:skill", putDatabySkill);
router.delete("/deletedata/:_id", deleteData);
router.delete("/deletedata/skill/:skill", deleteDatabySkill);

module.exports = router;
