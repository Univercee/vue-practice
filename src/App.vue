<template>
    <div>
        <post-form @create="addPost($event)"></post-form>
        <div class="content-wrapper">
            <post-list v-if="postsAreLoaded" :posts="posts" @removePost="removePost($event)" style="margin-top: 2rem; width:100%"></post-list>
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
            postsAreLoaded: false
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
                    alert.log(err);
                })
            }, 1000)
            
        }
    },
    mounted(){
        this.fetchPosts()
    }
}
</script>

<style>
 *{
    font-size: 16px;
 }
 .content-wrapper{
    display: flex;
    justify-content: center;
 }
 .loader{
    margin-top: 3rem
 }
</style>