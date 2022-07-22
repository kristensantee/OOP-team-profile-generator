const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const generateHTML = require('./util/generateHtml');
const team = [];


const addManager = () => {
    inquirer.prompt([
        {
        name: "name",
        message: "What is the team manager's name?",
        type: "input",
        },
        {
        name: "id",
        message: "What is the team manager's ID?",
        type: "number",
        },
        {
        name: "email",
        message: "What is the team manager's email?",
        type: "input",
        },
        {
        name: "office",
        message: "What is the team manager's office number?",
        type: "number"
        },
        {
        name: "teamName",
        message: "What is the name of your team?",
        type: "input"
        },

    ]).then(ans=> {
        let manager = new Manager(ans.name, ans.id, ans.email, ans.office);
        teamName = ans.teamName;
        team.push(manager);
        begin();
    })
}

const begin = ()=>{
    inquirer
    .prompt([
        {
            type: "list",
            name: "role",
            message: "What kind of role would you like to add?",
            choices: ["Engineer", "Intern", "Finish Team"]
        },
    ]).then((ans) => {
        if(ans.role==="Engineer"){
            addEngineer();
        } else if (ans.role==="Intern"){
            addIntern();
        } else {
            publish();
        }
    })
}

const addEngineer = ()=>{
    inquirer.prompt([
        {
            name: "name",
            message: "What is the engineer's name?",
            type: "input",
            },
            {
            name: "id",
            message: "What is the engineer's ID?",
            type: "number",
            },
            {
            name: "email",
            message: "What is the engineer's email?",
            type: "input",
            },
            {
            name: "github",
            message: "What is the engineer's GitHub username?",
            type: "input"
            }
    ]).then(ans=> {
        let engineer = new Engineer(ans.name, ans.id, ans.email, ans.github);
        team.push(engineer);
        begin();
    })
}
const addIntern = ()=>{
    inquirer.prompt([
        {
            name: "name",
            message: "What is the intern's name?",
            type: "input",
            },
            {
            name: "id",
            message: "What is the intern's ID?",
            type: "number",
            },
            {
            name: "email",
            message: "What is the intern's email?",
            type: "input",
            },
            {
            name: "school",
            message: "What is the intern's school?",
            type: "input"
            }
    ]).then(ans=> {
        let intern = new Intern(ans.name, ans.id, ans.email, ans.school);
        team.push(intern);
        begin();
    })
}

const publish = () => {
    fs.writeFile(`./dist/${teamName}.html`, generateHTML(team), (err) => {
        if (err) {
            throw err
        }
    }
)}
addManager()