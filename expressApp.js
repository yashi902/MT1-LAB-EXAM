
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

let employees = [{
    id: 1,
    name: "Rahul",
    employeeId: "EMP101",
    department: "IT",
    salary: 30000
},
{
    id: 2,
    name: "Priya",
    employeeId: "EMP102",
    department: "HR",
    salary: 35000
}];

app.get('/', (req, res) => {
    fs.readFile(
        path.join(__dirname, 'index.html'),
        'utf8',
        (err, data) => {
            if (err) {
                return res.status(500).send('Error loading page');
            }
            res.send(data);
        }
    );
});

app.get('/employees', (req, res) => {
    res.json(employees);
});

app.get('/about', (req, res) => {
    res.send('This is Employee Management System');
});

app.post('/add-employee', (req, res) => {

    const { id, name, employeeId, department, salary } = req.body;

    if (!id || !name || !employeeId || !department || !salary) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    const newEmployee = {
        id,
        name,
        employeeId,
        department,
        salary
    };

    employees.push(newEmployee);
    res.status(201).json({
        message: 'Employee added successfully',
        employee: newEmployee
    });
});


app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.listen(4000, () => {
    console.log('Server running at http://localhost:4000');
});
