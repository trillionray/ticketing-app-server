const Ticket = require('../models/Ticket');

exports.submitTicket = async (req, res) => {
    try {
        const { feedback } = req.body;
        const { firstName, lastName } = req.user
        const newTicket = new Ticket({ firstName, lastName, feedback });
        const savedTicket = await newTicket.save();

        res.status(201).json({
            message: 'Ticket submitted successfully',
            ticket: savedTicket
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to submit ticket',
            error: error.message
        });
    }
};

exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ dateSubmitted: -1 });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve tickets',
            error: error.message
        });
    }
};

exports.updateTicketStatus = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { status } = req.body;

        const validStatuses = ["Pending", "In Progress", "Resolved", "Closed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Invalid status value'
            });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            { status },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({
                message: 'Ticket not found'
            });
        }

        res.status(200).json({
            message: 'Ticket status updated successfully',
            ticket: updatedTicket
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to update ticket status',
            error: error.message
        });
    }
};


exports.deleteTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;

        const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

        if (!deletedTicket) {
            return res.status(404).json({
                message: 'Ticket not found'
            });
        }

        res.status(200).json({
            message: 'Ticket deleted successfully',
            ticket: deletedTicket
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete ticket',
            error: error.message
        });
    }
};
