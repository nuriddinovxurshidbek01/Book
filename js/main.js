"use strict";

let BESE_URL = "https://www.googleapis.com/books"
let wrapper = document.querySelector(".wrapperBooks");
let praduct = [];
let searchArray = [];
fechData('/v1/volumes?q=t', praduct, renderUi)

function renderUi(array) {
    array.forEach(item => {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        card.innerHTML = `
             <div class="mainImage">
                <img src="${item.volumeInfo.imageLinks.thumbnail}" alt="books" class="imgBook ">
             </div>
             <h5 class="cardTitle mt-2" title="${item.volumeInfo.title}">${item.volumeInfo.title.slice(0,17)}. . .</h5>
             <p class="cardText mt-0" title="${item.volumeInfo.authors}">${item.volumeInfo.authors.splice(0,1)} <br> ${item.volumeInfo.publishedDate.slice(0,4)}</p>
             <div class="bookses d-flex justify-content-between">
               <button class="bookmarkLink" data-id="${item.id}">Bookmark</button>
               <button class="moreInfo" data-id="${item.id}">More Info</button>
            </div>
            <a href="${item.volumeInfo.previewLink}" target="_blank" class="bookReading">Read</a>
        `
        wrapper.append(card)
    })
}

fechData('/v1/volumes?q=t', searchArray, searchFun)

function searchFun() {
    let elSearch = $(".mainSearch")
    elSearch.addEventListener("keyup", evt => {
        evt.preventDefault();
        wrapper.innerHTML = " ";
        let value = evt.target.value;
        console.log(value);
        fetch(BESE_URL + '/v1/volumes?q=t').then(res => res.json()).then(data => {
            searchArray = data.items;
            let newItem = searchArray.filter(item => {
                return item.volumeInfo.title.includes(value);
            })
            console.log(newItem);
            renderUi(newItem);
        })
    })
}