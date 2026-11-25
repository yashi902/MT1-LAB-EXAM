
const http = require('http');
const fs = require('fs');
const path = require('path');

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

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(
            path.join(__dirname, 'index.html'),
            'utf8',
            (err, data) => {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    return res.end('Server Error');
                }
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(data);
            }
        );
    }
    else if (req.method === 'GET' && req.url === '/employees') {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(employees));

    }
    else if (req.method === 'GET' && req.url === '/about') {

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Employee Management Application using Node.js');

    }
    else if (req.method === 'POST' && req.url === '/add-employee') {

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const employee = JSON.parse(body);
                if (
                    employee.id === undefined ||
                    !employee.name ||
                    !employee.employeeId ||
                    !employee.department ||
                    employee.salary === undefined
                ) {
                    res.writeHead(400, {
                        'Content-Type': 'application/json'
                    });
                    return res.end(JSON.stringify({
                        message: 'All fields are required'
                    }));
                }
                employees.push(employee);
                res.writeHead(201, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    message: 'Employee added successfully',
                    employee: employee
                }));
            } catch (error) {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({
                    message: 'Invalid JSON data'
                }));
            }
        });

    }
    else {

        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('404 - Page Not Found');
    }
});

server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});
