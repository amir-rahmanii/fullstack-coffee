const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true // Added validation message
    },
    expire : {
        type : Date ,
        required : true,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }
},
    { timestamps: true },
);

const refreshToken = mongoose.models.RefreshToken || mongoose.model("RefreshToken", schema);

export default refreshToken;
