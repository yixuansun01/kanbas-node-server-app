// const express = require('express');
import express from "express";
import "dotenv/config";
import session from "express-session";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from  "./Kanbas/assignments/routes.js";
import SecurityController from "./SecurityController.js";
import UserRoutes from "./Users/routes.js" ;
import mongoose from "mongoose"; 
// new add
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);
// old version
//mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

// below codes - order matters
const app = express();
app.use(cors({
    credentials:true,
    origin: process.env.FRONTEND_URL
})
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
  }
  
  app.use(
    session(sessionOptions)
  );
  
app.use(express.json());
//
UserRoutes(app);
// app.use(session({
//     secret: "keyborad cat",
//  }));
 

ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app)
Hello(app);
Lab5(app);
SecurityController(app)
UserRoutes(app)
app.listen(process.env.PORT ||4000);