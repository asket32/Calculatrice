const buttons = document.querySelectorAll("button");
const inputField = document.getElementById("resultat");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();
        handleInput(value);
    });
});


function handleInput(value) {

    if (value === "AC") {
        allClear();
    } 
    else if (value === "C") {
        deleteLast();
    } 
    else if (value === "=") {
        calculateResult();
    } 
    else {
        appendValue(value);
    }
}

function allClear() {
    inputField.value = "";
}

function deleteLast() {
    inputField.value = inputField.value.slice(0, -1);
}

function appendValue(value) {
    const operators = ["+", "-", "*", "/"];
    const lastChar = inputField.value.slice(-1);

    if (operators.includes(value) && operators.includes(lastChar)) {
        return;
    }

    inputField.value += value;
}

function calculateResult() {
    try {
        if (inputField.value === "") return;

        let expression = inputField.value
            .replace(/×/g, "*")
            .replace(/÷/g, "/");

        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            throw new Error("Expression invalide");
        }

        inputField.value = new Function("return " + expression)();
    } 
    catch (error) {
        inputField.value = "Erreur";
        setTimeout(() => {
            inputField.value = "";
        }, 1500);
    }
}
