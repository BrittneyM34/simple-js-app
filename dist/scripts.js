let pokemonRepository=function(){let t=[];function e(e){t.push(e)}function n(){return t}function o(t){i(t).then(function(){var e;e=t,document.querySelector(".modal-pokemon-name").innerText=e.name,document.querySelector(".modal-pokemon-height").innerText="Height: "+e.height,document.querySelector(".modal-pokemon-img").setAttribute("src",e.imageUrl)})}function i(t){return fetch(t.detailsUrl).then(function(t){return t.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.height=e.height,t.types=e.types}).catch(function(t){console.error(t)})}return{add:e,getAll:n,addListItem:function t(e){let n=document.querySelector(".pokemon-list"),i=document.createElement("li"),r=document.createElement("button");i.classList.add("list-group-item"),r.innerText=e.name,r.classList.add("btn"),r.classList.add("btn-primary"),r.setAttribute("type","button"),r.setAttribute("data-toggle","modal"),r.setAttribute("data-target","#pokemon-modal"),r.addEventListener("click",function(){o(e)}),i.appendChild(r),n.appendChild(i)},showDetails:o,loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){e({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:i}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});