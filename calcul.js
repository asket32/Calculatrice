const buttons = document.querySelectorAll("button");
const inputField = document.getElementById("resultat");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();
        handleInput(value);
    });
});

// Gestion principale
function handleInput(value) {
    if (value === "C") {
        clearResult();
    } 
    else if (value === "DEL") {
        deleteLast();
    } 
    else if (value === "=") {
        calculateResult();
    } 
    else {
        appendValue(value);
    }
}

// Effacer tout
function clearResult() {
    inputField.value = "";
}

// Supprimer dernier caractère
function deleteLast() {
    inputField.value = inputField.value.slice(0, -1);
}

// Ajouter valeur (avec protection opérateurs)
function appendValue(value) {
    const operators = ["+", "-", "*", "/"];
    const lastChar = inputField.value.slice(-1);

    // Empêche deux opérateurs consécutifs
    if (operators.includes(value) && operators.includes(lastChar)) {
        return;
    }

    inputField.value += value;
}

// Calcul sécurisé
function calculateResult() {
    try {
        if (inputField.value === "") return;

        // Remplace ÷ et × si tu les utilises en bouton
        let expression = inputField.value
            .replace(/×/g, "*")
            .replace(/÷/g, "/");

        // Validation simple (autorise seulement chiffres et opérateurs)
        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            throw new Error("Expression invalide");
        }

        inputField.value = new Function("return " + expression)();
    } catch (error) {
        inputField.value = "Erreur";
        setTimeout(() => {
            inputField.value = "";
        }, 1500);
    }
}
