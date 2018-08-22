<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App"
  };
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body,
#app {
  min-width: 1200px;

  height: 100%;
}

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.sidebar {
  background-color: rgb(48, 65, 86);
    width: 200px!important;;
    position: fixed;
    top:0;
    bottom: 0;
    overflow: hidden;
}
.el-container.main {
  flex-direction: column;
}
.el-main {
  position: fixed;
  top: 50px;
  right: 0;
  bottom: 0;
  left: 200px;
  background: #fff;
  overflow: scroll;
}
</style>
