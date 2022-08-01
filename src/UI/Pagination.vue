<template>
  <div class="container">
    <div
      v-for="page in totalPages"
      :key="page"
      @click="setPage(page)"
      :class="{ item: true, active: page == activePage }"
    >
      {{ page }}
    </div>
  </div>
</template>

<script>
export default {
  name: "my-pagination",
  data() {
    return {
      activePage: 1,
    };
  },
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    setPage(page) {
      this.activePage = page;
      this.$emit("update:page", page);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.item {
  border: solid LightSkyBlue 3px;
  color: gray;
  cursor: pointer;
  width: max-content;
  padding: 3px 5px;
  margin: 0 5px;
}
.item:hover {
  background: LightSkyBlue;
  color: aliceblue;
  transition-duration: 0.1s;
}
.active {
  background: LightSkyBlue;
  color: aliceblue;
  transition-duration: 0.1s;
}
</style>
