import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";
import employeeRoutes from "./routes/employee.routes.js";
import departmentRoutes from "./routes/department.routes.js";
const app = express();

app.use(express.json());

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Employee Management API",
            version: "1.0.0",
            description:
                "A comprehensive API for managing employees and retrieving statistics.",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}/api`,
            },
        ],
    },
    apis: ["./routes/*.js"],
};

app.use("/api", employeeRoutes);
app.use("/api/departments", departmentRoutes);

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
    console.log(
        `Swagger docs available at http://localhost:${
            process.env.PORT || 8080
        }/api-docs`
    );
});
