require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express")
const PORT = process.env.PORT || 3000
const cors = require("cors");

const ordersRoute = require("./routes/order.route");
const telecallerRoute = require("./routes/telecaller.routes");

mongoose.connect(process.env.MONGO_URI).then((connection) => {
    console.log("MongoDB Database has been connected successfully!")
}).catch((err) => {
    console.log(err)
    console.log("An Error Occurred")
})

const app = express()
app.use(cors());
app.use(express.json());

app.use("/api/orders", ordersRoute);
app.use("/api/telecallers", telecallerRoute);

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "The Server is running successfully!" });
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})