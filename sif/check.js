// These characters are ignored by the checker - probably not comlete though, just found these by trying various ones
const skips = /[ .,;\-_~'´`!?"&<>()\[\]{}　（）．‥…，；ー＿〜’！？”＜＞［］｛｝]/;

const arabicPersian = /[\u0600-\u06FF\u0750-\u077F]/;
const devanagari = /[\u0900-\u097F\uA8E0-\uA8FF]/;
const armenian = /[\u0530-\u058F]/;
const kannada = /[\u0C80-\u0CFF]/;
const malayalam = /[\u0D00-\u0D7F]/;
const myanmar = /[\u1000-\u109F]/;
const telugu = /[\u0C00-\u0C7F]/;
const halfCyrillic = /[\u0450-\u04FF]/;
const greekAccented = /[ίϊΐόάέύϋΰήώ]/;

function isValidChar(c) {
    if (arabicPersian.test(c)) {
        return "arabic/persian script is not allowed";
    }
    if (devanagari.test(c)) {
        return "devanagari script is not allowed";
    }
    if (armenian.test(c)) {
        return "armenian script is not allowed";
    }
    if (kannada.test(c)) {
        return "kannada script is not allowed";
    }
    if (malayalam.test(c)) {
        return "malayalam script is not allowed";
    }
    if (myanmar.test(c)) {
        return "myanmar script is not allowed";
    }
    if (telugu.test(c)) {
        return "telugu script is not allowed";
    }
    if (halfCyrillic.test(c)) {
        return "some cryllic script is not allowed";
    }
    if (greekAccented.test(c)) {
        return "greek letters with accents are not allowed";
    }
    return true;
}

function checkString(s, specialerrors) {
    // fullwidth to halfwidth https://stackoverflow.com/a/20488304
    s = s.toLowerCase().replace(
        /[\uff01-\uff5e]/g,
        function (ch) {
            return String.fromCharCode(ch.charCodeAt(0) - 0xfee0);
        }
    );
    let marks = [];
    let pos = 0;
    while (pos < s.length) {
        if (skips.test(s[pos])) {
            // If this is a skipped character, just move on (makes the range more precise)
            pos++;
            continue;
        }
        let valid = isValidChar(s[pos]);
        if (valid !== true) {
            specialerrors.push(valid);
            marks.push([pos, 1]);
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
                    valid = isValidChar(s[pos + length]);
                    if (valid !== true) {
                        specialerrors.push(valid);
                        marks.push([pos + length, 1]);
                        pos = pos + length + 1;
                        res = false;
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

    let specialerrors = [];
    let marks = checkString(s, specialerrors);
    if (specialerrors.length > 0) n.innerHTML = specialerrors.filter((v, i, a) => a.indexOf(v) === i).join("<br>");
    else if (marks.length === 0 && s.length > 0) n.innerHTML = "no problems :)";

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