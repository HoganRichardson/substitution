var charMap = [
    { key: 'A', value: null },
    { key: 'B', value: null },
    { key: 'C', value: null },
    { key: 'D', value: null },
    { key: 'E', value: null },
    { key: 'F', value: null },
    { key: 'G', value: null },
    { key: 'H', value: null },
    { key: 'I', value: null },
    { key: 'J', value: null },
    { key: 'K', value: null },
    { key: 'L', value: null },
    { key: 'M', value: null },
    { key: 'N', value: null },
    { key: 'O', value: null },
    { key: 'P', value: null },
    { key: 'Q', value: null },
    { key: 'R', value: null },
    { key: 'S', value: null },
    { key: 'T', value: null },
    { key: 'U', value: null },
    { key: 'V', value: null },
    { key: 'W', value: null },
    { key: 'X', value: null },
    { key: 'Y', value: null },
    { key: 'Z', value: null }
]

var inputString = "";

/* Keyboard Shortcuts */
document.onkeyup = function (e) {
    if (!document.getElementById("setupArea").hidden) {
        if (e.code == "Enter") {
            cipherSubmit();
        }
    } else {
        if (document.getElementById("inputArea").hidden && !document.getElementById("setupArea").hidden) {
            var c = e.key.toUpperCase();
            if (c.length == 1 && c >= 'A' && c <= 'Z') {
                if (inputString.includes(c)) {
                    showInput(c);
                }
            }
        } else {
            if (e.code == "Enter") {
                charSubmit();
            }
        }
    }
}

function cipherSubmit() {
    inputString = document.getElementById("cipherInput").value.toUpperCase();

    // Load main page
    loadContent();
}

function loadContent() {
    // Hide setup form
    document.getElementById("setupArea").hidden = true;

    // Build table
    const textDiv = document.getElementById("text");
    const table = document.createElement("table");
    table.id = "mainTable";
    const tblBody = document.createElement("tbody");
    const headRow = document.createElement("tr");
    headRow.id = "headRow";
    const mainRow = document.createElement("tr");
    mainRow.id = "mainRow";
    mainRow.style = "text-align: center";

    textDiv.appendChild(table);
    table.appendChild(tblBody);
    tblBody.appendChild(headRow);
    tblBody.appendChild(mainRow);

    for (let char of inputString) {
        const cellhead = document.createElement("th");
        const cellbody = document.createElement("td");
        const button = document.createElement("input");

        button.type = "button"
        button.value = char;
        button.addEventListener('click', function () {
            showInput(char);
        });

        if (char < 'A' || char > 'Z') {
            button.disabled = true;
        }

        cellhead.appendChild(button);
        headRow.appendChild(cellhead);
        mainRow.appendChild(cellbody);
    }
}

function charSubmit() {
    const cipherchar = document.getElementById("selectedChar").textContent.toUpperCase();
    const plainchar = document.getElementById("textInput").value.toUpperCase();

    if (plainchar == "") {
        charMap[cipherchar] = null;
    } else if (plainchar.length > 1 || plainchar < 'A' || plainchar > 'Z') {
        alert("Invalid nput. Please enter a single character.");
        return;
    } else {
        charMap[cipherchar] = plainchar;
    }

    hideInput();
    refreshView();
}

function showInput(target) {
    document.getElementById("inputArea").hidden = false;

    document.getElementById("selectedChar").textContent = target;
    document.getElementById("textInput").value = "";
    document.getElementById("textInput").focus();
}

function hideInput() {
    document.getElementById("inputArea").hidden = true;
}

function refreshView() {
    const headRow = document.getElementById("headRow");
    const headRowCells = headRow.getElementsByTagName("th");
    const mainRow = document.getElementById("mainRow");
    const mainRowCells = mainRow.getElementsByTagName("td");

    for (let i = 0; i < headRowCells.length; i++) {
        const cipherchar = headRowCells[i].childNodes[0].value;
        if (cipherchar != null) {
            mainRowCells[i].textContent = charMap[cipherchar];
        }
    }

    hideInput();
}