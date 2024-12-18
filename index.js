let express = require("express");
let router = express.Router();

let numberOfDecks = 8;

let cardsSeen = 0;
let cardsleft = numberOfDecks * 52;

let runningCount = 0;
let trueCount = 0;

let history = [];

let startTime = Date.now();

let bankroll = 500;

function getChartObjectRegular() {
    return {
        _8: {
            2: "H",
            3: "H",
            4: "H",
            5: "H",
            6: trueCount >= 2 ? "D" : "H",
            7: "H",
            8: "H",
            9: "H",
            10: "H",
            A: "H",
        },
        _9: {
            2: trueCount >= 1 ? "D" : "H",
            3: "D",
            4: "D",
            5: "D",
            6: "D",
            7: trueCount >= 3 ? "D" : "H",
            8: "H",
            9: "H",
            10: "H",
            A: "H",
        },
        _10: {
            2: "D",
            3: "D",
            4: "D",
            5: "D",
            6: "D",
            7: "D",
            8: "D",
            9: "D",
            10: trueCount >= 4 ? "D" : "H",
            A: trueCount >= 4 ? "D" : "H",
        },
        _11: {
            2: "D",
            3: "D",
            4: "D",
            5: "D",
            6: "D",
            7: "D",
            8: "D",
            9: "D",
            10: "D",
            A: trueCount >= 1 ? "D" : "H",
        },
        _12: {
            2: trueCount >= 3 ? "S" : "H",
            3: trueCount >= 2 ? "S" : "H",
            4: trueCount <= 0 ? "H" : "S",
            5: "S",
            6: "S",
            7: "H",
            8: "H",
            9: "H",
            10: "H",
            A: "H",
        },
        _13: {
            2: trueCount <= -1 ? "H" : "S",
            3: trueCount <= -2 ? "H" : "S",
            4: "S",
            5: "S",
            6: "S",
            7: "H",
            8: "H",
            9: "H",
            10: "H",
            A: "H",
        },
        _14: {
            2: "S",
            3: "S",
            4: "S",
            5: "S",
            6: "S",
            7: "H",
            8: "H",
            9: "H",
            10: "H",
            A: "H",
        },
        _15: {
            2: "S",
            3: "S",
            4: "S",
            5: "S",
            6: "S",
            7: "H",
            8: "H",
            9: "H",
            10: trueCount >= 4 ? "S" : "H",
            A: "H",
        },
        _16: {
            2: "S",
            3: "S",
            4: "S",
            5: "S",
            6: "S",
            7: "H",
            8: "H",
            9: trueCount >= 4 ? "S" : "H",
            10: trueCount >= 0 ? "S" : "H",
            A: trueCount >= 3 ? "S" : "H",
        },
        _17: {
            2: "S",
            3: "S",
            4: "S",
            5: "S",
            6: "S",
            7: "S",
            8: "S",
            9: "S",
            10: "S",
            A: "S",
        },
    };
}

function getChartObjectAces() {
    return {
        A2: {
            2: "H",
            3: "H",
            4: "H",
            5: "D",
            6: "D",
            7: "H",
            8: "H",
            9: "H",
            10: "H",
            A: "H",
        },
        A3: {
            2: "H",
            3: "H",
            4: "H",
            5: "D",
            6: "D",
            7: "H",
            8: "H",
            9: "H",
            10: "H",
            A: "H",
        },
        A4: {
            2: "H",
            3: "H",
            4: trueCount <= 0 ? "H" : "D",
            5: "D",
            6: "D",
            7: "H",
            8: "H",
            9: "H",
            10: "H",
            A: "H",
        },
        A5: {
            2: "H",
            3: "H",
            4: "D",
            5: "D",
            6: "D",
            7: "H",
            8: "H",
            9: "H",
            10: "H",
            A: "H",
        },
        A6: {
            2: trueCount >= 1 ? "D" : "H",
            3: "D",
            4: "D",
            5: "D",
            6: "D",
            7: "H",
            8: "H",
            9: "H",
            10: "H",
            A: "H",
        },
        A7: {
            2: "D",
            3: "D",
            4: "D",
            5: "D",
            6: "D",
            7: "S",
            8: "S",
            9: "H",
            10: "H",
            A: "H",
        },
        A8: {
            2: "S",
            3: trueCount >= 5 ? "D" : "S",
            4: trueCount >= 3 ? "D" : "S",
            5: trueCount >= 1 ? "D" : "S",
            6: trueCount >= 1 ? "D" : "S",
            7: "S",
            8: "S",
            9: "S",
            10: "S",
            A: "S",
        },
        A9: {
            2: "S",
            3: "S",
            4: trueCount >= 6 ? "D" : "S",
            5: trueCount >= 5 ? "D" : "S",
            6: trueCount >= 4 ? "D" : "S",
            7: "S",
            8: "S",
            9: "S",
            10: "S",
            A: "S",
        },
    };
}

