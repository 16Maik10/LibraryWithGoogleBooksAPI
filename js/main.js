"use strict"
const apiKey = 'AIzaSyDZrELY_tBXGV7M8vFVqzXmFOOcO4APmKY';

let textOfQuery = "";

const inputEl = document.querySelector('input.search__text');
const formEl = document.querySelector('form.search');
formEl.addEventListener('submit', e => {
    e.preventDefault();
    textOfQuery = inputEl.value;
    Vm.$refs.books.clearContent();
    Vm.$refs.books.getBooks();
})


const Vm = new Vue({
    el: "#app",
    components: {books},
    data: {
        show: false,
        totalItems: 0
    },
    methods:{
        getJson(url){
    return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
    }
},
});