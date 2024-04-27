import inquirer from "inquirer";
import chalk from "chalk";


// Initializing User Balance And Pin Code
let myBalance = 5000;
let myPin = 2707;

// Printing Welcome Message
console.log(chalk.blue("\n \t \t<<<<<<<<<<<<<<<<<<<<Welcome To The Meezan Premier Islamic Bank-ATM Machine>>>>>>>>>>>>>>>>>>>>\n"));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter Your Pin Code:"),
    }
]);
if (pinAnswer.pin === myPin){
    console.log(chalk.green("\n \t LOGIN SUCCESSFULL!\n"));
    console.log(`Your Current Account Balance is ${myBalance}`);
    
    let operationAns = await inquirer.prompt([
        {
            name: "Operation",
            type:"list",
            message: "Please Select An Operation",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ])

    if(operationAns.Operation === "Withdraw Amount"){
        let WithdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select A Withrawal Method",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ])
        if(WithdrawAns.withdrawMethod === "Fast Cash"){
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices:[500, 1000, 2000, 5000, 10000, 20000, 50000]
                }
            ])
            if(fastCashAns.fastCash > myBalance){
                console.log(chalk.redBright("\n \tInsufficient Balance\n"));
            }
            else{
                myBalance -= fastCashAns.fastCash
                console.log(`${fastCashAns.fastCash} Withdraw Succesfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
        else if(WithdrawAns.withdrawMethod === "Enter Amount"){
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter The Amount You Want To Withdraw:",
                }
            ])
            if(amountAns.amount > myBalance){
                console.log("Insufficient Balance");
            }
            else{
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(`You Remaining Balance Is: ${myBalance}`);
            }
        }
        
    }
    else if (operationAns.Operation === "Check Balance"){
        console.log(`Your Current Balance Is: ${myBalance}`);
    }
}
else{
    console.log(chalk.greenBright("\n \tPin Is Incorrect, Try Again\n \t"));
}