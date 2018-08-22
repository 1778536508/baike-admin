<template>
    <el-header>
        <el-dropdown>
            <span class="el-dropdown-link" >
                您好，Admin<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</template>

<script>
  import {mapGetters, mapActions } from 'vuex'
export default {
  methods:{
    // ...mapActions([
    //   'loginout',
    // ]),
    loginout(){
      window.location.href = window.location.origin +"/login";
    }
  }
}
</script>

<style>
.el-header {
    height: 50px!important;
    flex:1;
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
}
.el-dropdown {
    float: right;
}
.el-header .el-dropdown-link {
    line-height: 50px;
}
</style>