function getChartObjectPairs() {
    return {
        _22: {
            2: "Y",
            3: "Y",
            4: "Y",
            5: "Y",
            6: "Y",
            7: "Y",
            8: "N",
            9: "N",
            10: "N",
            A: "N",
        },
        _33: {
            2: "Y",
            3: "Y",
            4: "Y",
            5: "Y",
            6: "Y",
            7: "Y",
            8: "N",
            9: "N",
            10: "N",
            A: "N",
        },
        _44: {
            2: "N",
            3: "N",
            4: "N",
            5: "Y",
            6: "Y",
            7: "N",
            8: "N",
            9: "N",
            10: "N",
            A: "N",
        },
        _55: {
            2: "N",
            3: "N",
            4: "N",
            5: "N",
            6: "N",
            7: "N",
            8: "N",
            9: "N",
            10: "N",
            A: "N",
        },
        _66: {
            2: "Y",
            3: "Y",
            4: "Y",
            5: "Y",
            6: "Y",
            7: "N",
            8: "N",
            9: "N",
            10: "N",
            A: "N",
        },
        _77: {
            2: "Y",
            3: "Y",
            4: "Y",
            5: "Y",
            6: "Y",
            7: "Y",
            8: "N",
            9: "N",
            10: "N",
            A: "N",
        },
        _88: {
            2: "Y",
            3: "Y",
            4: "Y",
            5: "Y",
            6: "Y",
            7: "Y",
            8: "Y",
            9: "Y",
            10: "Y",
            A: "Y",
        },
        _99: {
            2: "Y",
            3: "Y",
            4: "Y",
            5: "Y",
            6: "Y",
            7: trueCount >= 3 ? "Y" : "N",
            8: "Y",
            9: "Y",
            10: "N",
            A: "N",
        },
        TT: {
            2: "N",
            3: "N",
            4: trueCount >= 6 ? "Y" : "N",
            5: trueCount >= 5 ? "Y" : "N",
            6: trueCount >= 4 ? "Y" : "N",
            7: "N",
            8: "N",
            9: "N",
            10: "N",
            A: "N",
        },
        AA: {
            2: "Y",
            3: "Y",
            4: "Y",
            5: "Y",
            6: "Y",
            7: "Y",
            8: "Y",
            9: "Y",
            10: "Y",
            A: "Y",
        },
    };
}

function generateHeaders() {
    let html = `
        <tr>
            <th></th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>A</th>
        <tr>
    `;

    return html;
}

function generateTable() {
    let html = `
        <table id="table" hx-swap-oob="true">
            <tbody>
                ${generateHeaders()}
                ${generateTableRows(getChartObjectRegular())}
                ${generateHeaders()}
                ${generateTableRows(getChartObjectAces())}
                ${generateHeaders()}
                ${generateTableRows(getChartObjectPairs())}
            </tbody>
        </table>
    `;

    return html;
}

function generateInfo() {
    let betUnits = trueCount >= 2 ? Math.floor(trueCount) - 1 : 1;

    let elapsedTime = Date.now() - startTime;
    let minutes = Math.round(elapsedTime / 60000);

    let color = trueCount >= 1 ? "limegreen" : trueCount < 0 ? "red" : "black";

    let advantage = trueCount * 0.5 - 0.5;

    let winProbability = (50 + advantage) / 100;

    // fraction of bankroll to bet
    let kellyCriterion = winProbability * (1 + 1) - 1;

    let betSizeKelly = kellyCriterion * bankroll;
    let betSizeHalfKelly = Math.round(betSizeKelly / 2);

    let html = `
        <div class="info" id="info" hx-swap-oob="true">
            <div class="info-item">
                <span>Seen</span>
                <b>${cardsSeen}</b>
            </div>

            <div class="info-item">
                <span>Left</span>
                <b>${cardsleft}</b>
            </div>

            <div class="info-item">
                <span>Pen%</span>
                <b>${Math.round((cardsSeen / (numberOfDecks * 52)) * 100)}</b>
            </div>

            <div class="info-item">
                <span>Mins</span>
                <b>${minutes}</b>
            </div>

            <div class="info-item">
                <span>Running</span>
                <b>${runningCount}</b>
            </div>

            <div class="info-item">
                <span>True</span>
                <b style="color: ${color};">${trueCount}</b>
            </div>

             <div class="info-item">
                <span>Adv%</span>
                <b style="color: ${color};">${advantage.toFixed(1)}%</b>
            </div>

            <div class="info-item">
                <span>bet</span>
                <b>${betSizeHalfKelly}</b>
            </div>

            <div class="info-item">
                <span>Insurance</span>
                <b>${trueCount >= 3 ? "YES" : "NO"}</b>
            </div>

        </div>
    `;

    return html;
}

