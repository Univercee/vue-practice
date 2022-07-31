<template>
  <div>
    <input type="text" v-model="modelValue" @change="changeQuery" placeholder="Serach">
  </div>
</template>

<script>
export default {
    name: "list-search",
    props:{
      modelValue:{
        type: String
      }
    },
    methods:{
      changeQuery(event){
        this.$emit('update:modelValue', event.target.value.toLowerCase())
      }
    }
}
</script>

<style scoped>
  input{
    padding: 10px 15px;
    border-radius: 3px;
  }
</style>