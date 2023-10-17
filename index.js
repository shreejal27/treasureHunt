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
            row.id = "row" + (i + 1);
            // Generate a random ID (0, 1, 2, or 3)
            var randomNum = Math.floor(Math.random() * 4);
            for (let j = 0; j < 4; j++) {
                var col = document.createElement("div");
                col.className = "col";

                var treasure = (j === randomNum) ? "0" : "1";

                var img = document.createElement("img");
                if (treasure != 0) {
                    img.src = "/images/egg.png";
                    img.alt = "";
                }
                else {
                    img.src = "/images/skull.png";
                    img.alt = "";
                }
                img.style.height = "100%";
                col.appendChild(img);
                row.appendChild(col);
            }
            gameBoard.appendChild(row);
        }
        checkActiveRow();
    }
    if (difficultyLevel == "medium") {
        for (let i = 0; i < 9; i++) {
            var row = document.createElement("div");
            row.className = "row";
            row.id = "row" + (i + 1);
            // Generate a random ID (0, 1, or 2)
            var randomNum = Math.floor(Math.random() * 3);

            for (let j = 0; j < 3; j++) {
                var col = document.createElement("div");
                col.className = "col";
                // Set the ID for the current column
                var treasure = (j === randomNum) ? "0" : "1";

                var img = document.createElement("img");
                if (treasure != 0) {
                    img.src = "/images/egg.png";
                    img.alt = "";
                }
                else {
                    img.src = "/images/skull.png";
                    img.alt = "";
                }
                img.style.height = "100%";
                col.appendChild(img);
                row.appendChild(col);
            }
            gameBoard.appendChild(row);
        }
        checkActiveRow();
    }
    if (difficultyLevel == "hard") {
        for (let i = 0; i < 9; i++) {
            var row = document.createElement("div");
            row.className = "row";
            row.id = "row" + (i + 1);
            // Generate a random ID (0 or 1)
            var randomNum = Math.floor(Math.random() * 2);

            for (let j = 0; j < 2; j++) {
                var col = document.createElement("div");
                col.className = "col";

                // Set the ID for the current column
                var treasure = (j === randomNum) ? "0" : "1";

                var img = document.createElement("img");
                if (treasure != 0) {
                    img.src = "/images/egg.png";
                    img.alt = "";
                }
                else {
                    img.src = "/images/skull.png";
                    img.alt = "";
                }
                img.style.height = "100%";
                col.appendChild(img);
                row.appendChild(col);
            }
            gameBoard.appendChild(row);
        }
    }
    checkActiveRow();
}
function clearGameBoard() {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
}

function checkActiveRow() {
    var startRow = "row9";
    var activeRow = document.getElementById(startRow);

    if (activeRow) {
        var colDivs = activeRow.getElementsByClassName("col");

        for (var i = 0; i < colDivs.length; i++) {
            colDivs[i].classList.add("active");
        }
    }
}