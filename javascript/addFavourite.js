
function getStorage(){
	let data = JSON.parse(localStorage.getItem("favourite")) || [];
	return data;
}

function setStorage(data) {
	let dataString = JSON.stringify(data);
	localStorage.setItem("favourite", dataString);
}

function updateFavourite(e){
	let data = JSON.parse(e.getAttribute("data-character"));
	let favouriteList = getStorage();

	for(let character = 0; character < favouriteList.length; character++){
		if(favouriteList[character].id == data.id){
			favouriteList.splice(character, 1);
			e.setAttribute("value", "Favourite");
			setStorage(favouriteList);
			return;
		}
	}
	favouriteList.push(data);
	setStorage(favouriteList);
	e.setAttribute("value", "UnFavourite");
}

function renderFavourite(favouriteContainer) {
	// get favourite list of characters from local storage
	let myFavouriteList = getStorage();
	
	if(myFavouriteList.length > 0) {
	  favouriteContainer.innerHTML = "";
	}
	// iterate over all the favourite list chracters fetched from local storage
	for (let character = 0; character < myFavouriteList.length; character++) {
	  const { id, name, path } = myFavouriteList[character];
  
	  // create a seperate div container for each character and append it to the parent node
	  let div = document.createElement("div");
	  div.classList.add("character-card");
	  div.setAttribute("id", id);
  
	  // path to redirect to the character details page when user click on character titles
	  let detailsPath = `../pages/characterDetails.html#${id}`;
	  div.innerHTML = `
		  <img class="poster" src=${path}.jpg alt="">
		  <div class="card-body">
		  <a href=${detailsPath}>${name}</a>
		  <input type="button" value="UnFavourite" id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${path}"}' onclick="updateFavourite(this)"/>
		  </div>
	  `;
	  favouriteContainer.appendChild(div);
	}
  }

  // render favourite page only if user visits on favourite page
let favouriteContainer = document.getElementById('favourite-characters');
if(favouriteContainer != null) {
  renderFavourite(favouriteContainer);
}
