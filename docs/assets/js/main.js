"use strict";const inputElement=document.querySelector(".js-input"),btnSearch=document.querySelector(".js-searchBtn"),listElement=document.querySelector(".js-list"),favElement=document.querySelector(".js-favContainer"),btnReset=document.querySelector(".js-resetBtn"),searchPrevent=document.querySelector(".js-form");function handleForm(e){e.preventDefault()}searchPrevent.addEventListener("submit",handleForm);let shows=[],favorites=[];function handleGetToApi(){const e=inputElement.value.toLowerCase();fetch("//api.tvmaze.com/search/shows?q="+e).then(e=>e.json()).then(e=>{shows=e.map(e=>e.show),paintSeries()})}function paintSeries(){let e="";for(const t of shows){let i=getImageShow(t);if(isValidSerie(t)){let n,s;n=findIdInArrayOfObjets(t.id,favorites)?"fav":" ",s=null!==t.rating.average?"Puntuación: "+t.rating.average:"No tiene puntuación",e+=`<li class="previewSerie js-series ${n}" id="${t.id}">`,e+=`<h3 class="previewSerie__title js-serieTitle">${t.name}</h3>`,e+=`<img class="previewSerie__img js-serieImg" src="${i}" class="">`,e+=`<p class = "previewSerie__average"> ${s}</p>`,e+="</li>"}}listElement.innerHTML=e,listenSeriesEvent()}function isValidSerie(e){const t=inputElement.value.toLowerCase();return e.name.toLowerCase().includes(t)}function findIdInArrayOfObjets(e,t){for(let i=0;i<t.length;i++)if(t[i].id===e)return!0}function getImageShow(e){return null===e.image?"https://via.placeholder.com/210x295/ffffff/666666/?text="+e.name:e.image.medium}function listenSeriesEvent(){const e=document.querySelectorAll(".js-series");for(const t of e)t.addEventListener("click",handleFavorite)}function handleFavorite(e){const t=parseInt(e.currentTarget.id),i=favorites.findIndex(e=>e.id===t),n=shows.findIndex(e=>e.id===t);-1!==i?favorites.splice(i,1):favorites.push(shows[n]),paintFavorites(),paintSeries(),setInLocalStorage()}function paintFavorites(){let e="";e+='<ul class = "favSerie">';for(const t of favorites){let i=getImageShow(t);e+=`<li class="favSerie-list js-favSeries" id="${t.id}">`,e+=`<h3 class="favSerie-list__title js-favSerieTitle">${t.name}</h3>`,e+=`<img class="favSerie-list__img js-favSerieImg" src="${i}" class="">`,e+="</li>"}e+="</ul>",favElement.innerHTML=e,listenFavEvent()}function setInLocalStorage(){const e=JSON.stringify(favorites);localStorage.setItem("favorites",e)}function getFromLocalStorage(){const e=localStorage.getItem("favorites");if(null!==e){const t=JSON.parse(e);favorites=t,paintFavorites()}}function resetAllFavoriteList(){favorites=[],paintSeries(),paintFavorites(),setInLocalStorage()}function listenFavEvent(){const e=document.querySelectorAll(".js-favSeries");for(const t of e)t.addEventListener("click",resetEachFavorite)}function resetEachFavorite(e){const t=parseInt(e.currentTarget.id),i=favorites.findIndex(e=>e.id===t);-1!==i&&favorites.splice(i,1),paintFavorites(),paintSeries(),setInLocalStorage()}btnSearch.addEventListener("click",handleGetToApi),getFromLocalStorage(),btnReset.addEventListener("click",resetAllFavoriteList);