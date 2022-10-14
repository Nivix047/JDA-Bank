const router = require("express").Router();
const { User, Account, Transaction } = require("../models");
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

// Renders accounts
router.get("/", withAuth, async (req, res) => {
  try {
    const accountData = await Account.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    // Serialize data so the template can read it
    const accounts = accountData.map((account) => account.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("balance", {
      accounts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render transaction
router.get("/", withAuth, async (req, res) => {
  try {
    const transactionData = await Transaction.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    // Serialize data so the template can read it
    const transactions = transactionData.map((transaction) =>
      transaction.get({ plain: true })
    );
    // Pass serialized data and session flag into template
    res.render("transaction", {
      transactions,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
