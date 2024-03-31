import db from "../Database/index.js";
function AssignmentRoutes(app) {
    app.put("/api/assignments/:mid", (req, res) => {
        const { mid } = req.params;
        const assignmentIndex = db.assignments.findIndex(
          (a) => a._id === mid);
        db.assignments[assignmentIndex] = {
          ...db.assignments[assignmentIndex],
          ...req.body
        };
        res.sendStatus(204);
      });
    
    app.delete("/api/assignments/:mid", (req, res) => {
        const { mid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== mid);
        res.sendStatus(200);
      });
    
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
          ...req.body,
          course: cid,
          _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
      });
    
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments
      .filter((a) =>a.course === cid);
    res.send(assignments);
  });
}
export default AssignmentRoutes;