var gameBoard = document.getElementById("game-board");
var selectElement = document.getElementById("difficulty");

// Function to check if the viewport is in a mobile width range
function isMobileView() {
    return window.innerWidth <= 500; // Change the threshold width as needed
}

// Check if the wallet amount is saved in local storage
if (localStorage.getItem("walletAmount")) {
    var walletAmount = parseInt(localStorage.getItem("walletAmount"));
    if (walletAmount < 100) {
        walletAmount += 100;
    }
    document.getElementById("amount").innerText = walletAmount;
}

//get difficulty level
selectElement.addEventListener("change", function () {
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var selectedValue = selectedOption.value;

    var amount = parseInt(document.getElementById("amount").innerText);
    var betAmount = parseInt(document.getElementById("betAmount").value);

    if (betAmount > amount || betAmount < 1) {
        alert("Please change your Bet Amount");
        // go to index page
        // Select the '-' option
        document.getElementById("difficulty").value = "-";
        gameDifficulty("-");
    } else {
        // Enable the betAmount input when a difficulty level is selected
        document.getElementById("betAmount").disabled = false;
        document.getElementById("difficulty").disabled = false;
        document.getElementById("half").onclick = halfBet;
        document.getElementById("double").onclick = doubleBet;
        gameDifficulty(selectedValue);
    }
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
                    img.src = "images/egg.png";
                    img.alt = "";
                }
                else {
                    img.src = "images/skull.png";
                    img.alt = "";
                }
                img.style.height = "100%";
                col.appendChild(img);
                row.appendChild(col);
            }
            gameBoard.appendChild(row);
        }
        // Check if it's a mobile view and perform scrolling to the bottom
        if (isMobileView()) {
            // console.log("this is from mobile easy mode"); 
            var height = document.body.scrollHeight;
            window.scrollTo({
                top: height,
                behavior: 'smooth'
            });
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
                    img.src = "images/egg.png";
                    img.alt = "";
                }
                else {
                    img.src = "images/skull.png";
                    img.alt = "";
                }
                img.style.height = "100%";
                col.appendChild(img);
                row.appendChild(col);
            }
            gameBoard.appendChild(row);
        }
        // Check if it's a mobile view and perform scrolling to the bottom
        if (isMobileView()) {
            var height = document.body.scrollHeight;
            window.scrollTo({
                top: height,
                behavior: 'smooth'
            });
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
                    img.src = "images/egg.png";
                    img.alt = "";
                }
                else {
                    img.src = "images/skull.png";
                    img.alt = "";
                }
                img.style.height = "100%";
                col.appendChild(img);
                row.appendChild(col);
            }
            gameBoard.appendChild(row);
        }
    }
    // Check if it's a mobile view and perform scrolling to the bottom
    if (isMobileView()) {
        var height = document.body.scrollHeight;
        window.scrollTo({
            top: height,
            behavior: 'smooth'
        });
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
    if (nextRow === "row0") {
        alert("You have won the game !!!");
        cashout();
    }
}
function handleColumnClick() {
    // Check if the clicked column has the "active" class
    if (this.classList.contains("active")) {
        //check the bet amount after the user clicks on a col
        var betAmount = parseInt(document.getElementById("betAmount").value);
        var amount = parseInt(document.getElementById("amount").innerText);

        if (betAmount > amount || betAmount < 1) {
            alert("Change Bet Amount Or Load Your Wallet");
            return; // Prevent further execution of the function
        }
        var clickedColId = this.id;
        // var colNumber = clickedColId.substr(3, 1);
        var colImage = this.querySelector("img");
        var imageName = getFileNameFromImagePath(colImage.src);

        if (imageName !== "skull.png") {
            // console.log(colNumber, imageName);

            // Reveal the image by changing its opacity
            colImage.style.opacity = 1;

            var eggClickAudio = new Audio('audio/eggClick.mp3');
            eggClickAudio.play();

            // Disable the betAmount input after a column is clicked
            document.getElementById("betAmount").disabled = true;
            document.getElementById("difficulty").disabled = true;
            document.getElementById("half").onclick = null;
            document.getElementById("double").onclick = null;
            document.getElementById("half").style.cursor = "default";
            document.getElementById("double").style.cursor = "default";

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
            var multiplierWithRow = 10 - rowNumber;

            //pass the difficulty level
            var difficulty = document.getElementById("difficulty");
            multiplier(multiplierWithRow, difficulty);
            rowNumber--;
            checkActiveRow("row" + rowNumber);
        }
        else {
            colImage.style.opacity = 1;
            var gameOverAudio = new Audio('audio/gameover.mp3');
            gameOverAudio.play();
            // Delay the execution of the gameOver function for 3 seconds (3000 milliseconds)
            setTimeout(gameOver, 500);
        }
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

    // Enable the betAmount input
    document.getElementById("betAmount").disabled = false;
    document.getElementById("difficulty").disabled = false;
    document.getElementById("half").onclick = halfBet;
    document.getElementById("double").onclick = doubleBet;
    document.getElementById("half").style.cursor = "pointer";
    document.getElementById("double").style.cursor = "pointer";

    //deduct the bet amount from wallet and reset profit values
    var amount = parseInt(document.getElementById("amount").innerText);
    var betAmount = parseInt(document.getElementById("betAmount").value);
    amount = amount - betAmount;

    document.getElementById("amount").innerText = amount;
    document.getElementById("profit").value = 0;
    document.getElementById("multiplier").innerText = 0;

    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var selectedValue = selectedOption.value;
    gameDifficulty(selectedValue);
    alert("Game Over !");

    //check bet amount after game over
    // var amount = parseInt(document.getElementById("amount").innerText);
    // var betAmount = parseInt(document.getElementById("betAmount").value);

    // if (betAmount > amount || betAmount < 1) {
    //     alert("Game Over !");
    //     alert("Load Your Wallet Or Change Bet Amount");
    //     document.getElementById("difficulty").value = "-";
    //     gameDifficulty("-");
    // } else {
    //to reset the game
    //     var selectedOption = selectElement.options[selectElement.selectedIndex];
    //     var selectedValue = selectedOption.value;
    //     gameDifficulty(selectedValue);
    //     alert("Game Over !");
    // }

}


function cashout() {
    var walletAmountElement = document.getElementById("amount");
    var profit = parseInt(document.getElementById("profit").value);
    var amount = parseInt(walletAmountElement.innerText);

    if (profit > 0) {
        var cashoutAudio = new Audio('audio/cashout.mp3');
        cashoutAudio.play();

        var increment = Math.ceil(profit / 100); // Change the increment as needed
        var currentBalance = amount;
        var finalBalance = amount + profit;
        var interval = 15; // The interval duration between increments in milliseconds

        document.getElementById("betAmount").disabled = false;
        document.getElementById("difficulty").disabled = false;
        document.getElementById("half").onclick = halfBet;
        document.getElementById("double").onclick = doubleBet;
        document.getElementById("half").style.cursor = "pointer";
        document.getElementById("double").style.cursor = "pointer";

        var updateWallet = setInterval(function () {
            currentBalance += increment;
            walletAmountElement.innerText = currentBalance;

            if (currentBalance >= finalBalance) {
                clearInterval(updateWallet);
                document.getElementById("profit").value = 0;
                document.getElementById("multiplier").innerText = 0;
                var selectedOption = selectElement.options[selectElement.selectedIndex];
                var selectedValue = selectedOption.value;
                gameDifficulty(selectedValue);
            }
        }, interval);
    } else {
        var errorAudio = new Audio('audio/error.mp3');
        errorAudio.play();
        setTimeout(() => {
            alert("You can't cashout at 0 profit!");
        }, 100);

    }
}

function multiplier(multiplierWithRow, difficulty) {

    //get the user's bet difficulty level
    var difficultyOption = difficulty.options[difficulty.selectedIndex];
    var difficultyLevel = difficultyOption.value;

    var multiplierSign = document.getElementById("multiplier");

    if (difficultyLevel == "easy") {
        var profitMultiplier = 1 + (0.5 * multiplierWithRow);
    }
    else if (difficultyLevel == "medium") {
        var profitMultiplier = 2 + (1 * multiplierWithRow);
    }
    else if (difficultyLevel == "hard") {
        var profitMultiplier = 3 + (2 * multiplierWithRow);
    }
    multiplierSign.innerText = profitMultiplier;

    var betAmount = parseInt(document.getElementById("betAmount").value);

    var totalProfit = (betAmount * profitMultiplier) - betAmount;
    var profitSign = document.getElementById("profit");

    profitSign.value = totalProfit;
}

function halfBet() {
    var betAmount = parseInt(document.getElementById("betAmount").value);
    if (betAmount > 0) {
        var coinAudio = new Audio('audio/coin.mp3');
        coinAudio.play();
        document.getElementById("betAmount").value = parseInt(betAmount / 2);
    }
}

function doubleBet() {
    var betAmount = parseInt(document.getElementById("betAmount").value);
    if (betAmount > 0) {
        var coinAudio = new Audio('audio/coin.mp3');
        coinAudio.play();
        document.getElementById("betAmount").value = betAmount * 2;
    }
}

function save() {
    var saveAudio = new Audio('audio/save.mp3');
    saveAudio.play();

    var walletAmount = document.getElementById("amount").innerText;
    localStorage.setItem("walletAmount", walletAmount);

    setTimeout(() => {
        alert("Wallet Amount Is Saved");
    }, 100);

    if (walletAmount < 100) {
        alert("We have gifted you $100");
    }
    setTimeout(() => {
        location.reload();
    }, 2000);
};

