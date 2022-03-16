"use strict"






const app = new Vue({
    el: "#app",
    components: {searchForm, books, popup},
    data: {
        textOfQuery: "",
        category: "all",
        orderBy: "relevance",
        showLoading: false,
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