const searchForm = {
    template: `<form action="#" class="search" @submit.prevent="$root.$refs.books.getRequest()">
    <div class="search__query">
    <input type="text" class="search__text" v-model="$root.textOfQuery"/>
      <button type="submit" class="search__submit"></button>
    </div>
    <div class="search__filters">
      <label for="category" class="search__label">Categories</label>
      <select v-model="$root.category" name="category" id="category" class="search__select">
        <option disabled value="">all</option>
        <option value="all">all</option>
        <option value="art">art</option>
        <option value="biography">biography</option>
        <option value="computers">computers</option>
        <option value="history">history</option>
        <option value="medical">medical</option>
        <option value="poetry">poetry</option>
      </select>
      <label for="sort" class="search__label">Sorting by</label>
      <select v-model="$root.orderBy" name="sort" id="sort" class="search__select">
      <option disabled value="">relevance</option>
        <option value="relevance">relevance</option>
        <option value="newest">newest</option>
      </select>
    </div>
  </form>`
}