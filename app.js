const express = require("express");
const app = express();
const cors=require("cors");

require("dotenv").config();
require("./connection/connection");

const Order = require("./routes/order");
const Fevourite = require("./routes/fevourite");
const Cart = require("./routes/cart");
const user = require("./routes/user");
const Books = require("./routes/book");

app.use(cors());
app.use(express.json());

//router

app.use("/api/v1", Fevourite);
app.use("/api/v1",Cart);
app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1",Order);
//creating port

app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT ${process.env.PORT}`);
});