import mongoose, {Schema} from "mongoose";


const PasswordResetsSchema = new Schema({
    email: {type: String, required: true},
    token: {type: String, required: true},
    expires: {type: Date, required: true},
})

export default mongoose.model('PasswordResets', PasswordResetsSchema)