// my public key : dbb55cd434feeb0f9fa0705ccfa4ecb5
// my private key : 366e05f3d0c15b1ce6d4032fcf57b31743364fa6
// hash code : c3aa7f0ad734cbfa578b81f85cb959f9





window.onload = function(){
	let wrapper = document.getElementById("characterWrapper");
	// console.log(wrapper);

	let windowUrl = window.location.href;
	// console.log(windowUrl);
	let id = windowUrl.substring(windowUrl.lastIndexOf('#')+1) || 1017100;

	// character Details api

	let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=dbb55cd434feeb0f9fa0705ccfa4ecb5&hash=c3aa7f0ad734cbfa578b81f85cb959f9`;
	// console.log(url);

	fetch(url).then((response) => {
		// console.log(response.json());
		return response.json();
	}).then((data) => {
		// console.log(data.data.results);
		let character = data.data.results[0];
		const {name, description, thumbnail} = character;
		let div = document.createElement("div");
		div.classList.add("character-info-container");

		div.innerHTML = ` <div class="character-poster">
		<img src="${thumbnail.path}.jpg" alt="">
	  </div>
	  <div class="character-info">
		<h3>${name}</h3>
		<p>${description || "description not found"}</p>
	  </div>`;
	  wrapper.innerHTML = "";
      wrapper.appendChild(div);

	}).catch((error) => {
		console.log("Error while fetching character api:", error);
	});

	let comicsWrapper = document.getElementById("comics");
	comicsWrapper.innerHTML = "";
	url = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?ts=1&apikey=dbb55cd434feeb0f9fa0705ccfa4ecb5&hash=c3aa7f0ad734cbfa578b81f85cb959f9`;
  
	fetch(url)
	  .then((response) => {
		return response.json();
	  })
	  .then((res) => {
		let comics = res.data.results;
		// iterate over all the comics and render it on browser
		for (let comic of comics) {
		  const { title, thumbnail, description } = comic;
		  let div = document.createElement("div");
		  div.classList.add("character-info-container");
  
		  div.innerHTML = `
		  <div class="character-poster">
			<img src="${thumbnail.path}.jpg" alt="">
		  </div>
		  <div class="character-info">
			<h3>${title}</h3>
			<p>${description || "description not found"}</p>
		  </div>
		`;
		  comicsWrapper.appendChild(div);
		}
	  })
	  // if any error occured while fetching data from api then display it on console
	  .catch((error) => {
		console.error(error);
	  })

}