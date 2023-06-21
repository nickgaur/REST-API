const router = require('express').Router({ mergeParams: true });
const { getEventsById, getByType, CreateEvent, DeleteEvent, UpdateEvent } = require("../controllers/eventController")
const { response } = require("../response/response")
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


router.route('/events')
    .post(upload.array('files', 12), CreateEvent)
router
    .route('/events?')
    .get(getEventsById)
    .get(getByType)


router
    .route("/events/:id")
    .put(UpdateEvent)
    .delete(DeleteEvent)


module.exports = router