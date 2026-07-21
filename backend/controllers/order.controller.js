const orderModel = require("../models/order.model");
const telecallerModel = require("../models/telecaller.model");

const createOrder = async (req, res) => {
    try {
        const {
            customerName,
            phone,
            product,
            quantity,
            amount,
            telecaller,
            city,
        } = req.body;

        if (!customerName?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Customer name is required",
            });
        }

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Phone number is required",
            });
        }

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Phone number must be exactly 10 digits",
            });
        }

        if (quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be greater than 0",
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Amount must be greater than 0",
            });
        }

        const telecallerExists = await telecallerModel.findById(telecaller);

        if (!telecallerExists) {
            return res.status(404).json({
                success: false,
                message: "Telecaller not found"
            });
        }

        const order = await orderModel.create({
            customerName,
            phone,
            product,
            quantity,
            amount,
            telecaller,
            city,
            status: "NEW",
            statusHistory: [
                {
                    status: "NEW",
                },
            ],
        });

        res.status(201).json({
            success: true,
            message: "Order Created Successfully",
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getOrders = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            status,
            city,
            telecaller,
            search,
        } = req.query;

        const query = {};

        if (status) query.status = status;
        if (city) query.city = city;
        if (telecaller) query.telecaller = telecaller;
        if (search) {
            query.$or = [
                {
                    customerName: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];

            if (!isNaN(search)) {
                query.$or.push({
                    phone: Number(search),
                });
            }
        }

        const skip = (page - 1) * limit;
        const total = await orderModel.countDocuments(query);

        const orders = await orderModel.find(query)
            .populate("telecaller", "name email phone")
            .sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit),
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id).populate("telecaller", "name email phone");;

        if (!order)
            return res.status(404).json({
                success: false,
                message: "Order Not Found",
            });

        res.json({
            success: true,
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await orderModel.findById(req.params.id);

        if (!order)
            return res.status(404).json({
                success: false,
                message: "Order Not Found",
            });

        const validStatus = [
            "NEW",
            "CONFIRMED",
            "DISPATCHED",
            "DELIVERED",
            "CANCELED",
            "RTO",
        ];

        if (!validStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Status",
            });
        }

        order.status = status;

        order.statusHistory.push({
            status,
            changedAt: new Date(),
        });

        await order.save();

        res.json({
            success: true,
            message: "Status Updated",
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getStats = async (req, res) => {
    try {
        const totalOrders = await orderModel.countDocuments();

        const revenue = await orderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        const statusBreakdown = await orderModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);

        const topTelecallers = await orderModel.aggregate([
            {
                $group: {
                    _id: "$telecaller",
                    orders: {
                        $sum: 1
                    }
                }
            },
            {
                $lookup: {
                    from: "telecallers",
                    localField: "_id",
                    foreignField: "_id",
                    as: "telecaller"
                }
            },
            {
                $unwind: "$telecaller"
            },
            {
                $project: {
                    orders: 1,
                    name: "$telecaller.name"
                }
            },
            {
                $sort: {
                    orders: -1
                }
            },
            {
                $limit: 5
            }
        ]);

        const ordersPerDay = await orderModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                        },
                    },
                    orders: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);

        res.json({
            success: true,
            data: {
                totalOrders,
                totalRevenue: revenue[0]?.totalRevenue || 0,
                statusBreakdown,
                topTelecallers,
                ordersPerDay,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateStatus,
    getStats,
};