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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
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


const getEmployees = () => {
    console.log("Please build your team")
    inquirer.prompt(questions)
        .then(({
            name,
            role,
            id,
            email
        }) => {
            console.log(name, role, id, email)
            let roleType;

            if (role === "Engineer") {
                roleType = "Github username."
            } else if (role === "Intern") {
                roleType = "school name."
            } else if (role === "Manager") {
                roleType = "office number."
            }

            inquirer.prompt([{
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
                console.log(roleType, addEmployee);
                
                if (role === "Manager") {
                    addManager(name, id, email, roleType);
                    console.log(employees);
                } else if (role === "Engineer") {
                    addEngineer(name, id, email, roleType)
                } else {
                    addIntern(name, id, email, roleType)
                }
                
                if (addEmployee === "Yes") {
                    getEmployees();
                } else {
                    return false;
                }
               
            })
        })
}

getEmployees();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
render(employees);

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// {
//     type: "input",
//     message: "Enter the Manager's name.",
//     name: "name"
// }