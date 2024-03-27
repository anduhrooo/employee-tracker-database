const inquirer = require("inquirer");
const colors = require("colors");
const { Pool } = require('pg');

const pool = new Pool(
    {
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    database: 'employees_db'
    },
    console.log(`Connected to the employees database.`)
    )
    
    pool.connect();

//================

let employeeFirstName = []
let employeeLastName = []
let employeeNewRole = []
function employeeVariables() {
    pool.query('SELECT first_name FROM employee', function (err, {rows}) {
        for (let i = 0; i < rows.length; i++) {
            employeeFirstName.push(rows[i].first_name)
        }
    })
    pool.query('SELECT last_name FROM employee', function (err, {rows}) {
        for (let i = 0; i < rows.length; i++) {
            employeeLastName.push(rows[i].last_name)
        }
    })
    pool.query('SELECT title FROM role', function (err, {rows}) {
        for (let i = 0; i < rows.length; i++) {
            employeeNewRole.push(rows[i].title)
        }
    })
    
}

employeeVariables()

function runProgram() {
    inquirer
        .prompt([
            {
                type: "list",
                message: colors.magenta("What would you like to do?"),
                name: "menu",
                choices: [
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add A Department",
                    "Add A Role",
                    "Add an Employee",
                    "Update an Employee Role",
                    "Exit"
                ]
            }
        ])
        .then((response) => {
            console.log(response);
            if (response.menu === 'View All Departments') {
                viewDepartments();
            }
            if (response.menu === 'View All Roles') {
                viewRoles();
            }
            if (response.menu === 'View All Employees') {
                viewEmployees();
            }
            if (response.menu === 'Add A Department') {
                addDepartment();
            }
            if (response.menu === 'Add A Role') {
                addRole();
            }
            if (response.menu === 'Add an Employee') {
                addEmployee();
            }
            if (response.menu === 'Update an Employee Role') {
                updateEmployee();
            }
            if (response.menu === 'Exit') {
                console.log('thanks!');
                process.exit()
            }
            
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
}

runProgram()

//================

function viewDepartments() {
    pool.query('SELECT * FROM department', function (err, {rows}) {
        if (err) {
            console.error('Error fetching departments:', err);
            return;
        }
        console.log(rows);
        runProgram()
    });
}

function viewRoles() {
    pool.query('SELECT * FROM role', function (err, {rows}) {
        if (err) {
            console.error('Error fetching roles:', err);
            return;
        }
        console.log(rows);
        runProgram()
    });
}

function viewEmployees() {
    pool.query('SELECT * FROM employee', function (err, {rows}) {
        if (err) {
            console.error('Error fetching roles:', err);
            return;
        }
        console.log(rows);
        runProgram()
    });
}

//================

function addDepartment() {
    inquirer
    .prompt([
        {
        type: "input",
        message: colors.magenta("What department would you like to add?"),
        name: "departmentName"
    }
])
    .then((response) => {
        pool.query(`INSERT INTO department (name) VALUES ('${response.departmentName}')`, function (err, { rows }) {
            if (err) {
                console.error('Error inserting department:', err);
                return;
            }
            console.log(response.departmentName + ` added 👍`);
            runProgram()
        });
    })
    .catch(error => {
        console.error('Error:', error);
    })}


function addRole() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: colors.magenta("What role would you like to add?"),
                    name: "roleTitle"
                },
                {
                    type: "input",
                    message: colors.magenta("What is the salary for the role?"),
                    name: "roleSalary"
                },
                {
                    type: "list",
                    message: colors.magenta("What department is the role? (management - 1, admin - 2, finance - 3, sales - 4, customer service - 5, human resources - 6"),
                    name: "roleDepartment",
                    choices: [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                    ]
                }
            ])
            .then((response) => {
                pool.query(`INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)`, 
                //TODO:
                [response.roleTitle, response.roleSalary, response.roleDepartment], function (err, { rows }) {
                    if (err) {
                        console.error('Error inserting role:', err);
                        exit;
                    }
                    console.log(response.roleTitle + ` added 👍`);
                    runProgram()
                });
            })
            .catch(error => {
                console.error('Error:', error);
            })}

    
function addEmployee() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: colors.magenta("What is the employees first name?"),
                    name: "firstName"
                },
                {
                    type: "input",
                    message: colors.magenta("What is the employees last name?"),
                    name: "lastName"
                },
                {
                    type: "list",
                    message: colors.magenta("What role is the employee? (regional manager - 1, receptionist - 2, sales representative - 3, accountant - 4, customer service rep - 5, hr representative - 6"),
                    name: "employeeRole",
                    choices: [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6
                    ]

                }
            ])
            .then((response) => {
                pool.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)`, 
                //TODO:
                [response.firstName, response.lastName, response.employeeRole], function (err, { rows }) {
                    if (err) {
                        console.error('Error inserting employee:', err);
                        return;
                    }
                    console.log(response.firstName, response.lastName + ` added to database 👍`)
                    runProgram();
                });
            })
            .catch(error => {
                console.error('Error:', error);
            })}

//================

function updateEmployee() {
    inquirer
    .prompt([
        {
            type: "list",
            message: colors.magenta("what employee would you like to update?"),
            name: "employeeUpdate",
            choices: employeeFirstName
        },
        
        {
            type: "list",
            message: colors.magenta("what role would you like to assign them?"),
            name: "roleUpdate",
            choices: employeeNewRole
        },
    ])
    .then((response) => {
        pool.query(`UPDATE employee SET role_id = ($1) WHERE first_name = ($2)`, 
        //TODO:
        [1, response.employeeUpdate], function (err, { rows }) {
            if (err) {
                console.error('Error inserting employee:', err);
                return;
            }
            console.log(response.employeeUpdate + ` is now a ` + response.roleUpdate)
            runProgram();
        });
    })
    .catch(error => {
        console.error('Error:', error);
    })
}
