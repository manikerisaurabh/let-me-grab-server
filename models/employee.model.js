import pool from "../db/connectToDb.js";
import { comparePhoneNumber } from "../utils/encrypt.js";

export const checkDuplicateContact = async (email, phone, id = null) => {
    let query = "SELECT id, email, phone FROM Employee WHERE email = ?";
    let params = [email];

    if (id) {
        query += " AND id != ?";
        params.push(id);
    }

    const [emailRows] = await pool.execute(query, params);
    if (emailRows.length > 0) {
        return { isDuplicate: true, message: "Email already exists." };
    }

    let phoneQuery = "SELECT id, phone FROM Employee";
    let phoneParams = [];
    if (id) {
        phoneQuery += " WHERE id != ?";
        phoneParams.push(id);
    }

    const [phoneRows] = await pool.execute(phoneQuery, phoneParams);

    for (const row of phoneRows) {
        if (!row.phone) continue;

        const isMatch = await comparePhoneNumber(phone, row.phone);
        if (isMatch) {
            return {
                isDuplicate: true,
                message: "Phone number already exists.",
            };
        }
    }

    return { isDuplicate: false, message: null };
};
export const createEmployee = async (employeeData) => {
    const { department_id, name, dob, phone, photo, email, salary, status } =
        employeeData;
    const query =
        "INSERT INTO Employee (department_id, name, dob, phone, photo, email, salary, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await pool.execute(query, [
        department_id,
        name,
        dob,
        phone,
        photo,
        email,
        salary,
        status,
    ]);
    return result.insertId;
};

export const getEmployees = async (limit = 10, offset = 0) => {
    try {
        const parsedLimit = parseInt(limit, 10);
        const parsedOffset = parseInt(offset, 10);

        if (isNaN(parsedLimit) || isNaN(parsedOffset)) {
            throw new Error(
                "Invalid pagination values: limit and offset must be integers"
            );
        }

        const [rows] = await pool.query(
            `SELECT e.id, e.name, e.dob, e.email, e.salary, e.status,
              d.name AS department_name
       FROM Employee e
       JOIN Department d ON e.department_id = d.id
       LIMIT ${parsedLimit} OFFSET ${parsedOffset}`
        );

        return rows;
    } catch (error) {
        console.error("error while getting employee : ", error);
        return [];
    }
};

export const getEmployeeCount = async () => {
    const query = "SELECT COUNT(*) AS total FROM Employee";
    const [rows] = await pool.execute(query);
    return rows[0].total;
};

export const updateEmployee = async (id, employeeData) => {
    const fields = Object.keys(employeeData)
        .map((key) => `${key} = ?`)
        .join(", ");
    const values = Object.values(employeeData);
    const query = `UPDATE Employee SET ${fields}, modified = CURRENT_TIMESTAMP WHERE id = ?`;
    const [result] = await pool.execute(query, [...values, id]);
    return result.affectedRows;
};

export const deleteEmployee = async (id) => {
    const query = "DELETE FROM Employee WHERE id = ?";
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows;
};

export const getDepartmentHighestSalary = async () => {
    const query =
        "SELECT d.name AS department, MAX(e.salary) AS highest_salary FROM Employee e JOIN Department d ON e.department_id = d.id GROUP BY d.name ORDER BY highest_salary DESC";
    const [rows] = await pool.execute(query);
    return rows;
};

export const getSalaryRangeCount = async () => {
    const query = `
        SELECT 
            CASE
                WHEN salary BETWEEN 0 AND 50000 THEN '0-50000'
                WHEN salary BETWEEN 50001 AND 100000 THEN '50001-100000'
                ELSE '100000+'
            END AS salary_range,
            COUNT(*) AS employee_count
        FROM Employee
        GROUP BY salary_range
        ORDER BY FIELD(salary_range, '0-50000', '50001-100000', '100000+')
    `;
    const [rows] = await pool.execute(query);
    return rows;
};

export const getYoungestEmployeeByDepartment = async () => {
    const query = `
        SELECT
            d.name AS department_name,
            e.name,
            TIMESTAMPDIFF(YEAR, e.dob, CURDATE()) AS age
        FROM Employee e
        JOIN Department d ON e.department_id = d.id
        WHERE (e.department_id, e.dob) IN (
            SELECT department_id, MAX(dob)
            FROM Employee
            GROUP BY department_id
        )
    `;
    const [rows] = await pool.execute(query);
    return rows;
};
