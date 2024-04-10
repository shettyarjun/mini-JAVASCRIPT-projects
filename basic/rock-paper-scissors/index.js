const playechoice = document.querySelector('#player');
const computerchoice = document.querySelector('#computer');
const resultbutton = document.querySelector('#result');

// const rock= document.querySelector('#rock');
// const paper= document.querySelector('#paper');
// const scissors= document.querySelector('#scissors');
const choices = document.querySelectorAll('.choice');

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        let player = choice.id;
        //player=choice.TextContent;
        let computer = computerchoose();
        computerchoice.textContent = `computer: ${computer}`;
        playechoice.textContent = `player: ${player}`;
        let result = checkwinner(player, computer);
        resultbutton.textContent = `result: ${result}`;

        
console.log(player);
console.log(computer);

    });

    function computerchoose() {
        const random = Math.floor(Math.random() * 3) + 1;
        if (random === 1) {
            return 'rock';
        } else if (random === 2) {
            return 'paper';
        } else {
            return 'scissors';
        }
    }

    function checkwinner(player, computer) {
        if (player == computer) {
            return 'draw';
        } else if ((player == 'rock' && computer == 'scissors') ||
                   (player == 'paper' && computer == 'rock') ||
                   (player == 'scissors' && computer == 'paper')) {
            return 'player wins';
        } else {
            return 'computer wins';
        }
    }
});
