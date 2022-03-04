"use strict"
const apiKey = 'AIzaSyDZrELY_tBXGV7M8vFVqzXmFOOcO4APmKY';





const vm = new Vue({
    el: "#app",
    components: {searchForm, books},
    data: {
        textOfQuery: "",
        category: "all",
        orderBy: "relevance",
        showLoading: false,
        totalItems: 0
    },
    methods:{
        getJson(url){
    return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
    },
       
},
});