import mongoose from "mongoose";


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.Db_URL, {
            dbName:"chatgpt-clone",
        });
        console.log("MongoDb connect");
    } catch (error) {
        console.log(error);
        
    }
    
};

export default connectDb;