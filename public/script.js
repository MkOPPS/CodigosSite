async function addCode() {
    const nameElement = document.getElementById('name');
    const newCodeElement = document.getElementById('newCode');
    let name = nameElement.value.trim().toUpperCase();
    let newCode = newCodeElement.value.trim().toUpperCase();

    if (name && newCode) {
        await fetch('/addCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, code: newCode }),
        });

        nameElement.value = '';
        newCodeElement.value = '';
        displayCodes([]);
    } else {
        alert("Por favor, insira um nome e código!");
    }
}

async function searchCode() {
    const query = document.getElementById('searchQuery').value.trim().toUpperCase();
    const response = await fetch(`/searchCode?code=${query}`);
    const result = await response.json();

    if (response.ok) {
        displayCodes([result]);
    } else {
        alert("Código não encontrado.");
    }
}

function displayCodes(codesToDisplay) {
    const codeList = document.getElementById('codeList');
    codeList.innerHTML = '';

    codesToDisplay.forEach((code) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${code.name} ${code.code}`;
        codeList.appendChild(listItem);
    });
}

document.getElementById('newCode').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addCode();
    }
});

document.getElementById('searchQuery').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchCode();
    }
});
