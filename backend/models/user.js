import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,  // Password is now required
    },
    name: {
        type: String,     // Optional: add user's name
        required: false,
    }
}, {
    timestamps: true,
});

export const User = mongoose.model("User", schema);