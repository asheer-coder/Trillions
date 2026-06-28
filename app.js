function addShortcut(key, boxId) {
    let name = prompt("Enter Shortcut Name");
    if (!name) return;

    let url = prompt("Enter Website URL");
    if (!url) return;

    if (!url.startsWith("http://") &&
        !url.startsWith("https://")) {
        url = "https://" + url;
    }

    let data = JSON.parse(
        localStorage.getItem(key) || "[]"
    );

    data.push({
        name: name,
        url: url
    });

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

    renderShortcuts(key, boxId);
}

function renderShortcuts(key, boxId) {
    const box = document.getElementById(boxId);
    if (!box) return;

    box.innerHTML = "";

    let data = JSON.parse(
        localStorage.getItem(key) || "[]"
    );

    data.forEach((item, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <button onclick="window.open('${item.url}','_blank')">
                ${item.name}
            </button>

            <button onclick="deleteShortcut('${key}',${index},'${boxId}')">
                ❌
            </button>
        `;

        box.appendChild(div);
    });
}

function deleteShortcut(key, index, boxId) {
    let data = JSON.parse(
        localStorage.getItem(key) || "[]"
    );

    data.splice(index, 1);

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

    renderShortcuts(key, boxId);
}
