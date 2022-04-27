import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

    name: {type: String,
        required: [true, "Please provide name"],
    },
    email: {type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    position: {
        type: String,
        required: false
    },
    password: {type: String,
        required: [true, "Please add a password"],
        minlenght: 6,
    },
    lastActive: {type: Date
    },
    isSuperAdmin: {type: Boolean},

})

export default mongoose.model("User", userSchema);