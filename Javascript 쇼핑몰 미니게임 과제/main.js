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

//on + event 형식으로 작성.
function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    // console.log(event.target.dataset.key);
    // console.log(event.target.dataset.value);

    // 해당하지 않는 경우에는 함수를 끝내겠다는 의미
    if (key == null || value == null) {
        return; 
    }

    displayItems(items.filter(item => item[key] === value));

    // const filtered = items.filter(item => item[key] ===value);
    // console.log(filtered);
    // displayItems(filtered);
}

// 로고 클릭했을 때 작동하도록
function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}



// Creates HTML element from given item
function createElement(item) {
    const img = document.createElement('img');
    img.setAttribute('class', 'thumbnail');
    img.setAttribute('src', item.image);
  
    const span = document.createElement('span');
    span.setAttribute('class', 'description');
    span.innerText = `${item.gender}, ${item.size} size`;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-type', item.type);
    li.setAttribute('data-color', item.color);
    li.append(img);
    li.append(span);
    return li;
  }
  
//   // Handle button click
//   function onButtonClick(event, items) {
//     const target = event.target;
//     const key = target.dataset.key;
//     const value = target.dataset.value;
//     if (key == null || value == null) {
//       return;
//     }
//     updateItems(items, key, value);
//   }
  
//   // Make the items matching {key: value} invisible.
//   function updateItems(items, key, value) {
//     items.forEach(item => {
//       if (item.dataset[key] === value) {
//         item.classList.remove('invisible');
//       } else {
//         item.classList.add('invisible');
//       }
//     });
//   }
  
//   loadItems().then(items => {
//     const elements = items.map(createElement);
//     const container = document.querySelector('.items');
//     container.append(...elements);
//     const buttons = document.querySelector('.buttons');
//     buttons.addEventListener('click', event => onButtonClick(event, elements));
//   });


// main
loadItems()
    .then(items => {
        displayItems(items);
        setEventListeners(items)
    })
    .catch(console.log);
