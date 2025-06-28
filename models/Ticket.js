const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    dateSubmitted: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "Pending"
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);