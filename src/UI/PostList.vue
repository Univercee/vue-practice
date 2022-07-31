<template>
  <div class="container" v-if="posts.length">
  <transition-group name="post-list">
    <post-item v-for="post in posts" :key="post.id" :post="post" @remove="remove($event)"></post-item>
  </transition-group>
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
  .post-list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .post-list-enter-active, .post-list-leave-active {
    transition: all .5s;
  }
  .post-list-enter{
    opacity: .5;
    transform: translateY(30px);
  }
  .post-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>