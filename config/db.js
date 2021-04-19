import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const { connection } = await mongoose.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});

		console.log(`MongoDB connected: ${connection.host}`.cyan.underline);
	} catch (error) {
		console.error(`MongoDB connection error: ${error.message}`.brightRed);
		process.exit(1);
	}
};

export default connectDB;
