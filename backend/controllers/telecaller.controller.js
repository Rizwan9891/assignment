const telecallerModel = require("../models/telecaller.model");

// Create Telecaller
const createTelecaller = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const exists = await telecallerModel.findOne({
            $or: [{ email }, { phone }]
        });

        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Telecaller already exists",
            });
        }

        const telecaller = await telecallerModel.create({
            name,
            email,
            phone,
        });

        res.status(201).json({
            success: true,
            message: "Telecaller created successfully",
            data: telecaller,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Telecallers
const getTelecallers = async (req, res) => {
    try {

        const telecallers = await telecallerModel.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: telecallers.length,
            data: telecallers,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Single Telecaller
const getTelecaller = async (req, res) => {
    try {

        const telecaller = await telecallerModel.findById(req.params.id);

        if (!telecaller) {
            return res.status(404).json({
                success: false,
                message: "Telecaller not found",
            });
        }

        res.status(200).json({
            success: true,
            data: telecaller,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Telecaller
const updateTelecaller = async (req, res) => {
    try {

        const telecaller = await telecallerModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!telecaller) {
            return res.status(404).json({
                success: false,
                message: "Telecaller not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Telecaller updated successfully",
            data: telecaller,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createTelecaller,
    getTelecallers,
    getTelecaller,
    updateTelecaller,
};