const express = require("express");
const cors = require("cors");
const dbModels = require("./sequelize");
const childPropertyRoutes = require("./routes/child_properties")
const childRoutes = require("./routes/child")
const schoolRoutes = require("./routes/school")
const teacherRoutes = require("./routes/teacher")
const schoolTeacherRoutes = require("./routes/teacher_school")
const teacherChildrenRoutes = require("./routes/teacher_children")
const sheetRoutes = require("./routes/sheet")

const app = express();
app.use(express.json());

const corsOptions = {
    origin : [ 'http://localhost:8081' , 'http://dev-childmi.ee:8080' ],
    methods: ["GET" , "POST" , "PUT", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));

dbModels.sequelize.sync({ force: false })
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.use("/api/child_properties/", childPropertyRoutes);
app.use("/api/child/", childRoutes);
app.use("/api/school/", schoolRoutes);
app.use("/api/school_teachers/", schoolTeacherRoutes);
app.use("/api/teacher_children/", teacherChildrenRoutes);
app.use("/api/teacher/", teacherRoutes);
app.use("/api/sheets/", sheetRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app