// These characters are ignored by the checker - probably not comlete though, just found these by trying various ones
const skips = /[ .,;-_~'´`!?"&<>()\[\]{}　（）．‥…，；ー＿〜’！？”＜＞［］｛｝]/;

const arabicOrPersian = /[\u0600-\u06FF\u0750-\u077F]/;

function checkString(s) {
    // fullwidth to halfwidth https://stackoverflow.com/a/20488304
    s = s.toLowerCase().replace(
        /[\uff01-\uff5e]/g,
        function(ch) { return String.fromCharCode(ch.charCodeAt(0) - 0xfee0); }
    );
    let marks = [];
    let pos = 0;
    while (pos < s.length) {
        if (skips.test(s[pos])) {
            // If this is a skipped character, just move on (makes the range more precise)
            pos++;
            continue;
        }

        let length = 0;
        let cur = trie;
        let res = undefined;

        while (res === undefined) {
            if (pos + length >= s.length) res = false;
            else {
                if (skips.test(s[pos + length])) {
                    // Keep trie position but go to next character
                    length++;
                } else {
                    let ch = s.charCodeAt(pos + length);
                    if (!cur.hasOwnProperty(ch)) res = false;
                    else if (cur[ch] === 1) res = true;
                    else {
                        cur = cur[ch];
                        length++;
                    }
                }
            }
        }

        if (res === true) {
            marks.push([pos, length + 1]);
            pos = pos + length + 1;
        } else {
            pos++;
        }
    }

    return marks;
}

function update() {
    let s = document.getElementById("input").value;
    let o = document.getElementById("output");
    let n = document.getElementById("note");
    o.innerHTML = "";
    n.innerHTML = "";

    if (arabicOrPersian.test(s)) {
        n.innerHTML = "arabic/persian alphabet is not allowed";
        o.innerHTML+= "<span>" + s + "</span>";
        return;
    }

    let marks = checkString(s);
    if (marks.length === 0 && s.length > 0) n.innerHTML = "no problems :)";

    let lastpos = 0;
    for (let i = 0; i < marks.length; i++) {
        let mark = marks[i];
        o.innerHTML += s.substring(lastpos, mark[0]);
        o.innerHTML += "<span>" + s.substr(mark[0], mark[1]) + "</span>";
        lastpos = mark[0] + mark[1];
    }
    o.innerHTML += s.substring(lastpos, s.length);
}

update();