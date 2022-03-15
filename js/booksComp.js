const popup = {
  template: 
  /*html*/
  `
      <div class="popup-wrapper" ref="popupWrapper">
        <div class="popup">
        <div class="popup__content">
          <slot></slot>
        </div> 
        </div>
      <div>
  `,
  methods: {
    closePopup() {
      this.$emit('closePopup');
    }
  },
  mounted(){
    let vm = this;
    document.addEventListener('click', e => {
      if(e.target === this.$refs.popupWrapper){
        vm.closePopup();
      }
    })
  }
}

const bookCard = {
    props: ['book'],
    data(){
      return {
        isInfo: false
      }
    },
    components: {popup},
    template: 
    /*html*/ 
    `<div
    class="book-card"
    :key="book.id"
    :id="book.id"
    @click="showPopup"
  >
    <popup 
      v-if="this.isInfo"
      @closePopup="closePopup"
      >
      <img width="128"
      height="210" :src="book.volumeInfo.imageLinks.thumbnail"/>
      <p v-if="book.volumeInfo.title" class="book-card__title">
        {{book.volumeInfo.title}}
      </p>
      <p v-if="book.volumeInfo.categories" class="book-card__category">
    {{book.volumeInfo.categories.join(' / ')}}
      </p>
      <p v-if="book.volumeInfo.authors" class="book-card__authors">
        {{book.volumeInfo.authors.join(', ')}}
      </p>

      <p v-if="book.volumeInfo.description" class="popup__description">
        {{book.volumeInfo.description}}
      </p>
      <a class="popup__link" target="_blank" :href="book.volumeInfo.infoLink"> Перейти на страницу книги </a>
    </popup>
    

    <img
      class="book-card__img"
      v-if="book.volumeInfo.imageLinks"
      :src="book.volumeInfo.imageLinks.thumbnail"
      alt="photo of book"
      width="128"
      height="210"
    />
    <img
      class="book-card__img"
      v-else="book.volumeInfo.imageLinks"
      src="https://books.google.ru/googlebooks/images/no_cover_thumb.gif"
      alt="default img of book"
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
    
  </div>`,
  methods: {
    showPopup(){
      this.isInfo = !this.isInfo;
    },
    closePopup(){
      this.isInfo = false;
    }
  }
}

const totalItems = {
  template: 
  /*html*/ 
  `<div v-show="$parent.showBooksBtns" class="query-total">Found {{$parent.totalItems}} results</div>`
}

const loadMoreBtn = {
  template: 
  /*html*/ 
  `<button
  class="pagination"
  v-show="this.$parent.showBooksBtns"
  @click="updateBooks"
>
  Load more
</button>`,
methods: {
  updateBooks(){
    this.$emit('load-more');
  }
}
}

const books = {
    data(){
        return {
            showBooksBtns: false,
            searchItems: [],
            counter: 0,
            booksAPIUrl: `https://www.googleapis.com/books/v1/volumes?q=`,
            startIndex: 0,
            maxResults: 30
        }
    },
    components: {totalItems, bookCard, loadMoreBtn},
    methods:{
        sendRequest(){
          this.clearContent();
          this.getBooks();
        },
        getBooks(url = this.userQuery){
            this.$parent.getJson(url).then(data => {
            this.showBooksBtns = data.items;
            this.totalItems = data.totalItems;
            if(data.items){
                data.items.forEach((el,i) => {
                    this.searchItems.push(el);  
                })
            } else if(this.searchItems.length){
              this.$parent.showLoading = !this.$parent.showLoading;
              alert('Это все найденные книги по вашему запросу');
            } else{
              this.$parent.showLoading = !this.$parent.showLoading;
            alert('К сожалению, по вашему запросу ничего не найдено');
            }
                
        })
        },
        clearContent(){
            this.searchItems = [];
            this.showBooksBtns = false;
            this.$parent.totalItems = 0;
        },
        loadMore(){
          this.$parent.showLoading = !this.$parent.showLoading;
          this.showBooksBtns = false;
          this.startIndex+=this.maxResults;
          this.getBooks();
          
        }
      },
      computed:{
        userQuery(){
          return this.booksAPIUrl + 
          this.$root.textOfQuery +
          (this.$root.category !== "all" ? `+subject:${this.$root.category}` : "") +
          "&orderBy=" +
          this.$root.orderBy +
          "&startIndex=" +
          this.startIndex +
          "&maxResults=" + 
          this.maxResults
        }
      },
    updated(){
      console.log('updated');
        this.$parent.showLoading = !this.$parent.showLoading;
    },
    template: 
    /*html*/ 
    `
    <div class="books">
      <total-items></total-items>
        <div class="books__items">
        <book-card
      v-for="book of this.searchItems"
      :book="book"
    ></book-card>
        </div>
    <load-more-btn @load-more="loadMore"></load-more-btn>
  </div>`
}
