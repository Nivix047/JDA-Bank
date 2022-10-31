const router = require("express").Router();
const { User, Transaction } = require("../../models");
const withAuth = require("../../utils/auth");

// Update recipient's balance
router.put("/:username", withAuth, async (req, res) => {
  try {
    const recipientData = await User.findOne({
      where: {
        username: req.params.username,
      },
    });

    const recipient = recipientData.get({ plain: true });

    // Had to parseInt because of JSON Stringfication
    let balance = parseInt(req.body.amount) + parseInt(recipient.balance);

    const updateBalanceRecipient = await User.update(
      {
        balance: balance,
      },
      {
        where: {
          username: req.params.username,
        },
      }
    );

    const updateBalanceUser = await User.update(
      {
        balance: req.body.balance,
      },
      {
        where: {
          id: req.session.user_id,
        },
      }
    );

    if (!updateBalanceRecipient) {
      return res
        .status(404)
        .json({ message: "No Account found with this id!" });
    }

    res.status(200).json({ updateBalanceRecipient, updateBalanceUser });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// debit
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

// credit
router.post("/:username", withAuth, async (req, res) => {
  try {
    const recipientData = await User.findOne({
      where: {
        username: req.params.username,
      },
    });

    const recipient = recipientData.get({ plain: true });

    const user_id = recipient.id;

    const transaction = await Transaction.create({
      ...req.body,
      user_id: user_id,
    });

    if (!transaction) {
      res.status(404).json({ message: "No Account found with this id!" });
      return;
    }

    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.get("/", withAuth, async (req, res) => {
  const dbRes = await Transaction.findAll({
    where: {
      user_id: req.session.user_id,
    },
  });

  const transactions = dbRes.map((tx) => tx.get({ plain: true }));
  res.json(transactions);
});

module.exports = router;
