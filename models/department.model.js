import pool from "../db/connectToDb.js";

export const createDepartment = async ({ name, status }) => {
    const [result] = await pool.query(
        `INSERT INTO Department (name, status, created, modified) 
     VALUES (?, ?, NOW(), NOW())`,
        [name, status]
    );
    return { id: result.insertId, name, status };
};

export const getDepartments = async () => {
    const [rows] = await pool.query(
        `SELECT id, name, status, created, modified FROM Department`
    );
    return rows;
};

export const getDepartmentById = async (id) => {
    const [rows] = await pool.query(
        `SELECT id, name, status, created, modified 
     FROM Department WHERE id = ?`,
        [id]
    );
    return rows[0];
};

export const updateDepartment = async (id, { name, status }) => {
    await pool.query(
        `UPDATE Department 
     SET name = ?, status = ?, modified = NOW() 
     WHERE id = ?`,
        [name, status, id]
    );
    return { id, name, status };
};

export const deleteDepartment = async (id) => {
    await pool.query(`DELETE FROM Department WHERE id = ?`, [id]);
    return { message: "Department deleted successfully" };
};
