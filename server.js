import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import sequelize from "./config/db.connection.js";
import adminRoutes from "./src/routes/admin.route.js";
import categoryRoute from "./src/routes/category.route.js";
import diseaseRoute from "./src/routes/disease.route.js";
import questionRoute from "./src/routes/question.route.js";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
    "Content-Type: multipart/form-data"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

//connect database
sequelize
  .authenticate()
  .then(() => {
    console.log("connection has been established successfully");
  })
  .catch((error) => {
    console.error("unable connect to the database: ", error);
  });

//Table creation
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("tables created");
  })
  .catch((error) => {
    console.error("unable to create tables: ", error);
  });

// Main Routes
app.use("/admin", adminRoutes);
app.use("/category", categoryRoute);
app.use("/questions", questionRoute);
app.use("/disease", diseaseRoute);

//run server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
