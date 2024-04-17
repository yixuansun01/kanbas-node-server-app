import mongoose from "mongoose";
import coursesSchema from "./coursesSchema.js";
const coursesModel = mongoose.model("CoursesModel", coursesSchema);
export default coursesModel;