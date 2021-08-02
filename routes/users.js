const router = require("express").Router();
const user = require("../controllers/users");
const auth = require("../middleware/authenticator");

router.post("/signup", user.signUp);
router.post("/signin", user.signIn);
router.get("/all-users", auth, user.getAllUsers);

router.get("/:id", user.getUser);
router.post("/edit", auth, user.edit);

module.exports = router;
