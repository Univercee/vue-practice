<template>
  <div class="container" v-if="posts.length">
    <div v-for="post in posts" :key="post.id">
      <post-item :post="post" @remove="remove($event)"></post-item>
    </div>
  </div>
  <div class="container" v-else>
    <div class="empty">List is empty</div>
  </div>
</template>

<script>
export default {
    name: 'post-list',
    props:{
      posts:{
        type: Array,
        required: true
      }
    },
    methods:{
      remove(id){
        this.$emit('removePost', id)
      }
    }
    
}
</script>

<style scoped>
  *{
    display: flex;
  }
  .container{
    flex-direction: column;
  }
  .empty{
    align-self: center;
    justify-self: center;
    color: firebrick;
    font-size: 30px;
  }
</style>