const mysql = require("mysql2");
const connection = require("./config/connection");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const util = require("util");
const logo = require("asciiart-logo");
const chalk = require('chalk');


// Welcome Title logo

const displayTitle = () => {
  const longText = "A command prompt app to manage your employee database";
  console.log(
    logo({
      name: "Employee Management System",
      font: "ANSI Shadow",
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: "bold-red",
      logoColor: "green",
      textColour: "blue",
    })
      .emptyLine()
      .center(longText)
      .emptyLine()
      .right("Version 0.3")
      .right("Created by Tanvir Hossain")
      .render()
  );
};
displayTitle(); 

// Create the connection to MySQL WorkBench

connection.query = util.promisify(connection.query);

// Begin the application after establishing the connection.

connection.connect(function (err) {
  if (err) throw err;
  start();
});

// Ask the user initial action question.

const start = async () => {
  try {
    let question = await inquirer.prompt({
      name: "initial",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Employees",
        "View Departments",
        "View Roles",
        "Add Employees",
        "Add Departments",
        "Add Roles",
        "Update Employee Role",
        "Exit",
      ],
    });
    switch (question.initial) {
      case "View Employees":
        employeeView();
        break;

      case "View Departments":
        departmentView();
        break;

      case "View Roles":
        roleView();
        break;

      case "Add Employees":
        employeeAdd();
        break;

      case "Add Departments":
        departmentAdd();
        break;

      case "Add Roles":
        roleAdd();
        break;

      case "Update Employee Role":
        employeeUpdate();
        break;

      case "Exit":
        connection.end();
        break;
    }
  } catch (err) {
    console.log(chalk.bgRed(err));
    start();
  }
};

// Selection to view all of the employees.

const employeeView = async () => {
  console.log(chalk.yellow("****||View Employee||****"));
  try {
    let query = `SELECT 
    employee.id,
    employee.first_name, 
    employee.last_name,
    employee.manager_id AS employee_id_of_manager,
    role.department_id,
    department.department_name,
    role.title, 
    role.id,
    role.salary
    FROM role
    LEFT JOIN employee
    ON role.id = employee.role_id
    LEFT JOIN department
    ON department.id = role.department_id
    WHERE employee.id IS NOT NULL`;
;
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  } catch (err) {
    console.log(chalk.bgRed(err));
    start();
  }
};

// Selection to view all of the departments.

const departmentView = async () => {
    console.log(chalk.yellow("****||View Department||****"));
  try {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  } catch (err) {
    console.log(chalk.bgRed(err));
    start();
  }
};

// Selection to view all of the roles.

const roleView = async () => {
    console.log(chalk.yellow("****||View Role||****"));
  try {
    let query = `SELECT department.department_name, department.id, role.title, role.id, role.salary
    FROM department
    LEFT JOIN role
    ON department.id = role.department_id
    WHERE role.id IS NOT NULL`;
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  } catch (err) {
    console.log(chalk.bgRed(err));
    start();
  }
};

// Selection to add a new employee.

const employeeAdd = async () => {
  try {
    console.log(chalk.yellow("****||Add an Employee||****"));

    let roles = await connection.query("SELECT * FROM role");

    let managers = await connection.query("SELECT * FROM employee");

    let question = await inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the first name of this Employee?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name of this Employee?",
      },
      {
        name: "employeeRoleId",
        type: "list",
        choices: roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        }),
        message: "What is this Employee's role id?",
      },
      {
        name: "employeeManagerId",
        type: "list",
        choices: managers.map((manager) => {
          return {
            name: manager.first_name + " " + manager.last_name,
            value: manager.id,
          };
        }),
        message: "What is this Employee's Manager's Id?",
      },
    ]);

    let output = await connection.query("INSERT INTO employee SET ?", {
      first_name: question.firstName,
      last_name: question.lastName,
      role_id: question.employeeRoleId,
      manager_id: question.employeeManagerId,
    });

    console.log(chalk.greenBright(`${question.firstName} ${question.lastName} added successfully.\n`));
    start();
  } catch (err) {
    console.log(chalk.bgRed(err));
    start();
  }
};

// Selection to add a new department.

const departmentAdd = async () => {
  try {
    console.log(chalk.yellow("****||Add a Department||****"));

    let question = await inquirer.prompt([
      {
        name: "deptName",
        type: "input",
        message: "What is the name of your new department?",
      },
    ]);

    let output = await connection.query("INSERT INTO department SET ?", {
      department_name: question.deptName,
    });

    console.log(chalk.greenBright(`${question.deptName} added successfully to departments.\n`));
    start();
  } catch (err) {
    console.log(chalk.bgRed(err));
    start();
  }
};

// Selection to add a new role.

const roleAdd = async () => {
  try {
    console.log(chalk.yellow("****||Add a Role||****"));

    let departments = await connection.query("SELECT * FROM department");

    let question = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What is the name of your new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What salary will this role provide?",
      },
      {
        name: "departmentId",
        type: "list",
        choices: departments.map((departmentId) => {
          return {
            name: departmentId.department_name,
            value: departmentId.id,
          };
        }),
        message: "What department ID is this role associated with?",
      },
    ]);

    let chosenDepartment;
    for (i = 0; i < departments.length; i++) {
      if (departments[i].department_id === question.choice) {
        chosenDepartment = departments[i];
      }
    }
    let output = await connection.query("INSERT INTO role SET ?", {
      title: question.title,
      salary: question.salary,
      department_id: question.departmentId,
    });

    console.log(chalk.greenBright(`${question.title} role added successfully.\n`));
    start();
  } catch (err) {
    console.log(chalk.bgRed(err));
    start();
  }
};

// Selection to update a roll for a specific employee.

const employeeUpdate = async () => {
  try {
    console.log(chalk.yellow("****||Update an Employee||****"));;

    let employees = await connection.query("SELECT * FROM employee");

    let employeeSelection = await inquirer.prompt([
      {
        name: "employee",
        type: "list",
        choices: employees.map((employeeName) => {
          return {
            name: employeeName.first_name + " " + employeeName.last_name,
            value: employeeName.id,
          };
        }),
        message: "Please choose an employee to update.",
      },
    ]);

    let roles = await connection.query("SELECT * FROM role");

    let roleSelection = await inquirer.prompt([
      {
        name: "role",
        type: "list",
        choices: roles.map((roleName) => {
          return {
            name: roleName.title,
            value: roleName.id,
          };
        }),
        message: "Please select the role to update the employee with.",
      },
    ]);

    let output = await connection.query("UPDATE employee SET ? WHERE ?", [
      { role_id: roleSelection.role },
      { id: employeeSelection.employee },
    ]);

    console.log(chalk.greenBright(`The role was successfully updated.\n`));
    start();
  } catch (err) {
    console.log(chalk.bgRed(err));
    start();
  }
};
