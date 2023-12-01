const { names } = require("./names.js")

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

let shuffledNames = shuffle([...names]);
let hasRepeated;

do {
    shuffledNames = shuffle([...names]);
    for (let i = 0; i < names.length; i++) {
        hasRepeated = names[i] === shuffledNames[i];
        if (hasRepeated) break;
    }
} while (hasRepeated);

const sortitionMap = {}
for (let i = 0; i < names.length; i++) {
    sortitionMap[names[i]] = { f: btoa(shuffledNames[i]), s: false };
}

const sortitionString = JSON.stringify(sortitionMap);
console.log(sortitionString.replaceAll("false},", "false},\n"));

const gistId = "676f36c399284ec286c2ddf187d2d1d2";
const gistUrl = `https://api.github.com/gists/${gistId}`;

const url2 = "https://gist.githubusercontent.com/pvmr3/34b01757703d63284796e179cbf2e6a3/raw/b0192c8c6208eaac57ac0cca0b930dd0a8d5f5b5/stuff.txt";

const getRequest = {
    method: "GET",
    headers: {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
    }
}

const updateRequest = {
    method: "PATCH",
    headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": "token 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",
        "X-GitHub-Api-Version": "2022-11-28"
    },
    body: JSON.stringify({
        files: {
            "sortitionMap.json": {
                content: sortitionString
            }
        }
    }),
}

const getJson = async () => {
    let response = await fetch(gistUrl, updateRequest);
    let json = await response.json();
    console.log(json);
}
getJson();

// const getTxt = async () => {
//     let response = await fetch(url2, getRequest);
//     let text = await response.text();
//     console.log(text);
// }
// getTxt();