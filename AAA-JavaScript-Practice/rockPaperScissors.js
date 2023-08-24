function rockPaperScissors() {
    const choices = ["paper", "rock", "scissors"];
    let userChoice = prompt("rock, paper, or scissors?");
    let compChoice = choices[computerChoice()];
    console.log(userChoice);
    console.log(compChoice);
    
    for (let x of choices) {
        if (userChoice.toLowerCase() === compChoice) {
            console.log(`${userChoice} = ${compChoice} tie`);
        
        }
        else if (userChoice.toLowerCase() > compChoice) {
            console.log(`${ userChoice } < ${ compChoice } you lose!`);
        }
        else {
            console.log(`${ userChoice } > ${ compChoice } you win!`);
        }
    }
}

function computerChoice() {
    let random = Math.floor(Math.random() * 3);
    console.log(random);
    return random;

}