<template>
  <div class="app-container">
    <post-form @create="addPost($event)"></post-form>
    <div class="content-wrapper">
      <div v-if="postsAreLoaded" class="list-wrapper">
        <my-pagination
          :totalPages="totalPages"
          @update:page="updatePage($event)"
          class="my-pagination"
        ></my-pagination>
        <div class="list-header">
          <list-search
            class="my-list-search"
            v-model="searchQuery"
          ></list-search>
          <my-filter
            class="my-filter"
            @update="sortBy($event)"
            v-model="sortOprion"
            :options="sortOptions"
          ></my-filter>
        </div>
        <post-list
          :posts="paginatedPosts"
          @removePost="removePost($event)"
          style="margin-top: 2rem; width: 100%"
        ></post-list>
      </div>
      <load-icon v-else class="loader"></load-icon>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      posts: [],
      postsAreLoaded: false,
      sortOprion: "",
      searchQuery: "",
      totalPages: 1,
      page: 1,
      limit: 10,
      sortOptions: [
        { value: "title", name: "By title" },
        { value: "body", name: "By content" },
        { value: "id", name: "Default" },
      ],
    };
  },
  methods: {
    addPost(post) {
      this.posts.push(post);
    },
    removePost(id) {
      this.posts = this.posts.filter((item) => {
        return item.id != id;
      });
    },
    updatePage(page) {
      this.page = page;
    },
    async fetchPosts() {
      this.postsAreLoaded = false;
      setTimeout(async () => {
        await axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then((response) => {
            this.postsAreLoaded = true;
            this.posts = response.data;
          })
          .catch((err) => {
            alert(err);
          });
      }, 0);
    },
  },
  mounted() {
    this.fetchPosts();
  },
  watch:{
    sortedAndFoundPosts:{
      handler(newVal, oldVal){
        this.totalPages = Math.ceil(newVal.length / this.limit);
      },
      deep: true
    },
    
  },
  computed: {
    sortedPosts() {
      return this.posts.sort((a, b) => {
        return a[this.sortOprion] > b[this.sortOprion] ? 1 : a[this.sortOprion] < b[this.sortOprion] ? -1 : 0;
      });
    },
    sortedAndFoundPosts() {
      return this.sortedPosts.filter((post) => {
        return post.title.toLowerCase().includes(this.searchQuery);
      });
    },
    paginatedPosts() {
      return this.sortedAndFoundPosts.slice((this.page - 1) * this.limit, this.page * this.limit);
    },
  },
};
</script>

<style>
* {
  font-size: 16px;
  font-family: sans-serif;
}
.app-container {
  margin: 3% 20% 0 20%;
}
.content-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}
.list-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.list-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.my-list-search {
  align-self: center;
  width: 25%;
}
.my-filter {
  align-self: center;
  width: 25%;
  padding: 10px 15px;
}
.my-pagination {
  margin-bottom: 2rem;
}
</style>
