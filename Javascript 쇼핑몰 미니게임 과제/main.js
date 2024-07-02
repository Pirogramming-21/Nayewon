// Fetch the items from the JSON file
function loadItems() {
    return fetch('Javascript 쇼핑몰 미니게임 과제/data.json')
      .then(response => response.json())
      .then(json => json.items);
  }
  
  
  // main
  loadItems()
    .then(items => {
        console.log(items);
            // displayItems(items);
            // setEventListeners(items)
    })
    .catch(console.log);
  