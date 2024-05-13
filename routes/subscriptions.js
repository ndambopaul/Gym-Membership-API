const express = require("express");
const {
  getSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} = require("../controllers/subscriptions");

const router = express.Router();
router.get("/", getSubscriptions);
router.post("/", createSubscription);
router.get("/:id", getSubscriptionById);
router.put("/:id", updateSubscription);
router.delete("/:id", deleteSubscription);

module.exports = router;