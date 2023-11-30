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
const token = atob("Z2l0aHViX3BhdF8xMUFPV0FCR0EweEhZR3F4b2VkNVpOXzVudmE4dkhJRHk3dllaa3ZBeEs3aDhWZXpRM1RDbTN1b0FROW83S0J2ZnhINUdUN1dNS3FYaXJqNHpY");
const gistUrl = `https://api.github.com/gists/${gistId}`;
const getRequest = {
    method: "GET",
    headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `token ${token}`,
        "X-GitHub-Api-Version": "2022-11-28"
    }
}

const updateRequest = {
    method: "PATCH",
    headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": "Bearer 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",
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

const getGist = async () => {
    let response = await fetch(gistUrl, getRequest);
    let json = await response.json();
    console.log(json);
}
getGist();