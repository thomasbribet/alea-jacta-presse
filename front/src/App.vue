<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<style>
@import "./style/main.css";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: var(--text-color);
  background-color: var(--background-color);
}
</style>
