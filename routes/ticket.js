const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket');
const auth = require("../auth");
const { verify, verifyAdmin } = auth;

router.post('/', verify, verifyAdmin, ticketController.submitTicket);
router.get('/', verify, verifyAdmin, ticketController.getAllTickets);
router.patch('/:ticketId/status', verify, verifyAdmin, ticketController.updateTicketStatus);
router.delete('/:ticketId', verify, verifyAdmin, ticketController.deleteTicket);

module.exports = router;