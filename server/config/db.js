import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Conectado a MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erro ao conectar MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;