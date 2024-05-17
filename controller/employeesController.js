// CRUD opertions controllering //
const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeesmodel");
const employeeService = require("../service/employeeService")

const upload = require("../config/multer");
const path = require("path")
const fs = require("fs");


//GET DATA
const getemployees = asyncHandler(async (req, res) => {
    try {

        const getsemployee = await employeeService.getAllEmployees();
        res.status(200).json(getsemployee);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})



//CREATE DATA
const postemployee = asyncHandler(async (req, res) => {
    const { salutation, firstName, lastName, email, phone, username, password, dob, gender, qualifications, address, country, state, city } = req.body;
    if (!salutation || !firstName || !lastName || !email || !phone || !username || !password || !dob || !gender || !qualifications || !address || !country || !state || !city) {
        // console.log(req.body);
        res.status(404);
        throw new Error("all fields are mandatory");
    }
    const employees = await Employee.create({
        salutation,
        firstName,
        lastName, email,
        phone, username,
        password, dob,
        gender, qualifications,
        address, country, state,
        city
        // user_id:req.user.id
    });
    res.status(201).json(employees);
});

//IMAGE
const postimg = async (req, res) => {
    if (req.file) {
        const imgPath = `public/uploads/${req.file.filename}`;
        await Employee.findByIdAndUpdate(req.params.id, { image: imgPath });

        res.status(200).json({ message: 'Image uploaded successfully...............' });
    } else {
        console.log('No file uploaded');
        res.status(400).json({ message: 'Failed to upload image...............' });
    }
}


//GET DATA
const getemployee = asyncHandler(async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employees = await employeeService.getEmployeeById(employeeId);
        console.log("employees", employees);
        
        res.status(200).json(employees);
        // res.status(200).json({status: "success", data: employees, message: "suc"});
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});



//UPDATE EMPLOYEE
const updateemployee = asyncHandler(async (req, res) => {
    try {
        const employeeId = req.params.id;
        const existingEmployee = await Employee.findById(employeeId);
        if (!existingEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        // Update only if a new file upload
        const updatedData = {
            ...req.body,
        };
        const updatedEmployee = await employeeService.updateEmployee(employeeId, updatedData);
        return res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});



//DELETE EMPLOYEE
const deleteemployee = asyncHandler(async (req, res) => {
    try {
        const employeeId = req.params.id;
        const deletedemployee = await employeeService.deleteEmployee(employeeId);

        const imagepath = path.join(__dirname, '..', 'public', 'uploads', `${employeeId}.png`);
        if (fs.existsSync(imagepath)) {
            fs.unlinkSync(imagepath);
        }
        res.status(200).json(deletedemployee);
    } catch (error) {
        res.status(204).json({ error: error.message })
    }
})

//searchbar
const searchEmployees = asyncHandler(async (req, res) => {
    try {
        const searchParams = req.query; // Assuming search parameters are passed in query string
        console.log(searchParams)
        const searchResult = await employeeService.search(searchParams);
        console.log("search", searchResult);
        res.status(200).json(searchResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = { getemployees, getemployee, postemployee, updateemployee, deleteemployee, postimg, searchEmployees }