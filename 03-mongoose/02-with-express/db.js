import mongoose from "mongoose";

const mongoDBUri = process.env.MONGODB_URI;

if (!mongoDBUri) {
    console.error('MONGODB_URI environment variable is not defined');
    process.exit(1);
}

const connect = async () => {
    try {
        await mongoose.connect(mongoDBUri);
        console.log('Connected to MongoDD');
    } catch (error) {
        throw error;
    }
}

const close = async () => mongoose.connection.close();

export default { connect, close };