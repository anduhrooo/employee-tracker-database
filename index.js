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


inquirer
    .prompt([
        {
            type: "list",
            message: colors.magenta("what would you like to do?"),
            name: "menu",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add A Department",
                "Add A Roll",
                "Add an Employee",
                "Update an Employee Role"
            ]
        }
    ])
    .then((response) => {
    console.log(response);
    
    });

    //TODO: write functions for each choice
    //TODO: for view all departments, present formatted table showing dept names and ids
    