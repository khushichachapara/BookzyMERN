const mongoose = require("mongoose");

const order = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "books",
    },
    status: {
        type: String,
        default: "Order placed",
        enum: ["Order placed", "Out for delivery","delivered","Canceled"]
    },
},
    { timestamps: true }
);
module.exports = mongoose.model("order", order);