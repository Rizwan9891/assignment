require("dotenv").config();

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const orderModel = require("../models/order.model");
const telecallerModel = require("../models/telecaller.model");

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log("Mongo Connected");
    await orderModel.deleteMany({});
    await telecallerModel.deleteMany({});

    const telecallers = await telecallerModel.insertMany([
        {
            name: "Aman Sharma",
            email: "aman@test.com",
            phone: "9876543210",
        },
        {
            name: "Rohit Kumar",
            email: "rohit@test.com",
            phone: "9876543211",
        },
    ]);

    console.log("Telecallers Created");

    const statuses = [
        "NEW",
        "CONFIRMED",
        "DISPATCHED",
        "DELIVERED",
        "CANCELED",
        "RTO",
    ];

    const cities = [
        "Delhi",
        "Noida",
        "Ghaziabad",
        "Gurgaon",
        "Faridabad",
        "Lucknow",
        "Jaipur",
        "Mumbai",
        "Pune",
    ];

    const products = [
        "Shoes",
        "Watch",
        "T-Shirt",
        "Laptop",
        "Mobile",
        "Headphones",
        "Keyboard",
        "Mouse",
        "Bag",
        "Bottle",
    ];

    const orders = [];

    for (let i = 0; i < 100; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        orders.push({
            customerName: faker.person.fullName(),
            phone: faker.string.numeric(10),
            product: products[Math.floor(Math.random() * products.length)],
            quantity: faker.number.int({
                min: 1,
                max: 5,
            }),

            amount: faker.number.int({
                min: 500,
                max: 10000,
            }),

            city: cities[Math.floor(Math.random() * cities.length)],
            status,
            telecaller: telecallers[Math.floor(Math.random() * 2)]._id,
            statusHistory: [
                {
                    status,
                    changedAt: new Date(),
                },
            ],
            createdAt: faker.date.recent({
                days: 60,
            }),
            updatedAt: new Date(),
        });
    }

    await orderModel.insertMany(orders);
    console.log("Orders Inserted");

    process.exit();
}).catch(console.error);