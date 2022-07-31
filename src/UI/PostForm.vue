<template>
  <div class="container">
    <input type="text" v-model.trim="post.title" placeholder="Title">
    <input type="text" v-model.trim="post.body" placeholder="Body">
    <button @click="addPost()">Create</button>
  </div>
</template>

<script>
export default {
    name: 'post-form',
    data(){
        return{
            post:{
                title: "",
                body: "",
                id: -1
            }
        }
    },
    methods:{
        addPost(){
            this.post.id = Date.now()
            this.$emit('create', this.post)
            this.post = {
                title: "",
                body: "",
                id: -1
            }
        }
    }
}
</script>

<style scoped>
    *{
        display: flex;
        border-radius: 3px;
    }
    .container{
        flex-direction: column;
    }
    input{
        margin: 1rem 0;
        height: 25px;
        padding: 10px 15px;
        border: solid LightSkyBlue 2px;
    }
    input::placeholder{
        color: lightgrey;
    }
    button{
        width: max-content;
        padding: 10px 15px;
        background: none;
        align-self: flex-end;
        cursor: pointer;
        border: solid LightSkyBlue 2px;
        color: gray;
    }
    button:hover{
        background: LightSkyBlue;
        color: aliceblue;
        transition-duration: 0.1s;
    }   
</style>