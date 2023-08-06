let charactersContainer = document.getElementById("characters-container");
// my public key : dbb55cd434feeb0f9fa0705ccfa4ecb5
// my private key : 366e05f3d0c15b1ce6d4032fcf57b31743364fa6
// hash code : c3aa7f0ad734cbfa578b81f85cb959f9

// fetching data
async function fetchData(){
	const response = await fetch("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=dbb55cd434feeb0f9fa0705ccfa4ecb5&hash=c3aa7f0ad734cbfa578b81f85cb959f9");

	const data = await response.json();
	// console.log(data);
	return data;
};

// get favourite hero data from local storage

function getStorage(){
	let data = JSON.parse(localStorage.getItem("favourite")) || [];
	// console.log(data);
	return data;
}

fetchData()
	.then((data) => {
		let favouriteData = getStorage();
		let arr = data.data.results;
		// console.log(arr);
		charactersContainer.innerHTML = "";

		// iterating over favourite character array
		for(let i=0; i<arr.length; i++){
			let favourite = "favourite";

			for(let j=0; j<favouriteData.length; j++){
				if(arr[i].id == favouriteData[j].id){
					favourite = "UnFavourite";
					break;
				}
			}
			const {id, thumbnail, name} = arr[i];
			let div = document.createElement("div");
			div.classList.add("character-card");
			div.setAttribute("id", id);
			let path = `../super-hero-hunter-app/pages/characterDetails.html#${id}`;

			// console.log(path);

			div.innerHTML = `
			<img class="poster" src=${thumbnail.path}.jpg alt="">
			<div class="card-body">
			  <a href=${path}>${name}</a>
			  <input type="button" value=${favourite} id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}"}' onclick="updateFavourite(this)"/>
			</div>
			`;
			charactersContainer.appendChild(div);
		}
	}).catch((error) => {
		console.log("Error while fetching api: ", error);
	});


let searchBtn = document.getElementById("searchBtn");
let searchBox = document.getElementById("searchBox");
let searchResult = document.getElementById("searchResult");

searchBtn.addEventListener('click', () => {
	let  item = searchBox.value;
	// console.log(item);
	searchBox.value = "";

	let url = `http://gateway.marvel.com/v1/public/characters?name=${item}&ts=1&apikey=dbb55cd434feeb0f9fa0705ccfa4ecb5&hash=c3aa7f0ad734cbfa578b81f85cb959f9`;

	fetch(url).then((response) => {
		return response.json();
	}).then((data) => {
		// console.log(data.data.results[0]);
		let result = data.data.results[0];
		const {id, name, thumbnail} = result;

		let favouriteData = getStorage();

		let favourite = "favourite";
		for(let j=0; j<favouriteData.length; j++){
			if(result.id == favouriteData[j].id){
				favourite = "UnFavourite";
				break;
			}
		}

	searchResult.innerHTML = "";
	let h2 = document.createElement("h2");
	h2.innerHTML = 'Search result :';
	searchResult.appendChild(h2);

	let div = document.createElement("div");
	div.classList.add("character-card");
	div.setAttribute("id", id);
	let path = `../super-hero-hunter-app/pages/characterDetails.html#${id}`;
	div.innerHTML = `
		<img class="poster" src=${thumbnail.path}.jpg alt="">
		<div class="card-body">
		<a href=${path}>${name}</a>
		<input type="button" value=${favourite} id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}"}' onclick="updateFavourite(this)"/>
		</div>
	`;
	searchResult.appendChild(div);
	}).catch((error)=>{
		console.log(error);
	});
});

