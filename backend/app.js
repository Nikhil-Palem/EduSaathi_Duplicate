import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser';
import userRoute from "./routes/user.route.js"
import applicationRoute from "./routes/new application/application.route.js";
// import application2Route from "./routes/application2.route.js";
import collegeRoute from "./routes/college.route.js";
import adminRoute from "./routes/admin.route.js";
import uploadApplicationRoute from "./routes/uploadApplication.route.js";
import leadRoute from "./routes/lead.route.js";
const app = express();
// Init Middleware

app.use(cors({origin: process.env.CORS_ORIGIN, credentials: true}))
app.use(express.json({ extended: false }));
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req, res) => res.send('API Running'));

// Define Routes

//route declare

app.use("/api/v1/users", userRoute);
app.use("/api/v1/application", applicationRoute)
// app.use("/api/v1/application", application2Route)
app.use("/api/v1/uploadApplication", uploadApplicationRoute)
app.use("/api/v1/colleges", collegeRoute)
app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/lead", leadRoute)
// app.use('/api/users', router('./routes/users'));
// app.use('/api/auth', router('./routes/auth'));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export {app};