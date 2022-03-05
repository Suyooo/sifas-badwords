let wordlist = require("./wordlist.json")
let fs = require("fs");

let trie = {};

for (let wi in wordlist) {
    let word = wordlist[wi];
    console.log(word);
    let cur = trie;

    for (let i = 0; i < word.length; i++) {
        let ch = word.charCodeAt(i);
        if (i === word.length - 1) {
            // last character
            cur[ch] = 1;
        } else {
            if (!cur.hasOwnProperty(ch)) cur[ch] = {};
            cur = cur[ch];
        }
    }
}

fs.writeFileSync("trie.js", "const trie=" + JSON.stringify(trie));