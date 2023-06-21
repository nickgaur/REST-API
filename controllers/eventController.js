const chalk = require("chalk")
const { getDB } = require("../db/conn")
const { ObjectId, BSONType, BSON } = require("mongodb")
const { response } = require("../response/response")


module.exports.getEventsById = async (req, res, next) => {
    if (!req.query.id) {
        return next()
    }
    try {
        const { id } = req.query;
        if (id.length !== 24) {
            return res.status(400).json({ statusCode: 400, status: "Error", Message: ["Bad Request"], result: {} });
        }
        const db = getDB();
        const event = await db.collection("Events").findOne({ _id: new ObjectId(id) })
        if (event === null) {
            return res.status(404).json({ statusCode: 404, status: "Error", Message: [`Event not found with given id: ${id}`], result: {} })
        }
        return res.status(200).json({ statusCode: 200, status: "Success", Message: [], result: event });
    }
    catch (err) {
        return res.status(500).json({ statusCode: 500, status: "Error", Message: ["Internal Server Error"], result: {} });
    }
}

module.exports.getByType = async (req, res, next) => {
    if (!req.query.type || !req.query.limit || !req.query.page) {
        return next();
    }
    try {
        const { type, limit, page } = req.query
        const db = getDB();
        let event;
        if (type === "oldest") {
            event = await db.collection("Events").find().limit(Number(limit)).sort({ _id: 1 }).skip((Number(limit) * Number(page - 1))).toArray()
        }
        else {
            event = await db.collection("Events").find().limit(Number(limit)).sort({ _id: -1 }).skip((Number(limit) * Number(page - 1))).toArray()
        }
        return res.status(200).json({ statusCode: 200, status: "Success", Message: [], result: event });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ statusCode: 500, status: "Error", Message: ["Internal Server Error"], result: {} });
    }
}

module.exports.CreateEvent = async (req, res) => {
    try {
        const files = req.files
        console.log(files)
        req.body.files = req.files
        const db = getDB();
        const event = await db.collection("Events").insertOne(req.body)
        return res.status(201).json({ statusCode: 201, status: "Success", Message: ["New Event Registered"], result: { eventId: event.insertedId } });
    }
    catch (err) {
        return res.status(500).json({ statusCode: 500, status: "Error", Message: ["Internal Server Error"], result: {} });
    }
}

module.exports.UpdateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (id.length !== 24) {
            return res.json({ statusCode: 400, status: "Error", Message: ["Bad Request"], result: {} });
        }
        const db = getDB();
        const event = await db.collection("Events").findOne({ _id: new ObjectId(id) })
        if (event === null) {
            return res.status(404).json({ statusCode: 404, status: "Error", Message: [`Event not found with given id: ${id}`], result: {} })
        }
        await db.collection("Events").updateOne({ _id: new ObjectId(id) }, { $set: req.body })
        return res.status(202).json({ statusCode: 202, status: "Success", Message: ["Event Updated Successfully"], result: {} });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ statusCode: 500, status: "Error", ErrorMessage: ["Internal Server Error"], result: {} });
    }
}

module.exports.DeleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (id.length !== 24) {
            return res.status(400).json({ statusCode: 400, status: "Error", Message: ["Bad Request"], result: {} });
        }
        const db = getDB();
        const event = await db.collection("Events").findOne({ _id: new ObjectId(id) })
        if (event === null) {
            return res.status(404).json({ statusCode: 404, status: "Error", Message: [`Event not found with given id: ${id}`], result: {} })
        }
        await db.collection("Events").deleteOne({ _id: new ObjectId(id) });
        return res.status(204).json({ statusCode: 204, status: "Success", Message: ["Event Deleted Successfully"], result: {} });
    }
    catch (err) {
        return res.status(500).json({ statusCode: 500, status: "Error", ErrorMessage: ["Internal Server Error"], result: {} });
    }
}