import fs from "fs/promises";
import path from "path"

const [stackSection, commandSection] = (await fs.readFile(path.join("./5/input.txt"), "utf8")).split("\n\n");
const stacksInput = stackSection.split("\n");
const rows = stacksInput.slice(0, stacksInput.length - 1).map(stackLine => {
    return Array.from(stackLine).filter((_, idx) => (3 + idx) % 4 == 0);
});
const stacks = rows[0].map((_, colIndex) => rows.map(row => row[colIndex]))
    .map(stack => stack.filter(e => " " != e));

const commands = commandSection.split("\n")
    .map(cmdString => cmdString.replace(/[a-z]/g, "").split(" ").filter(s => s))
    .map(cmds => cmds.map(i => parseInt(i)));

const stacksForPart2 = [...stacks.map(s => [...s])];

for (let [qty, from, to] of commands) {
    for (let n = 0; n < qty; n++) {
        stacks[to - 1].unshift(stacks[from - 1].shift())
    }
}

console.log(stacks.map(stack => stack[0]).join(""));

for (let [qty, from, to] of commands) {
    let pickedCrates = stacksForPart2[from - 1].splice(0, qty);
    stacksForPart2[to - 1] = [...pickedCrates, ...stacksForPart2[to - 1]];
}

console.log(stacksForPart2.map(stack => stack[0]).join(""));