import * as employeeModel from "../models/employee.model.js";
import { encryptPhoneNumber } from "../utils/encrypt.js";

export const createNewEmployee = async (employeeData) => {
    const { email, phone } = employeeData;
    const { isDuplicate, message } = await employeeModel.checkDuplicateContact(
        email,
        phone
    );
    if (isDuplicate) {
        throw new Error(message);
    }
    const encryptedPhone = await encryptPhoneNumber(phone);
    const newEmployeeData = { ...employeeData, phone: encryptedPhone };
    const newEmployeeId = await employeeModel.createEmployee(newEmployeeData);
    return { id: newEmployeeId, ...employeeData };
};

export const getPaginatedEmployees = async (page, limit) => {
    const offset = (page - 1) * limit;
    const employees = await employeeModel.getEmployees(limit, offset);
    const total = await employeeModel.getEmployeeCount();
    const totalPages = Math.ceil(total / limit);
    return {
        employees,
        currentPage: page,
        totalPages,
        totalItems: total,
    };
};

export const updateExistingEmployee = async (id, employeeData) => {
    const { email, phone } = employeeData;
    if (email || phone) {
        const { isDuplicate, message } =
            await employeeModel.checkDuplicateContact(email, phone, id);
        if (isDuplicate) {
            throw new Error(message);
        }
    }
    if (phone) {
        employeeData.phone = await encryptPhoneNumber(phone);
    }
    const affectedRows = await employeeModel.updateEmployee(id, employeeData);
    if (affectedRows === 0) {
        throw new Error("Employee not found or no changes were made.");
    }
    return affectedRows;
};

export const deleteExistingEmployee = async (id) => {
    const affectedRows = await employeeModel.deleteEmployee(id);
    if (affectedRows === 0) {
        throw new Error("Employee not found.");
    }
    return affectedRows;
};

export const getHighestSalaryByDepartment = async () => {
    return employeeModel.getDepartmentHighestSalary();
};

export const getEmployeeCountBySalaryRange = async () => {
    return employeeModel.getSalaryRangeCount();
};

export const getYoungestEmployeeOfEachDepartment = async () => {
    return employeeModel.getYoungestEmployeeByDepartment();
};
