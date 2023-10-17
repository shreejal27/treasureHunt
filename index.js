function message() {
    // alert("Hello");
}
var gameBoard = document.getElementById("game-board");
var selectElement = document.getElementById("difficulty");

//get difficulty level
selectElement.addEventListener("change", function () {
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var selectedValue = selectedOption.value;
    gameDifficulty(selectedValue);
});

function gameDifficulty(difficultyLevel) {
    clearGameBoard();
    if (difficultyLevel == "-") {
        var row = document.createElement("div");
        row.className = "row";
        var messageDiv = document.createElement("div");
        messageDiv.textContent = "Choose A Difficulty Level !";
        messageDiv.id = "message";
        row.appendChild(messageDiv);
        gameBoard.appendChild(row);
    }
    if (difficultyLevel == "easy") {
        for (let i = 0; i < 9; i++) {
            var row = document.createElement("div");
            row.className = "row";

            for (let j = 0; j < 4; j++) {
                var col = document.createElement("div");
                col.className = "col";
                var img = document.createElement("img");
                img.src = "/images/egg.png";
                img.alt = "";
                img.style.height = "100%";
                col.appendChild(img);
                row.appendChild(col);
            }
            gameBoard.appendChild(row);
        }
    }
    if (difficultyLevel == "medium") {
        for (let i = 0; i < 9; i++) {
            var row = document.createElement("div");
            row.className = "row";

            for (let j = 0; j < 3; j++) {
                var col = document.createElement("div");
                col.className = "col";
                var img = document.createElement("img");
                img.src = "/images/egg.png";
                img.alt = "";
                img.style.height = "100%";
                col.appendChild(img);
                row.appendChild(col);
            }
            gameBoard.appendChild(row);
        }
    }
    if (difficultyLevel == "hard") {
        for (let i = 0; i < 9; i++) {
            var row = document.createElement("div");
            row.className = "row";

            for (let j = 0; j < 2; j++) {
                var col = document.createElement("div");
                col.className = "col";
                var img = document.createElement("img");
                img.src = "/images/egg.png";
                img.alt = "";
                img.style.height = "100%";
                col.appendChild(img);
                row.appendChild(col);
            }
            gameBoard.appendChild(row);
        }
    }
}
function clearGameBoard() {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
}