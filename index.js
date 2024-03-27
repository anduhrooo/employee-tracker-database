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
                "Update an Employee Role"
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
        if (response.menu === 'Add An Employee') {
            addEmployee();
        }
        
    })
    .catch(error => {
        console.error('Error occurred:', error);
    });

function viewDepartments() {
    pool.query('SELECT * FROM department', function (err, {rows}) {
        if (err) {
            console.error('Error fetching departments:', err);
            return;
        }
        console.log(rows);
    });
}

function viewRoles() {
    pool.query('SELECT * FROM role', function (err, {rows}) {
        if (err) {
            console.error('Error fetching roles:', err);
            return;
        }
        console.log(rows);
    });
}

function viewEmployees() {
    pool.query('SELECT * FROM employee', function (err, {rows}) {
        if (err) {
            console.error('Error fetching roles:', err);
            return;
        }
        console.log(rows);
    });
}

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
        const departmentName = response.departmentName;
        pool.query(`INSERT INTO department (name) VALUES ('${departmentName}')`, function (err, { rows }) {
            if (err) {
                console.error('Error inserting department:', err);
                return;
            }
            console.log('Department added successfully:', departmentName);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    })}


function addRole() {
    let departments = [];
    pool.query(`SELECT name FROM department`, function (err, { rows }) {
        if (err) {
            console.error('Error fetching departments:', err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            departments.push(rows[i].name);
        }
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
                    message: colors.magenta("What department is the role?"),
                    name: "roleDepartment",
                    choices: departments
                }
            ])
            .then((response) => {
                pool.query(`INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)`, 
                //TODO:
                [response.roleTitle, response.roleSalary, 1], function (err, { rows }) {
                    if (err) {
                        console.error('Error inserting role:', err);
                        return;
                    }
                    console.log(rows);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            })}
    )}