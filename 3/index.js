import fs from "fs/promises";
import path from "path"

const input = await fs.readFile(path.join("./3/input.txt"), "utf8");
const compartments = input.split("\n").map(s => [s.substring(0, s.length / 2), s.substring(s.length / 2)]);
const common = compartments.map(([c1, c2]) => {
    let compartment1Set = new Set(c1);
    return Array.from(c2).find(item => compartment1Set.has(item));
});

function mapPriority(item) {
    const charCode = item.charCodeAt(0);

    if (charCode < "a".charCodeAt(0)) {
        return charCode - 64 + 26;
    }
    return charCode - 96;
}

const priority = common.map(mapPriority);
const sum = priority.reduce((prev, cur) => prev + cur, 0);
console.log(sum);

const groups = input.split("\n").reduce((prev, cur) => {
    if (prev[prev.length - 1].length < 3) {
        prev[prev.length - 1].push(cur);
    } else {
        prev.push([cur]);
    }
    return prev;
}, [[]]);

const commonInGroup = groups.map(([sack1, sack2, sack3]) => {
    let sack1Set = new Set(sack1);
    let sack2Set = new Set(sack2);
    return Array.from(sack3).find(item => sack1Set.has(item) && sack2Set.has(item));
});

const priorityPart2 = commonInGroup.map(mapPriority);
const sumPart2 = priorityPart2.reduce((prev, cur) => prev + cur, 0);
console.log(sumPart2);