const express = require("express");
const cors = require("cors");
const dbModels = require("./models");
const childRoutes = require("./routes/child")

const app = express();
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:" + process.env.PORT || 8081
};

app.use(cors(corsOptions));

dbModels.sequelize.sync({ force: false })
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.use("/api/child", childRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}.");
});

module.exports = app