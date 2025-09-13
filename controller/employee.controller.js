import * as employeeService from "../services/employee.service.js";
import {
    validateData,
    employeeSchema,
    employeeUpdateSchema,
} from "../utils/validation.js";

export const createEmployee = async (req, res) => {
    try {
        const { isValid, message } = validateData(employeeSchema, req.body);
        if (!isValid) {
            return res.status(400).json({ message });
        }
        const newEmployee = await employeeService.createNewEmployee(req.body);
        res.status(201).json({
            message: "Employee created successfully.",
            data: newEmployee,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEmployees = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const data = await employeeService.getPaginatedEmployees(page, limit);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { isValid, message } = validateData(
            employeeUpdateSchema,
            req.body
        );
        if (!isValid) {
            return res.status(400).json({ message });
        }
        const affectedRows = await employeeService.updateExistingEmployee(
            id,
            req.body
        );
        if (affectedRows === 0) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.status(200).json({ message: "Employee updated successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await employeeService.deleteExistingEmployee(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.status(200).json({ message: "Employee deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDepartmentHighestSalary = async (req, res) => {
    try {
        const data = await employeeService.getHighestSalaryByDepartment();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSalaryRangeCount = async (req, res) => {
    try {
        const data = await employeeService.getEmployeeCountBySalaryRange();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getYoungestEmployee = async (req, res) => {
    try {
        const data =
            await employeeService.getYoungestEmployeeOfEachDepartment();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
