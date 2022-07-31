<template>
  <select v-model="modelValue" @change="changeOption">
    <option disabled value="">Sort field</option>
    <option v-for="option in options" :key="option.value" :value="option.value">{{option.name}}</option>
  </select>
</template>

<script>
export default {
    name:"my-filter",
    props:{
      modelValue:{
        type: String
      },
      options:{
        type: Array,
        default: []
      }
    },
    methods:{
      changeOption(event){
        this.$emit("update:modelValue", event.target.value)
      }
    }
}
</script>

<style scoped>
  select{
    border-radius: 3px;
    border-width: 2px;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-top-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-right-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-bottom-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-left-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  }
</style>