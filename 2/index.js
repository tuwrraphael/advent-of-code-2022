import fs from "fs/promises";
import path from "path"

const input = await fs.readFile(path.join("./2/input.txt"), "utf8");


const mapChoice = {
    "X": "A",
    "Y": "B",
    "Z": "C"
};

const winsOver = {
    "A": "C",
    "B": "A",
    "C": "B"
};

const choiceScore = {
    "A": 1,
    "B": 2,
    "C": 3
};

function evaluateGameScore(opponentChoice, myChoice) {
    let gameScore = 0;
    if (opponentChoice == myChoice) {
        gameScore = 3;
    } else if (winsOver[myChoice] == opponentChoice) {
        gameScore = 6;
    }
    return gameScore + choiceScore[myChoice];
}

const results = input.split("\n").map(line => {
    const game = line.split(" ");
    const opponentChoice = game[0];
    const myChoice = mapChoice[game[1]];
    return evaluateGameScore(opponentChoice, myChoice);
}).filter(r => !isNaN(r));

const totalScore = results.reduce((prev, cur) => prev + cur, 0);

console.log(totalScore);

const resultsPart2 = input.split("\n").map(line => {
    const game = line.split(" ");
    const opponentChoice = game[0];
    let myChoice;
    switch (game[1]) {
        case "X":
            myChoice = winsOver[opponentChoice];
            break;
        case "Y":
            myChoice = opponentChoice;
            break;
        case "Z":
            myChoice = Object.entries(winsOver).find(([win, lose]) => lose == opponentChoice)[0];
            break;
    }
    return evaluateGameScore(opponentChoice, myChoice);
}).filter(r => !isNaN(r));

const totalScorePart2 = resultsPart2.reduce((prev, cur) => prev + cur, 0);

console.log(totalScorePart2);