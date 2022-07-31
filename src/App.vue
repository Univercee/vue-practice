<template>
    <div class="app-container">
        <post-form @create="addPost($event)"></post-form>
        <div class="content-wrapper">
            <div v-if="postsAreLoaded" class="list-wrapper">
                <div class="list-header">
                    <list-search class="my-list-search" @update="find($event)" v-model="searchQuery"></list-search>
                    <my-filter class="my-filter" @update="sortBy($event)" v-model="sortOprion" :options="sortOptions"></my-filter>
                </div>
                <post-list :posts="sortedAndFoundPosts" @removePost="removePost($event)" style="margin-top: 2rem; width:100%"></post-list>
            </div>
            <load-icon v-else class="loader"></load-icon>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            posts: [],
            postsAreLoaded: false,
            sortOprion: "",
            searchQuery:"",
            sortOptions: [
                {value: "title", name: "By title"},
                {value: "body", name: "By content"},
                {value: "id", name: "Default"}
            ]
        }
    },
    methods: {
        addPost(post){
            this.posts.push(post)
        },
        removePost(id){
            this.posts = this.posts.filter((item)=>{
                return item.id != id
            })
        },
        async fetchPosts(){
            setTimeout(async ()=>{
                await axios.get("https://my-json-server.typicode.com/Univercee/jsonplaceholder/posts")
                .then((response)=>{
                    this.postsAreLoaded = true
                    this.posts = response.data
                })
                .catch((err)=>{
                    alert(err);
                })
            }, 0)
            
        }
    },
    mounted(){
        this.fetchPosts()
    },
    computed:{
        sortedPosts(){
            return [...this.posts].sort((a, b)=>{
                return a[this.sortOprion] > b[this.sortOprion] ? 1 : (a[this.sortOprion] < b[this.sortOprion] ? -1 : 0)
            })
        },
        sortedAndFoundPosts(){
            return this.sortedPosts.filter((post)=>{
                return post.title.toLowerCase().includes(this.searchQuery)
            })
        }
    }
}
</script>

<style>
 *{
    font-size: 16px;
    font-family: sans-serif;
 }
 .app-container{
    margin: 3% 20% 0 20%;
 }
 .content-wrapper{
    display: flex;
    justify-content: center;
    margin-top: 3rem;
 }
 .list-wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
 }
 .list-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
 }
 .my-list-search{
    align-self: center;
    width: 25%;
 }
 .my-filter{
    align-self: center;
    width: 25%;
    padding: 10px 15px;
 }
</style>