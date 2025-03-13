import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const MONGO_URI = process.env.MONGO_URI;

const userSchema = new mongoose.Schema({ password: String });
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default async (req, res) => {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        }

        if (req.method === 'POST') {
            const { password } = req.body;
            const user = await User.findOne(); 

            if (user && (await bcrypt.compare(password, user.password))) {
                return res.status(200).json({ success: true });
            }
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }
        
        res.status(405).json({ message: 'Method Not Allowed' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
};
