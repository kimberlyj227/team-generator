const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
var employee;
const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// questions to ask
const questions = [{
        type: "input",
        message: "Enter employee's name.",
        name: "name"
    },
    {
        type: "list",
        message: "Enter team member's role.",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role"
    },
    {
        type: "input",
        message: "Enter email address.",
        name: "email"
    },
    {
        type: "input",
        message: "Enter employee id.",
        name: "id"
    }
]
// add employees based on role type
const addManager = (name, id, email, officeNumber) => {
    employee = new Manager(name, id, email, officeNumber);
    employees.push(employee)
};
const addEngineer = (name, id, email, github) => {
    employee = new Engineer(name, id, email, github);
    employees.push(employee)
};
const addIntern = (name, id, email, school) => {
    employee = new Intern(name, id, email, school);
    employees.push(employee)
};

//function to ask questions and write file
const getEmployees = () => {

    inquirer.prompt(questions)
        .then(({
            name,
            role,
            id,
            email
        }) => {

            let roleType;
            // asks questions specific to employee type
            if (role === "Engineer") {
                roleType = "Github username."
            } else if (role === "Intern") {
                roleType = "school name."
            } else if (role === "Manager") {
                roleType = "office number."
            }

            inquirer.prompt([
                    {
                        type: "input",
                        message: `Enter employee's ${roleType}`,
                        name: "roleType"
                    },
                    {
                        type: "list",
                        message: "Would you like to add another employee?",
                        choices: ["Yes", "No"],
                        name: "addEmployee"
                    }

                ])
                .then(({
                    roleType,
                    addEmployee
                }) => {
                    // builds new employees based on role type
                    if (role === "Manager") {
                        addManager(name, id, email, roleType);
                    } else if (role === "Engineer") {
                        addEngineer(name, id, email, roleType)
                    } else {
                        addIntern(name, id, email, roleType)
                    }
                    // adds more employees or writes file
                    if (addEmployee === "Yes") {
                        getEmployees();
                    } else {
                        fs.writeFile(outputPath, render(employees), err => {
                            if (err) throw err
                            console.log("Team members written successfully to output/team.html")
                        })
                    }

                })


        })

}

const init = () => {
    console.log("Let's build your team!");
    getEmployees();
}

init();