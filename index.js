const inquirer = require("inquirer");
const colors = require("colors");
const fs = require('fs');
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


    const inquirer = require('inquirer');
    const colors = require('colors'); // Importing colors module
    
    // Assuming you have a pool object defined somewhere for database connection
    const pool = require('./pool'); // Import your pool object from the appropriate file
    
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
    

//TODO: write functions for each choice
//TODO: for view all departments, present formatted table showing dept names and ids