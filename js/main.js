const GIST_ID = "676f36c399284ec286c2ddf187d2d1d2";
const GIST_URL = `https://api.github.com/gists/${GIST_ID}`;
const TOKEN = "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"

const GET_REQUEST = {
    method: "GET",
    crossDomain: true,
    headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `bearer ${TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28"
    }
}

const UPDATE_REQUEST = {
    method: "PATCH",
    crossDomain: true,
    headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `bearer ${TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28"
    },
}

const errorMessage = document.getElementById("error-message");

function showError(text) {
    errorMessage.innerText = `ERRO: ${text}`;
    errorMessage.classList.add("show");
}

async function reveal() {
    const name = document.getElementById("myInput").value;

    if (!names.includes(name)) {
        showError("Nome digitado não está na lista!");
        return;
    }

    let response = await fetch(GIST_URL, GET_REQUEST);

    if (response.status !== 200) {
        showError("Não conseguimos contato como servidor. Verifique sua conexão com a internet.");
        return;
    }

    let json = await response.json();
    sortitionMap = JSON.parse(json.files["sortitionMap.json"]?.content);

    if (!sortitionMap) {
        showError("Erro interno, arquivo de dados não encontrado.");
        return;
    }

    if (typeof sortitionMap[name] === typeof undefined) {
        showError("Nome não está presente na lista do servidor!");
        return;
    }

    const { f, s } = sortitionMap[name];

    if (s) {
        showError("Você já viu quem é seu amigo oculto, não é possível visualizar de novo! Se você não viu, informe no grupo do WhatsApp!");
        return;
    }

    sortitionMap[name].s = true;

    UPDATE_REQUEST.body = JSON.stringify({
        files: {
            "sortitionMap.json": {
                content: JSON.stringify(sortitionMap)
            }
        }
    });

    response = await fetch(GIST_URL, UPDATE_REQUEST);

    if (response.status !== 200) {
        showError("Perdemos contato com servidor, operação abortada. Verifique sua conexão com a internet.");
        return;
    }

    const friend = atob(f);
    const revealText = document.getElementById("reveal-text");
    revealText.innerText = `Seu amigo oculto é: ${friend}`
    revealText.classList.add("show");
}

const revealBtn = document.getElementById("revealBtn");
revealBtn.onclick = reveal;