<template>
    <div class="app-container">
        <post-form @create="addPost($event)"></post-form>
        <div class="content-wrapper">
            <div v-if="postsAreLoaded" class="list-wrapper">
                <my-filter class="my-filter" @update="sortBy($event)" v-model="sortOprion" :options="sortOptions"></my-filter>
                <post-list :posts="posts" @removePost="removePost($event)" style="margin-top: 2rem; width:100%"></post-list>
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
    watch:{
        sortOprion(newVal, oldVal){
            this.posts.sort((a, b)=>{
                return a[newVal] > b[newVal] ? 1 : (a[newVal] < b[newVal] ? -1 : 0)
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
 .my-filter{
    align-self: flex-end;
    width: 25%;
    padding: 10px 15px;
 }
</style>