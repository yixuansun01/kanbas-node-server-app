//import db from "../Database/index.js";
import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js"
export default function ModuleRoutes(app) {
    app.put("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        // const moduleIndex = db.modules.findIndex(
        //   (m) => m._id === mid);
        // db.modules[moduleIndex] = {
        //   ...db.modules[moduleIndex],
        //   ...req.body
        // };
        const module = req.body;
        try{
            // await dao.updateModule(id, module);
            await dao.updateModule(mid, module);
            res.sendStatus(204);
          }catch(error){
            //console.error(error);
            res.sendStatus(500)
          }
       
      });
    
    app.delete("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        // db.modules = db.modules.filter((m) => m._id !== mid);
        const status = await dao.deleteModule(mid);
        res.json(status);
        // res.sendStatus(200);
      });
    
    app.post("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        // const newModule = {
        //   ...req.body,
        //   course: cid,
        //   _id: new Date().getTime().toString(),
        // };
        // db.modules.push(newModule);
        // res.send(newModule);
        try{
            const course = await courseDao.findCourseById(cid);
            if(!course){
                res.status(404).send("Course not find");
                return;
            }
            const moduleToCreate = {
              ...req.body,
              course: cid
            };
            // const newModule = await dao.createModule({module:req.body, course: cid});
            const newModule = await dao.createModule(moduleToCreate);
            res.json(newModule);
        }catch (error){
            res.sendStatus(500);
        }
      });
    
  app.get("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    // const modules = db.modules
    //   .filter((m) => m.course === cid);
    const modules = await dao.findModulesForCourse(cid);
    res.send(modules);
  });
}
