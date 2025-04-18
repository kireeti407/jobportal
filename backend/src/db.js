import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const connectDB  = async (req,res)=>{
    try {
        // await mongoose.connect(`${process.env.MONGODB_URL}`)
        
        // await mongoose.connect(`mongodb+srv://Job_portal:<db_password>@usersdata.5i1dbl2.mongodb.net/?retryWrites=true&w=majority&appName=usersdata`)
        await mongoose.connect(`mongodb+srv://${process.env.user_name}:${process.env.password}@lbase.axdxirs.mongodb.net/?retryWrites=true&w=majority&appName=LBASE`)
        console.log("MONGODB CONNECTION SUCCESSFULL!")
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED" ,error)       
    }
}


export default connectDB