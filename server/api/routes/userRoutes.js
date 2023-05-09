import express from "express";
import User from "../models/user.js";
import House from "../models/house.js";
import passport from "passport";
import * as userController from "../controllers/user-controller.js";
const router = express.Router();

import {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} from "../authenticate.cjs";

router.post("/signup", (req, res, next) => {
  // Verify that first name is not empty
  if (!req.body.firstName) {
    res.statusCode = 500;
    res.send({
      name: "FirstNameError",
      message: "The first name is required",
    });
  } else {
    User.register(
      new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName || "";
          const token = getToken({ _id: user._id });
          const refreshToken = getRefreshToken({ _id: user._id });
          user.refreshToken.push({ refreshToken });
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.send(err);
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
              res.send({ success: true, token });
            }
          });
        }
      }
    );
  }
});
router.post("/login", passport.authenticate("local"), (req, res, next) => {
  console.log("logging in " + req.user._id);
  const token = getToken({ _id: req.user._id });
  const refreshToken = getRefreshToken({ _id: req.user._id });
  User.findById(req.user._id).then(
    (user) => {
      user.refreshToken.push({ refreshToken });
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          res.send({ success: true, token });
        }
      });
    },
    (err) => next(err)
  );
});

// module.exports = router
router.post("/refreshToken", (req, res, next) => {
  console.log("refreshToken");
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  if (refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const userId = payload._id;
      console.log(payload);
      User.findOne({ _id: userId }).then(
        (user) => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );

            if (tokenIndex === -1) {
              res.statusCode = 401;
              res.send("Unauthorized1");
            } else {
              const token = getToken({ _id: userId });
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId });
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.send(err);
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                  res.send({ success: true, token });
                }
              });
            }
          } else {
            res.statusCode = 401;
            res.send("Unauthorized2");
          }
        },
        (err) => next(err)
      );
    } catch (err) {
      res.statusCode = 401;
      res.send("Unauthorized3");
    }
  } else {
    res.statusCode = 401;
    res.send("Unauthorized4");
  }
});

router.get("/me", verifyUser, (req, res, next) => {
  res.send(req.user);
});

router.get("/:userId/house", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    // Find the user by ID and populate the house they belong to
    //const house = await House.findById(userId);
    const house = await House.findOne({ "users.user": userId });
    console.log(house);
    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    if (!house) {
      return res
        .status(404)
        .json({ error: "User does not belong to any house", isMember: false });
    }

    res.json({ house, isMember: true });
  } catch (err) {
    console.error("Error checking which house user belongs to", err);
    res.status(500).json({ error: "Internal server error", isMember: false });
  }
});

router.route("/getUsers").get(userController.getList).post(userController.post);
router.route("/getUsers/:id").delete(userController.remove);

// router.get("/users", async (req, res) => {
//   console.log("in route")
//   try {
//     let users = await User.find();
//     res.status(200);
//     res.json(users);
//   } catch (err) {
//     console.error("erroe in get users", err);
//     res.status(500).json(err);
//   }
// });

export default router;
