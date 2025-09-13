import * as DepartmentService from "../services/department.service.js";

export const createDepartment = async (req, res) => {
    try {
        const department = await DepartmentService.createDepartment(req.body);
        res.status(201).json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDepartments = async (req, res) => {
    try {
        const departments = await DepartmentService.getDepartments();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDepartmentById = async (req, res) => {
    try {
        const department = await DepartmentService.getDepartmentById(
            req.params.id
        );
        if (!department) return res.status(404).json({ message: "Not found" });
        res.json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateDepartment = async (req, res) => {
    try {
        const department = await DepartmentService.updateDepartment(
            req.params.id,
            req.body
        );
        res.json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteDepartment = async (req, res) => {
    try {
        const result = await DepartmentService.deleteDepartment(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
