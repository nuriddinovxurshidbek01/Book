"use strict";

function $(elemets, parent = document) {
    return parent.querySelector(elemets)
}

function fechData(url, array, funcial) {
    fetch(BESE_URL + url)
        .then(res => res.json())
        .then(data => {
            array = data;
            funcial(array.items);
        })
}