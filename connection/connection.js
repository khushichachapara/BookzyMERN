const mongoose=require("mongoose");

const connection =async()=>{
    try{
        await mongoose.connect(`${process.env.URI}`);
        console.log("connected to database");
        
    }catch(error){
        console.log(error);
    };
    
};
connection();