const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  res.json({ id: 4, content: "hello5" });
});

router.delete("/", (req, res) => {
  res.json({ id: 4 });
});

module.exports = router;
