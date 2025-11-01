import mongoose from 'mongoose';

const connectDB = async () => {
  try{

    mongoose.connection.on("connected", () => {
      console.log("Database connected Successfully")
    })

    let mongodbURI = process.env.MONGODB_URI

    const projectName = "Resume_Builder_2509"

    if(!mongodbURI){
      throw new Error("MongoDB URI is not defined in the environment variables")
    }

    if (mongodbURI.endsWith("/")) {
      mongodbURI = mongodbURI.slice(0, -1);
    }
    
    await mongoose.connect(`${mongodbURI}/${projectName}`)
  } catch (error) {
    console.error("Error connecting to the database:", error.message)
  }
}

export default connectDB


