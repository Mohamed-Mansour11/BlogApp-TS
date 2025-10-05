import { connect } from 'mongoose';

const connectDB = async () => {
    return await connect(process.env.DB_URI as string)
        .then(() => console.log('DB connected'))
        .catch((error) => console.log('Fail to connect', error));
}
export default connectDB;