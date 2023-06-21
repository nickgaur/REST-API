const router = require('express').Router({ mergeParams: true });
const { getEventsById, getByType, CreateEvent, DeleteEvent, UpdateEvent } = require("../controllers/eventController")
const { response } = require("../response/response")
router.route('/events')
    .post(CreateEvent)
router
    .route('/events?')
    .get(getEventsById)
    .get(getByType)


router
    .route("/events/:id")
    .put(UpdateEvent)
    .delete(DeleteEvent)


module.exports = router