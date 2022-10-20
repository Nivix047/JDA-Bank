const router = require("express").Router();
const { User, Transaction } = require("../models");
const withAuth = require("../utils/auth");

// Render login form
router.get("/login", (req, res) => {
  // If the user is alrady logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// Render signup form
router.get("/signup", (req, res) => {
  // If the user is alrady logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// Render homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      // expecting an array of tables
      include: [
        {
          model: Transaction,
        },
      ],
      order: [[{ model: Transaction }, "transaction_date", "DESC"]],
    });

    // Serialize data so the template can read it
    const user = userData.get({ plain: true });
    console.log("----user + transaction----");
    console.log(user);
    // Pass serialized data and session flag into template
    res.render("homepage", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render chart
router.get("/chart", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    res.render("chart", { user, logged_in: req.session.logged_in });
  } catch (err) {}
});

// Testing views
router.get("/test", (req, res) => {
  res.render("test");
});

module.exports = router;
