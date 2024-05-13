const express = require("express");
const {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} = require("../controllers/packages");


const router = express.Router();
router.get("/", getPackages);
router.post("/", createPackage);
router.get("/:id", getPackageById);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);

module.exports = router;