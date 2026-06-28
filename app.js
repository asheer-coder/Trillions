// ================= SLIDER =================

const slides = [
    "Fancy Ladies Slippers",
    "Boys Sandals",
    "Sports Shoes",
    "Fashion Footwear"
];

let slideIndex = 0;

setInterval(() => {
    const text =
        document.getElementById("slideText");

    if (text) {
        slideIndex =
            (slideIndex + 1) % slides.length;

        text.innerText =
            slides[slideIndex];
    }
}, 2000);

// ================= MOBILE MENU =================

function toggleMenu() {
    const sidebar =
        document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.classList.toggle("active");
    }
}

// ================= SHORTCUTS =================

function addShortcut(key, boxId) {
    let name =
        prompt("Enter Shortcut Name");

    if (!name) return;

    let url =
        prompt("Enter Website URL");

    if (!url) return;

    if (
        !url.startsWith("http://") &&
        !url.startsWith("https://")
    ) {
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
    const box =
        document.getElementById(boxId);

    if (!box) return;

    box.innerHTML = "";

    let data = JSON.parse(
        localStorage.getItem(key) || "[]"
    );

    data.forEach((item, index) => {
        const div =
            document.createElement("div");

        const openBtn =
            document.createElement("button");

        openBtn.innerText =
            item.name;

        openBtn.onclick = () => {
            window.open(
                item.url,
                "_blank"
            );
        };

        const delBtn =
            document.createElement("button");

        delBtn.innerText = "❌";

        delBtn.onclick = () => {
            deleteShortcut(
                key,
                index,
                boxId
            );
        };

        div.appendChild(openBtn);
        div.appendChild(delBtn);

        box.appendChild(div);
    });
}

function deleteShortcut(
    key,
    index,
    boxId
) {
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

// ================= CONTACTS =================

function saveContact() {
    const nameInput =
        document.getElementById("name");

    const phoneInput =
        document.getElementById("phone");

    const descInput =
        document.getElementById("desc");

    if (
        !nameInput ||
        !phoneInput ||
        !descInput
    ) {
        return;
    }

    const name =
        nameInput.value.trim();

    const phone =
        phoneInput.value.trim();

    const desc =
        descInput.value.trim();

    if (
        name === "" ||
        phone === ""
    ) {
        alert(
            "Enter Name and Phone Number"
        );
        return;
    }

    let contacts = JSON.parse(
        localStorage.getItem(
            "contacts"
        ) || "[]"
    );

    contacts.unshift({
        name,
        phone,
        desc
    });

    localStorage.setItem(
        "contacts",
        JSON.stringify(contacts)
    );

    nameInput.value = "";
    phoneInput.value = "";
    descInput.value = "";

    alert("Contact Saved!");

    renderContacts();
}

function renderContacts(
    list = null
) {
    const box =
        document.getElementById(
            "contactList"
        );

    if (!box) return;

    const contacts =
        list ||
        JSON.parse(
            localStorage.getItem(
                "contacts"
            ) || "[]"
        );

    box.innerHTML = "";

    contacts.forEach(
        (c, index) => {
            box.innerHTML += `
                <div class="contact-card">
                    <b>${c.name}</b><br>
                    📞 ${c.phone}<br>
                    ${c.desc}<br><br>

                    <button
                    onclick="deleteContact(${index})">
                    ❌ Delete
                    </button>

                    <hr>
                </div>
            `;
        }
    );
}

function deleteContact(index) {
    let contacts = JSON.parse(
        localStorage.getItem(
            "contacts"
        ) || "[]"
    );

    contacts.splice(index, 1);

    localStorage.setItem(
        "contacts",
        JSON.stringify(contacts)
    );

    renderContacts();
}

function searchContacts() {
    const text =
        document
            .getElementById(
                "searchBox"
            )
            ?.value
            .toLowerCase() || "";

    let contacts = JSON.parse(
        localStorage.getItem(
            "contacts"
        ) || "[]"
    );

    const filtered =
        contacts.filter(
            c =>
                c.name
                    .toLowerCase()
                    .includes(text) ||
                c.phone.includes(text)
        );

    renderContacts(filtered);
}

// ================= PAGE LOAD =================

window.addEventListener(
    "DOMContentLoaded",
    () => {
        renderShortcuts(
            "ret",
            "retBox"
        );

        renderShortcuts(
            "sup",
            "supBox"
        );

        renderShortcuts(
            "con",
            "conBox"
        );

        renderShortcuts(
            "pay",
            "payBox"
        );

        renderShortcuts(
            "stock",
            "stockBox"
        );

        renderShortcuts(
            "order",
            "orderBox"
        );

        renderContacts();
    }
);
