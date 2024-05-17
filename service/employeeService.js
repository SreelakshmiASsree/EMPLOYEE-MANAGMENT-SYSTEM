const asyncHandler = require("express-async-handler");
const employeesmodel = require("../models/employeesmodel");

// get all data 
async function getAllEmployees() {
    const employees = await employeesmodel.find().sort({ createdAt: -1 });
    return employees;
}

// create employee
async function createEmployee(employeeData) {
    try {
        const employee = await employeesmodel.create(employeeData);
        return employee;
    } catch (error) {
        throw new Error("Error Creating Employee");
    }
};

// update data
async function updateEmployee(employeeId, updatedData) {
    try {
        const updateEmployee = await employeesmodel.findByIdAndUpdate(employeeId, updatedData, { new: true });
        if (!updateEmployee) {
            throw new Error("Employee Not Found");
        }
        return updateEmployee;
    } catch (error) {
        throw new Error("Error updating employee")
    }
};

//delete employee
async function deleteEmployee(employeeId) {
    try {
        const deleteEmployee = await employeesmodel.findByIdAndDelete(employeeId);
        if (!deleteEmployee) {
            throw new Error("employee not found");
        }
        return deleteEmployee;
    } catch (error) {
        throw new Error("error in deleting Employee");
    }
}

//get empolyee by id
async function getEmployeeById(employeeId) {
    try {
        const employees = await employeesmodel.findById(employeeId);
        if (!employees) {
            throw new Error("Employee Not Found");
        }
        return employees;
    } catch (error) {
        throw new Error("error in get data");
    }
  
};

//search aggregation
async function search(searchParams) {
    try {
        const pipeline = [
            {
                $match: {
                    $and: Object.entries(searchParams).map(([key, value]) => ({
                        [key]: { $regex: value, $options: 'i' }
                    }))
                }
            }

        ];
        const searchResult = await employeesmodel.aggregate(pipeline);
        console.log("searchResult",searchResult)
        return searchResult;
    } catch (error) {
        console.error("Error searching employees:", error);
        throw new Error("Internal server error");
    }
}

module.exports = { deleteEmployee, getAllEmployees, updateEmployee, search, getEmployeeById, createEmployee };