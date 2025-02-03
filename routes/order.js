const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
const Order = require("../models/order");



//place order

router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;
        

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();


            //saving order in user model

            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id},
            });

            //clearing from cart

            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }
        return res.json({
            status: "success",
            message: "order placed successfully.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//get order History of particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
        try {
            const{id}= req.headers;
            const userData = await User.findById(id).populate({
                path:"orders",
                populate:{path:"book"},
            });

            const ordersData=userData.orders.reverse();
            return res.json({
                status:"success",
                data:ordersData,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
});

//get all orders--admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        
        const userData = await Order.find()
        .populate({
            path:"book",
            })
        .populate({
            path:"user",
        })
        .sort({createdAt:-1});

        return res.json({
            status:"success",
            data:userData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//update-order--admin

router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const{id}= req.params;
        const {status} = req.body;

        // Find the user to verify admin role
        const user = await User.findById(req.headers.id);
        if (user && user.role == "admin"){
        await Order.findByIdAndUpdate(id,{status:req.body.status});

        return res.json({
            status:"success",
            message:"status updated successfully", 
        });
    }else
    {
        console.log("you do nate have admin access.");
        
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;