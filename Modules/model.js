import mongoose from "mongoose";
import moduleSchema from "./moduleSchema.js";
const moduleModel = mongoose.model("moduleModel", moduleSchema);
export default moduleModel;