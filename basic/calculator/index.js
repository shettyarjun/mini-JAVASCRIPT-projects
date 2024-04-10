const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".operator-btn , .number");
const clear = document.querySelector("#clear");
const equal = document.querySelector("#calculate");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        calculation(button.textContent);
    });
}
);

clear.addEventListener("click", cleardisplay);
equal.addEventListener("click", calculate);

function calculation(input){
    display.value += input;
}

function cleardisplay(){
    display.value = "";
}

function calculate(){
    try{
        display.value = eval(display.value);

if(display.value >= Infinity || display.value < -Infinity){
             display.value = "♾️";
}
    }
    catch(error){
        display.value = "Error ❌";
    }
}