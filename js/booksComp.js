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

const totalItems = {
  template: `<div v-show="$parent.show" class="query-total">Found {{$parent.totalItems}} results</div>`
}

const loadMoreBtn = {
  template: `<button
  class="pagination"
  v-show="this.$parent.show"
  @click="$root.$refs.books.loadMore()"
>
  Load more
</button>`
}

const books = {
    data(){
        return {
            show: false,
            searchItems: [],
            counter: 0,
            booksAPIUrl: `https://www.googleapis.com/books/v1/volumes?q=`,
            startIndex: 0,
            maxResults: 30,
            userReq: ""
        }
    },
    components: {totalItems, bookCard, loadMoreBtn},
    methods:{
        getRequest(){
          this.userReq = this.createReq();
          this.clearContent();
          this.getBooks(this.userReq);
        },
        createReq(){
          return this.booksAPIUrl +
          "=" + 
          this.$root.textOfQuery +
          (this.$root.category !== "all" ? `+subject:${this.$root.category}` : "") +
          "&orderBy=" +
          this.$root.orderBy +
          "&startIndex=" +
          this.startIndex +
          "&maxResults=" + 
          this.maxResults +
          "&key=" +
          apiKey
        },
        getBooks(url = this.userReq){
            this.$parent.getJson(url).then(data => {
                this.show = data.items;
                this.totalItems = data.totalItems;
                if(data.items){
                    data.items.forEach((el,i) => {
                        this.searchItems.push(el);  
                    })
                }
                
                }
            )
        },
        clearContent(){
            this.searchItems = [];
            this.show = false;
            this.$parent.totalItems = 0;
        },
        loadMore(){
          this.$parent.showLoading = !this.$parent.showLoading;
          this.show = false;
          this.startIndex+=this.maxResults;
          this.getBooks(this.createReq());
          
        }
      },
    updated(){
        this.$parent.showLoading = !this.$parent.showLoading;
    },
    template: `
    <div class="books">
      <total-items></total-items>
        <div class="books__items">
        <bookCard
      href="#"
      class="book-card"
      v-for="book of this.searchItems"
      :book="book"
    ></bookCard>
        </div>
    <loadMoreBtn></loadMoreBtn>
  </div>`
}
