import fs from "fs/promises";
import path from "path"

const input = await fs.readFile(path.join("./6/input.txt"), "utf8");

function findMarker(length) {
    return Array.from(input)
        .map((c, i) => input.substring(i, i + length))
        .filter(group => group.length == length)
        .findIndex(group => new Set(group).size == length) + length;
}

console.log(findMarker(4));
console.log(findMarker(14));
