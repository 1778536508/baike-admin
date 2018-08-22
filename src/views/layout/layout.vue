<template>
  <div id="app">
    <div class="app-wrapper">
        <el-container>
            <sidebar class="sidebar"></sidebar>
            <el-container class="main">
                <el-col :span="24">
                    <heador></heador>
                </el-col>
                <el-col :span="24">
                    <el-main>
                        <router-view/>
                    </el-main>
                </el-col>
            </el-container>
        </el-container>
    </div>
  </div>
</template>

<script>
import sidebar from "../../components/core/sideBar";
import heador from "../../components/core/header";

export default {
  name: "App",
  components: {
    sidebar,
    heador,
  },
  data (){
    return {
      iflogin: true,
    }
  },
  methods:{


  },
  mounted (){


  }
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
