const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let taskList = [];

// function to add a task to the list of tasks
function addTask(task){
    console.log("adding task...");
   setTimeout(() => {
    taskList.push(task);
    console.log('Task added:', task);
   },2000);
   setTimeout(() => {
    askForAction();
     },2500)
}
 // handling adding a new task  
 const askForNewTask = () => {
    rl.question("Do you want to add a task? (yes/no): ", (answer) => {
        if(answer.toLowerCase() === "yes"){
            rl.question("Enter task: ", (task) => {
                if(task){
                    addTask(task.trim());
                } else{
                    console.log("Task cannot be empty");
                    askForNewTask();
                }
            })
        } else if(answer.toLowerCase() === "no"){
            askForAction();
        } else {
            console.log("Invalid input. Please enter 'yes' or 'no'");
            askForNewTask();
        }
    });
}

//function to view a task
function viewTask(){
    console.log("viewing tasks...");
    setTimeout(() => {
     if(taskList.length !== 0){
        console.log(JSON.stringify(taskList));
     } else {
        console.log('No tasks to show');
     }
    },1000)
    setTimeout(() => {
        askForAction();
    },1500)
    }

   // handling viewing a task  
    const askToViewAgain = () => {
        rl.question("Do you want to view tasks? (yes/no): ", (answer) => {
            if(answer.toLowerCase() === "yes"){
                viewTask();
            } else if(answer.toLowerCase() === "no"){
                askForAction();
            } else {
                console.log("Invalid input. Please enter 'yes' or 'no'");
                askToViewAgain();
            }
        });
    }

    //asking which action to perform 
    function askForAction(){
       rl.question("What would you like to do next? (add/view/exit): ", (answer) => {
            if(answer.toLowerCase() === "add"){
                askForNewTask();
            } else if(answer.toLowerCase() === "view"){
                askToViewAgain();
            } else if(answer.toLowerCase() === "exit"){
                console.log("Exiting...");
                setTimeout(() => {
                    rl.close();
                },500)
            } else {
                console.log("Invalid input. Please enter 'add', 'view', or 'exit'");
                askForAction();
            }
        });
    }
    //asking the initial question
   askForAction();