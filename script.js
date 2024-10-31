//!!! will add this back in later after writing the gameplay loop
// const playGameBtn = document.getElementById('play-game-btn');

// //add an event listener that check if the play button is clicked
// playGameBtn.addEventListener('click', startGame())

// function startGame(){
//     //first call helper method to hide the play button

// }

//GENERAL VARIABLES
const choices = ['R', 'P', 'S']
let gamesPlayed = 0; //used to calculate win rate 
let ties = 0;

//PLAYER-SPECIFIC VARIABLES
let wins = 0;
let losses = 0;


//COMP-SPECIFIC VARIABLES
let compWins = 0;
let compLosses = 0;

do{
    console.log("PLAYER STATS: Wins = " + wins + ". Losses = " + losses + ". Ties = " + ties + ". Games Played = " + gamesPlayed);
    console.log("COMP STATS: Wins = " + compWins + ". Losses = " + compLosses + ". Ties = " + ties + ". Games Played = " + gamesPlayed);

    let move = getMoveNoCancel();
    console.log("the funtion getMoveNoCancel() has returned with a value of " + move);
    
    let compMove = getCompMove();
    console.log("the funtion getCompMove() has returned with a value of " + compMove);
    
    alert(announceCompMove(compMove));
    console.log("Ensuring compMove value did not change: " + compMove);
    
    alert(compareMoves(move, compMove));

    //increment the games played
    gamesPlayed++;

    //game is over. Ask user if they want to play again
}while(confirm("Would you like to play again?"));

//after the game is over
alert(getGameStats())
console.log("PLAYER STATS: Wins = " + wins + ". Losses = " + losses + ". Ties = " + ties + ". Games Played = " + gamesPlayed);
console.log("COMP STATS: Wins = " + compWins + ". Losses = " + compLosses + ". Ties = " + ties + ". Games Played = " + gamesPlayed);


//FUNCTIONS


/*TODO: create a version that asks the user if they want to quit if the click cancel. */
//Function that gets and validates user input. Returns validated input.
function getMoveNoCancel(){
    console.log("entering the getMoveNoCancel() function.");
    let isValid = false;
    
    do{
        let move = prompt("Please make a move by typing 'R' 'P' 'S' :");

        console.log("move = " + move);

        //check the validity of move 
        //to be valid, the move can't be null and must be included in the choices array.
        if(move != null){
            //convert move to uppercase and remove any additional whitespace
            move = move.toUpperCase().trim();

            console.log("testing to see if toUpper and trim worked. move = " + move);

            if(choices.includes(move)){
                console.log(`The player's move: ${move} is in the choices array.`);
                isValid = true;
                return move;
            }  
            else{
                //show a different alert message if the invalid move is an empty string
                if(move == ""){
                    alert("Error: invalid move. Please try again.");
                }
                else{
                    alert(`Error: ${move} is NOT a valid move. Please try again.`)
                }
                
                isValid = false;
            }         
        }
        else{
            alert("Error: null is not a valid move. Please try again");
            isValid = false;
        }
    }while(!isValid); //continue asking player for a move while their move is not valid.
}

//function generates a random index and returns an item in the choices array at that random index
function getCompMove(){
    let randIndex = Math.floor(Math.random() * choices.length);
    return choices[randIndex];
}

//function announces what computer chose in terms of "Rock" "Paper" or "Scissors".
//this does not do anything to alter the computer's move.
function announceCompMove(compMove){
    let message;
    //check and translate compMove
    if(compMove === 'R'){
        message = "The computer chose R (Rock).";
    }
    else if(compMove === 'P'){
        message = "The computer chose P (Paper).";
    }
    else if(compMove === 'S'){
        message = "The computer chose S (Scissors).";
    }

    return message;
}

/*this function determines the game outcome based on the rules of rock paper scissors. Returns an outcome message and 
increments wins, losses, or ties accordingly.*/

function compareMoves(move, compMove){
    let outcomeMessage;
    
    //wins
    if((move === 'R' && compMove === 'S') || (move === 'P' && compMove === 'R') || (move === 'S' && compMove === 'P')){
        //increment wins
         wins++;

         //increment compLosses
         compLosses++;

         return outcomeMessage = `${getOutcomeMessage(move, compMove)} You win!`;
    }
    //losses
    else if((move === 'S' && compMove === 'R') || (move === 'R' && compMove === 'P') || (move === 'P' && compMove === 'S')){
        //increment losses
        losses++;

        //increment comp wins
        compWins++;

        return outcomeMessage = `${getOutcomeMessage(move, compMove)} You lose!`;
    }
    //ties
    else if(move === compMove){
        //increment ties
        ties++;
        return outcomeMessage = `${move} can't beat ${compMove}. It's a tie!`;
    }
}

//helper function that generates more descriptive messages describing the outcome of the player's and the computer's choice.
function getOutcomeMessage(move, compMove){
    let outcomeMessage;
    console.log("INSIDE getOutcomeMessage FUNCTION!");

    if((move === 'R' && compMove === 'S') || (move === 'S' && compMove === 'R')){
        return outcomeMessage = "Rock crushes scissors.";
    }
    else if((move === 'P' && compMove === 'R') || (move === 'R' && compMove === 'P')){
        return outcomeMessage = "Paper covers rock.";
    }
    else if((move === 'S' && compMove === 'P') || (move === 'P' && compMove === 'S')){
        return outcomeMessage = "Scissors cut paper.";
    }
}


/*function calculates win rates for both the player and the computer and returns these along with the total 
    number of player wins, losses, and the number of ties*/
function getGameStats(){

    //this should never happen in this version of the game, but I want to add this to avoid the possibility of dividing by 0
    if(gamesPlayed === 0){
        return 0;
    }
    //proceed if the number of games player is not 0
    let playerWinRate = ((wins/gamesPlayed) * 100).toFixed(2);
    let compWinRate = ((compWins/gamesPlayed) * 100).toFixed(2);

    return `Games Played: ${gamesPlayed} \n
        Wins: ${wins}  \n
        Losses: ${losses} \n
        Ties: ${ties} \n
        player win rate: ${playerWinRate}% \n
        computer win rate: ${compWinRate}%.`;
    
}