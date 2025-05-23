import { time, timeStamp } from "console";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

const shortUrlSchema = new mongoose.Schema({
    fullUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true, default: () => nanoid().substring(0, 10) },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
},{
    timestamps: true,
}
);

export const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);
export default ShortUrl;