const bookCard = {
    props: ['book'],
    template: `<a
    href="#"
    class="book-card"
    :key="book.id"
    :id="book.id"
  >
    <img
      class="book-card__img"
      v-if="book.volumeInfo.imageLinks"
      :src="book.volumeInfo.imageLinks.thumbnail"
      alt=""
      width="128"
      height="210"
    />
    <img
      class="book-card__img"
      v-else="book.volumeInfo.imageLinks"
      src="https://books.google.ru/googlebooks/images/no_cover_thumb.gif"
      alt=""
      width="128"
      height="210"
    />
    <div class="book-card__desc">
      <p v-if="book.volumeInfo.categories" class="book-card__category">
        {{book.volumeInfo.categories[0]}}
      </p>
      <p v-if="book.volumeInfo.title" class="book-card__title">
        {{book.volumeInfo.title}}
      </p>
      <p v-if="book.volumeInfo.authors" class="book-card__authors">
        {{book.volumeInfo.authors.join(', ')}}
      </p>
    </div>
  </a>`
}

const books = {
    data(){
        return {
            searchItems: [],
            startIndex: 0,
            maxResults: 30,
            booksAPIUrl: `https://www.googleapis.com/books/v1/volumes?q=`,
        }
    },
    components: {bookCard},
    methods:{
        createReq(){
            return this.booksAPIUrl +
            "=" + 
            textOfQuery + 
            "&startIndex=" +
            this.startIndex +
            "&maxResults=" + 
            this.maxResults +
            "&key=" +
            apiKey
        },
        getBooks(url = this.createReq()){
            this.$parent.getJson(url).then(data => {
                this.$parent.show = data.items;
                this.$root.totalItems = data.totalItems;
                if(data.items){
                    data.items.forEach(el => this.searchItems.push(el))
                }
                this.startIndex+=this.maxResults;
                }
            )
        },
        clearContent(){
            this.searchItems = [];
        }
    },
    /* mounted(){
        this.finalReq = this.createReq();
        this.$parent.getJson(this.finalReq).then(data => {
            this.getBooks();
            this.$root.totalItems = data.totalItems;
            this.$root.show = !this.$root.show;
            //this.startIndex+=29;
            }
        )
    }, */
    updated(){
        console.log(`Построил`);
    },
    template: `
    <div class="books">
    <bookCard
      href="#"
      class="book-card"
      v-for="book of this.searchItems"
      :book="book"
    ></bookCard>
  </div>`
}
