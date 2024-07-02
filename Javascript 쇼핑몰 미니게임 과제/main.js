// Fetch the items from the JSON file
function loadItems() {
    return fetch('data.json')
        .then(response => response.json())
        .then(json => json.items);
}

// 각각에 해당하는 item들을 html li 형태로 변환 (문자열의 배열을 한 가지의 문자열로 병합할 때 join 사용)
function displayItems(items) {
    const container = document.querySelector('.items');
    const html = items.map(item => createHTMLString(item));
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// 함수 만들기; back tag 이용
function createHTMLString(item) {
    return `
      <li class="item">
          <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
          <span class="item__description">${item.gender}, ${item.size}</span>
      </li>
      `;
}


// main
loadItems()
    .then(items => {
        displayItems(items);
        setEventListeners(items)
    })
    .catch(console.log);
