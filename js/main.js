"use strict";

let BESE_URL = "https://www.googleapis.com/books"
let wrapper = document.querySelector(".wrapperBooks");
let praduct = [];
let searchArray = [];
let bookArray = [];
fechData('/v1/volumes?q=t', praduct, renderUi)
    // ======================================RenderUi  function====================================

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
        fetch(BESE_URL + '/v1/volumes?q=t').then(res => res.json()).then(data => {
            searchArray = data.items;
            let newItem = searchArray.filter(item => {
                return item.volumeInfo.title.includes(value);
            })
            renderUi(newItem);
        })
    })
}
// ======================================RenderUi  end====================================

// ======================================More Info function====================================

// let elBeck = $(".back")
// console.log(elBeck);
// elBeck.addEventListener("click", evt => {
//     $(".module").document.style.display = "none";
// })

// let elBtnInfo = $(".logout")
// elBtnInfo.addEventListener("click", evt => {
//     evt.preventDefault();
//     document.$(".module").style.background = "black";
// })
let bookmarks = []

fechData('/v1/volumes?q=t', bookArray, renderUi)

fetch(BESE_URL + '/v1/volumes?q=t').then(res => res.json()).then(data => {
    bookArray = data.items;
})

wrapper.addEventListener("click", evt => {
    $(".bookmark").innerHTML = `<h3 class="title">Bookmarks</h3>
    <p class="text">If you don’t like to read, you haven’t found the right book</p>`;
    if (evt.target.classList.contains("bookmarkLink")) {
        let id = evt.target.getAttribute("data-id");
        console.log(id);
        const select = bookArray.filter((elm) => elm.id === id)[0];
        if (!bookmarks.includes(select)) {
            bookmarks.push(select);
        }
    }
    console.log(bookmarks);
    getBookmarks(bookmarks);
})

let bookmarkWrapper = $(".bookmark");
bookmarkWrapper.addEventListener("click", evt => {
    if (evt.target.classList.contains("deliet")) {
        let id = evt.target.getAttribute("data-id");
        console.log(id);
        let filterBokmark = bookmarks.filter((elm) => {
            return elm.id !== id
        })
        console.log(filterBokmark);
    }
    getBookmarks(filterBokmark)
})


function getBookmarks(data) {
    let bookmarkS = $(".bookmark")
    data.forEach(item => {
        let box = document.createElement("div");
        box.setAttribute("class", "box mt-3");
        box.innerHTML = `       
            <div class="info">
                <h4> ${item.volumeInfo.title.slice(0,20)}</h4>
                <p> ${item.volumeInfo.authors.splice(0,1)}</p>
            </div>
            <div class="links">
                <a href="#" class="books d-block mt-1 px-1"><img src="./images/biik.svg" alt="book"></a>
                <button class="btn deliet mt-2" data-id="${item.id}"><img src="./images/delete 1.svg" alt="deliet"></button>
            </div>    
        `
        console.log(box);
        bookmarkS.append(box);
    })
}