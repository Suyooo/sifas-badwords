const fs = require("fs");

function makeTrie(wordlist){
    const trie = {};

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

    return trie;
}

fs.writeFileSync("sif/trie.js", "const trie=" + JSON.stringify(makeTrie(require("./sif/wordlist.json"))));
fs.writeFileSync("trie.js", "const trieGl=" + JSON.stringify(makeTrie(require("./wordlist_gl.json")))
    + ";const trieJp=" + JSON.stringify(makeTrie(require("./wordlist_jp.json"))));