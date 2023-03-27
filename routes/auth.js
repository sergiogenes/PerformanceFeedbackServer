const express = require("express");

const { userLogin } = require("../controllers/auth");

const router = express.Router();

router.post("/login", userLogin);

module.exports = router;
