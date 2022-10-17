const router = require("express").Router();
const { User, Transaction } = require("../../models");
const withAuth = require("../../utils/auth");

// Update balance of the sender
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

    res.status(200).json({ message: "Transfer completed!" });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

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

    const updateBalance = await User.update(
      {
        balance: balance,
      },
      {
        where: {
          username: req.params.username,
        },
      }
    );

    if (!updateBalance) {
      res.status(404).json({ message: "No Account found with this id!" });
      return;
    }

    res.status(200).json(updateBalance);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Transaction front-end js can include a post to this route with all the info waiting: put put post // need to write the js tommorrow
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

module.exports = router;
