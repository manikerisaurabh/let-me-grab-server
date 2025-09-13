import express from "express";
import {
    createEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
    getDepartmentHighestSalary,
    getSalaryRangeCount,
    getYoungestEmployee,
} from "../controller/employee.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - department_id
 *         - email
 *         - phone
 *         - salary
 *         - dob
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the employee.
 *         department_id:
 *           type: integer
 *           description: The ID of the employee's department.
 *         name:
 *           type: string
 *           description: The name of the employee.
 *         dob:
 *           type: string
 *           format: date
 *           description: The employee's date of birth (YYYY-MM-DD).
 *         phone:
 *           type: string
 *           description: The encrypted phone number of the employee.
 *         photo:
 *           type: string
 *           description: URL to the employee's photo.
 *         email:
 *           type: string
 *           format: email
 *           description: The employee's email address.
 *         salary:
 *           type: number
 *           format: float
 *           description: The employee's salary.
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           description: The status of the employee.
 *         created:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp.
 *         modified:
 *           type: string
 *           format: date-time
 *           description: The last modification timestamp.
 *       example:
 *         id: 1
 *         department_id: 101
 *         name: John Doe
 *         dob: "1990-05-15"
 *         phone: "encrypted_phone_hash"
 *         photo: "http://example.com/photo.jpg"
 *         email: "john.doe@example.com"
 *         salary: 75000.00
 *         status: "active"
 *     SalaryRange:
 *       type: object
 *       properties:
 *         salary_range:
 *           type: string
 *           example: "0-50000"
 *         employee_count:
 *           type: integer
 *           example: 3
 *     DepartmentHighestSalary:
 *       type: object
 *       properties:
 *         department:
 *           type: string
 *           example: "Engineering"
 *         highest_salary:
 *           type: number
 *           format: float
 *           example: 120000.00
 *     YoungestEmployee:
 *       type: object
 *       properties:
 *         department_name:
 *           type: string
 *           example: "Marketing"
 *         name:
 *           type: string
 *           example: "Jane Smith"
 *         age:
 *           type: integer
 *           example: 25
 */

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management and statistics API
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Retrieves a list of all employees with pagination.
 *     tags: [Employees]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of employees per page.
 *     responses:
 *       200:
 *         description: A list of employees.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *       500:
 *         description: Internal server error.
 */
router.get("/employees", getEmployees);

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Adds a new employee.
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Bad request, validation failed.
 *       500:
 *         description: Internal server error.
 */
router.post("/employees", createEmployee);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Updates an employee by ID.
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the employee to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully.
 *       400:
 *         description: Bad request, validation failed.
 *       404:
 *         description: Employee not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/employees/:id", updateEmployee);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Deletes an employee by ID.
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the employee to delete.
 *     responses:
 *       200:
 *         description: Employee deleted successfully.
 *       404:
 *         description: Employee not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/employees/:id", deleteEmployee);

/**
 * @swagger
 * /employees/statistics/highest-salary:
 *   get:
 *     summary: Retrieves the highest salary per department.
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of departments and their highest salaries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DepartmentHighestSalary'
 *       500:
 *         description: Internal server error.
 */
router.get("/employees/statistics/highest-salary", getDepartmentHighestSalary);

/**
 * @swagger
 * /employees/statistics/salary-range-count:
 *   get:
 *     summary: Retrieves employee count by salary range.
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: An object with salary ranges and employee counts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SalaryRange'
 *       500:
 *         description: Internal server error.
 */
router.get("/employees/statistics/salary-range-count", getSalaryRangeCount);

/**
 * @swagger
 * /employees/statistics/youngest-employee:
 *   get:
 *     summary: Retrieves the youngest employee from each department.
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of the youngest employees per department.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/YoungestEmployee'
 *       500:
 *         description: Internal server error.
 */
router.get("/employees/statistics/youngest-employee", getYoungestEmployee);

export default router;
