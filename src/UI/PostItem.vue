<template>
  <div class="container">
    <div class="data-wrapper">
      <div class="data-row"><strong>Title:&nbsp;</strong>{{post.title}}</div>
      <div class="data-row"><strong>Body:&nbsp;</strong>{{post.body}}</div>
    </div>
    <button @click="remove()">Remove</button>
  </div>
</template>

<script>
export default {
    name:'post-item',
    props:{
        post: {
            type: Object,
            required: true
        }
    },
    methods: {
      remove(){
        this.$emit('remove', this.post.id)
      }  
    }
}
</script>

<style scoped>
  *{
    display: flex;
  }
  .container{
    max-width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 30px 0 30px 15px;
    border-left: solid DeepSkyBlue 5px;
    margin-bottom: 20px;
  }
  .data-wrapper{
    flex-direction: column;
    align-self: center;
    width: 80%;
  }
  .data-row{
    overflow-wrap: break-word;
  }
  button{
    display: inline-block;
    height: max-content;
    align-self: center;
    padding: 10px 15px;
    background: none;
    cursor: pointer;
    border: solid FireBrick 2px;
    color: gray;
    border-radius: 3px;
  }
  button:hover{
    color: aliceblue;
    background: firebrick;
    transition-duration: 0.1s;
  }
  
</style>