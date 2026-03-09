const mongoose = require("mongoose")


const blacklistTokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "token is required to blacklist"]
        }
    },
    {timestamp: true}
)

const tokenBlacklistModel = mongoose.model("blacklistedTokens", blacklistTokenSchema)


module.exports = tokenBlacklistModel