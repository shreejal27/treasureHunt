var wallet = document.getElementById("totalAmount").innerText;
var amount = parseInt(wallet.substring(1, wallet.length));
var betAmount = parseInt(document.getElementById("betAmount").value);
var profit = parseInt(document.getElementById("profit").value);

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
                col.id = "col" + (j + 1);
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
        checkActiveRow("row9");
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
                col.id = "col" + (j + 1);
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
        checkActiveRow("row9");
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
                col.id = "col" + (j + 1);
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
    checkActiveRow("row9");
}
function clearGameBoard() {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
}

function checkActiveRow(nextRow) {
    var activeRow = document.getElementById(nextRow);

    if (activeRow) {
        var colDivs = activeRow.getElementsByClassName("col");

        for (var i = 0; i < colDivs.length; i++) {
            colDivs[i].classList.add("active");

            // Add a click event listener to the columns with the class "active"
            if (colDivs[i].classList.contains("active")) {
                // Remove any existing click event listener
                colDivs[i].removeEventListener("click", handleColumnClick);

                // Add a new click event listener
                colDivs[i].addEventListener("click", handleColumnClick);
            }
        }
    }
}
function handleColumnClick() {
    var clickedColId = this.id;
    var colNumber = clickedColId.substr(3, 1);
    var colImage = this.querySelector("img");
    var imageName = getFileNameFromImagePath(colImage.src);

    if (imageName !== "skull.png") {
        console.log(colNumber, imageName);
        var currentRow = this.parentElement; // Get the parent element, which is the row
        var currentRowId = currentRow.id;

        //to remove the activeRow from current row to move to next row
        var activeRow = document.getElementById(currentRowId);
        if (activeRow) {
            var colDivs = activeRow.getElementsByClassName("col");
            for (var i = 0; i < colDivs.length; i++) {
                colDivs[i].classList.remove("active");
            }
        }
        var rowNumber = currentRowId.substr(3, 1);
        rowNumber--;
        checkActiveRow("row" + rowNumber);
    }
    else {
        gameOver();
    }
}

function getFileNameFromImagePath(imagePath) {
    // Split the path by "/" to get the filename
    var pathParts = imagePath.split("/");
    var fileName = pathParts[pathParts.length - 1];
    return fileName;
}

function gameOver() {
    const activeColumns = document.querySelectorAll('.col.active');

    // Remove the "active" class from each element
    activeColumns.forEach(col => {
        col.classList.remove('active');
    });
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var selectedValue = selectedOption.value;
    gameDifficulty(selectedValue);
    alert("Game Over !");
}

function cashout() {
    amount = amount + profit;
    alert("CashOut" + betAmount + profit + wallet + " " + amount);
    document.getElementById("totalAmount").innerText = '$' + amount;
}