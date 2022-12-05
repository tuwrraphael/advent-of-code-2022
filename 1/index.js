import fs from "fs/promises";
import path from "path"

const input = await fs.readFile(path.join("./1/input.txt"), "utf8");
const elvesCalories = input.split("\n\n").map(e => e.split("\n").map(s => parseInt(s)));
const elvesCalorySums = elvesCalories.map(e => e.reduce((prev, cur) => prev + cur, 0));
const maxCalories = elvesCalorySums.sort((a, b) => b - a)[0];
const topThree = elvesCalorySums.sort((a, b) => b - a).slice(0, 3).reduce((prev, cur) => prev + cur, 0);

console.log(maxCalories);
console.log(topThree);