function generateTableRows(chartObject) {
    let html = "";

    for (let key in chartObject) {
        html += `
            <tr>
                <td><b>${key.replace(/_/g, "")}</b></td>
                ${generateTableCell(chartObject[key][2])}
                ${generateTableCell(chartObject[key][3])}
                ${generateTableCell(chartObject[key][4])}
                ${generateTableCell(chartObject[key][5])}
                ${generateTableCell(chartObject[key][6])}
                ${generateTableCell(chartObject[key][7])}
                ${generateTableCell(chartObject[key][8])}
                ${generateTableCell(chartObject[key][9])}
                ${generateTableCell(chartObject[key][10])}
                ${generateTableCell(chartObject[key]["A"])}
            <tr>
        `;
    }

    return html;
}

function generateTableCell(value) {
    let className = "";

    switch (value) {
        case "H":
            className = "green";
            break;

        case "D":
            className = "cyan";
            break;

        case "S":
            className = "red";
            break;

        case "Y":
            className = "black";
            break;

        case "N":
            className = "white";
            break;

        default:
            break;
    }

    let html = `
        <td class="${className}">${value}</td>
    `;

    return html;
}

router.get("/", (req, res) => {
    let html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta name="viewport" content="user-scalable=no">
                <title>BLACKJACK</title>
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                <link rel="stylesheet" type="text/css" href="style.css" />
                <script src="https://unpkg.com/htmx.org@2.0.3"></script>       
            </head>
            <body>
                <div class="container">
                    <button 
                        class="reset"
                        id="reset"
                        hx-post="/reset" 
                        hx-swap="none"
                    >
                        RESET
                    </button>

                   ${generateTable()}
                                  
                   <div class="footer">
                        <div class="buttons">
                            <button 
                                class="low"
                                id="low"
                                hx-post="/low" 
                                hx-swap="none"
                            >
                                2, 3, 4, 5, 6
                            </button>

                             <button 
                                class="neutral"
                                id="neutral"
                                hx-post="/neutral" 
                                hx-swap="none"
                            >
                                7, 8, 9
                            </button>

                            <button 
                                class="high"
                                id="high"
                                hx-post="/high" 
                                hx-swap="none"
                            >
                                T, J, Q, K, A
                            </button>
                        </div>

                        ${generateInfo()}                

                        <button 
                            class="undo"
                            id="undo"
                            hx-post="/undo" 
                            hx-swap="none"
                        >
                            UNDO
                        </button>
                    </div>
                </div>
            </body>
        </html>
    `;

    res.send(html);
});

router.post("/high", (req, res) => {
    history.push("high");

    cardsSeen++;
    cardsleft--;
    runningCount--;
    trueCount = (runningCount / (cardsleft / 52)).toFixed(1);

    let html = `
        ${generateTable()}
        ${generateInfo()}
    `;

    res.send(html);
});

router.post("/neutral", (req, res) => {
    history.push("neutral");

    cardsSeen++;
    cardsleft--;
    runningCount += 0;
    trueCount = (runningCount / (cardsleft / 52)).toFixed(1);

    let html = `
        ${generateTable()}
        ${generateInfo()}
    `;

    res.send(html);
});

router.post("/low", (req, res) => {
    history.push("low");

    cardsSeen++;
    cardsleft--;
    runningCount++;
    trueCount = (runningCount / (cardsleft / 52)).toFixed(1);

    let html = `
        ${generateTable()}
        ${generateInfo()}
    `;

    res.send(html);
});

router.post("/undo", (req, res) => {
    let last = history.pop();

    cardsSeen--;
    cardsleft++;

    switch (last) {
        case "high":
            runningCount++;
            break;

        case "neutral":
            runningCount += 0;
            break;

        case "low":
            runningCount--;
            break;

        default:
            break;
    }

    trueCount = (runningCount / (cardsleft / 52)).toFixed(1);

    let html = `
        ${generateTable()}
        ${generateInfo()}
    `;

    res.send(html);
});

router.post("/reset", (req, res) => {
    cardsSeen = 0;
    cardsleft = numberOfDecks * 52;
    runningCount = 0;
    trueCount = 0;
    history = [];

    let html = `
        ${generateTable()}
        ${generateInfo()}
    `;

    startTime = Date.now();

    res.send(html);
});

module.exports = router;