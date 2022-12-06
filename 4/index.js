import fs from "fs/promises";
import path from "path"

const input = await fs.readFile(path.join("./4/input.txt"), "utf8");
const cleaningAssignments = input.split("\n").map(line => line.split(",").map(sections => sections.split("-").map(i => parseInt(i))));

function checkFullyContain(sections1, sections2) {
    return sections1[0] <= sections2[0] && sections1[1] >= sections2[1] ? true : false;
}

const fullyContaining = cleaningAssignments.filter(([elf1, elf2]) => checkFullyContain(elf1, elf2) || checkFullyContain(elf2, elf1));
console.log(fullyContaining.length);

function checkOverlap(sections1, sections2) {
    return sections1[0] >= sections2[0] && sections1[0] <= sections2[1] ? true : false;
}

const overlapping = cleaningAssignments.filter(([elf1, elf2]) => checkOverlap(elf1, elf2) || checkOverlap(elf2, elf1));
console.log(overlapping.length);
