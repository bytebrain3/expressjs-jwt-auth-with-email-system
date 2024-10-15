import mongoose from "mongoose"

export const connectDB = async () => {
  try{
    const connect = await mongoose.connect(process.env.DATABASE_URL)
    console.log('database connected', connect.connection.host)
  }catch(error){
    console.log(error)
    process.exit(1)
    
  }
}