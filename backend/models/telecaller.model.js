const mongoose = require("mongoose");

const telecallerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, },
        email: { type: String, required: true, unique: true, },
        phone: { type: String, required: true, },
        active: { type: Boolean, default: true, },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Telecaller", telecallerSchema);