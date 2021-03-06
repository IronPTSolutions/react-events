const createError = require("http-errors");
const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid");
const events = require("../controllers/events.controller");
const auth = require("../controllers/auth.controller");
const users = require("../controllers/users.controller");

router.get("/events", secure.isAuthenticated, events.list);
router.post("/events", secure.isAuthenticated, events.create);
router.get("/events/:id", events.detail);
router.delete("/events/:id", secure.isAuthenticated, events.delete);
router.patch("/events/:id", secure.isAuthenticated, events.edit);

router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/profile", secure.isAuthenticated, auth.profile);

router.get("/users", secure.isAuthenticated, secure.isAdmin, users.list);

router.use((req, res, next) => next(createError(404, "Route not found")));

module.exports = router;
