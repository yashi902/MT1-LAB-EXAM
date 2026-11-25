fetch('http://localhost:3000/add-employee', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: 3,
        name: 'Aman',
        employeeId: 'EMP103',
        department: 'Finance',
        salary: 40000
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log(error));