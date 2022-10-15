const router = require("express").Router();
const { User, Transaction } = require("../../models");
const withAuth = require("../../utils/auth");

// Create transaction
router.post("/", withAuth, async (req, res) => {
  try {
    const newTransaction = await Transaction.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newTransaction);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update balance
router.put("/", withAuth, async (req, res) => {
  try {
    const updateBalance = await User.update(
      {
        balance: req.body.balance,
      },
      {
        where: {
          id: req.session.user_id,
        },
      }
    );

    if (!updateBalance) {
      res.status(404).json({ message: "No Account found with this id!" });
      return;
    }

    res.status(200).json(updateBalance);
  } catch (err) {
    res.status(400).json(err);
  }
});

// we need a put for recipient too ----------------------

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updateBalance = await User.update(
      {
        balance: balance - req.body.balance,
      },
      {
        where: {
          id: req.params.id,
        },
        // ...req.body,
        // user_id: req.session.user_id,
      }
    );

    if (!updateBalance) {
      res.status(404).json({ message: "No Account found with this id!" });
      return;
    }

    res.status(200).json(updateBalance);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
