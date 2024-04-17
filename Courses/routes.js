// import Database from "../Kanbas/Database/index.js";
import * as dao from "./dao.js";
export default function CourseRoutes(app) {
  app.get("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    // const course = Database.courses
    //   .find((c) => c._id === id);
    const course = await dao.findCourseById(id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });

  app.put("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const course = req.body;
    // Database.courses = Database.courses.map((c) =>
    //   c._id === id ? { ...c, ...course } : c
    // );
    try{
      await dao.updateCourse(id, course);
      res.sendStatus(204);
    }catch(error){
      //console.error(error);
      res.sendStatus(500)
    }
    
  });

  app.delete("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    // Database.courses = Database.courses
    //   .filter((c) => c._id !== id);
    const status = await dao.deleteCourse(id);
    // res.sendStatus(204);
    res.json(status);
  });

  app.post("/api/courses", async (req, res) => {
    // const course = { ...req.body,
    //   _id: new Date().getTime().toString() };
    // Database.courses.push(course);
    // res.send(course);
    const course = await dao.createCourse(req.body);
    res.json(course);
  });

  app.get("/api/courses", async (req, res) => {
    // const courses = Database.courses;
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
}
