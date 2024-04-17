import coursesModel from "./model.js";
export const createCourse = (course) => coursesModel.create(course);
export const findAllCourses = () => coursesModel.find();
// export const findCourseById = (courseId) => coursesModel.findById(courseId);
export const findCourseById = (courseId) => coursesModel.findOne({ id: courseId });
export const updateCourse = (courseId, course) =>  coursesModel.updateOne({ id: courseId }, { $set: course });
export const deleteCourse = (courseId) => coursesModel.deleteOne({ id: courseId });
