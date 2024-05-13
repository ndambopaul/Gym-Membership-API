const express = require("express");

const {
  getMembers,
  createMember,
  getMemberById,
  updateMemberStatus,
  updateMember,
  deleteMember,
} = require("../controllers/members");

const router = express.Router();

router.get("/", getMembers);
router.get("/:id", getMemberById);
router.post("/", createMember);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);
router.patch("/:id", updateMemberStatus);


module.exports = router;
