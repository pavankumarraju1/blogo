import mongoose from "mongoose"

const connection = async(url)=>{
    await mongoose.connect(url);
    console.log("db connected");
}

export default connection; 