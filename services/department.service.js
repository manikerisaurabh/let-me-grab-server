import * as DepartmentModel from "../models/department.model.js";

export const createDepartment = async (data) => {
    return await DepartmentModel.createDepartment(data);
};

export const getDepartments = async () => {
    return await DepartmentModel.getDepartments();
};

export const getDepartmentById = async (id) => {
    return await DepartmentModel.getDepartmentById(id);
};

export const updateDepartment = async (id, data) => {
    return await DepartmentModel.updateDepartment(id, data);
};

export const deleteDepartment = async (id) => {
    return await DepartmentModel.deleteDepartment(id);
};
