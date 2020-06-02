const router = require("express").Router();

router
  .route("/")
  .get((req, res, next) => {
    res.status(200).json({ success: true, msg: "Get all events" });
  })
  .post((req, res, next) => {
    res
      .status(201)
      .json({ success: true, msg: "Post new event", data: req.body });
  });

router
  .route("/:id")
  .get((req, res, next) => {
    res.status(200).json({
      success: true,
      msg: `Get a single event under ID: ${req.params.id}`,
    });
  })
  .put((req, res, next) => {
    res.status(200).json({
      success: true,
      msg: "Update event under ID: " + req.params.id,
      data: req.body,
    });
  })
  .delete((req, res, next) => {
    res.status(200).json({
      success: true,
      msg: `Delete event under ID: ${req.params.id}`,
    });
  });
module.exports = router;
