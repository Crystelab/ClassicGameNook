const express = require("express");
const path = require("path");

const router = express.Router();

// Route for the home page (index.html)
router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/about(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/about.html"));
});

router.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../../public/404.html"));
});

module.exports = router;
