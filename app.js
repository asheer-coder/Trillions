const slides = [
  'Fancy Ladies Slippers',
  'Boys Sandals',
  'Sports Shoes',
  'Fashion Footwear'
];

let i = 0;

setInterval(() => {
  const el = document.getElementById('slideText');
  if (el) {
    i = (i + 1) % slides.length;
    el.innerText = slides[i];
  }
}, 2000);

// Shortcut Add
function addShortcut(key, boxId) {
  let name = prompt('Enter Shortcut Name');
  if (!name) return;

  let url = prompt('Enter Website URL');
  if (!url) return;

  // https:// automatically add kar dega
  if (
    !url.startsWith('http://') &&
    !url.startsWith('https://')
  ) {
    url = 'https://' + url;
  }

  let data = JSON.parse(
    localStorage.getItem(key) || '[]'
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

// Shortcut Show
function renderShortcuts(key, boxId) {
  const box = document.getElementById(boxId);
  if (!box) return;

  box.innerHTML = '';

  let data = JSON.parse(
    localStorage.getItem(key) || '[]'
  );

  data.forEach((x, index) => {
    const div = document.createElement('div');
    div.style.marginBottom = '10px';

    const btn = document.createElement('button');
    btn.innerText = x.name;
    btn.onclick = () =>
      window.open(x.url, '_blank');

    const del = document.createElement('button');
    del.innerText = '❌';
    del.style.marginLeft = '10px';
    del.onclick = () => {
      deleteShortcut(key, index, boxId);
    };

    div.appendChild(btn);
    div.appendChild(del);
    box.appendChild(div);
  });
}

// Shortcut Delete
function deleteShortcut(key, index, boxId) {
  let data = JSON.parse(
    localStorage.getItem(key) || '[]'
  );

  data.splice(index, 1);

  localStorage.setItem(
    key,
    JSON.stringify(data)
  );

  renderShortcuts(key, boxId);
}
