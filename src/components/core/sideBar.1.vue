<template>
    <el-aside class="sidebar" width="200px">
        <el-row>
            <el-col :span="24">
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="#304156"
                text-color="#fff"
                active-text-color="#ffd04b">
                <template v-for="nav in navs">
                    <el-menu-item :index="nav.id">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{nav.name}}</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                    </el-menu-item>
                </template>
              </el-menu>
            </el-col>
        </el-row>
      </el-aside>
</template>

<script>
export default {
  data () {
    return {
      navs:[
        {id:'1', name:'抓取素材'},
        {id:'2', name:'编辑发布',children:[
          {id:'1', name:'百科'},
          {id:'2', name:'资讯'},
          {id:'3', name:'活动'},
          {id:'4', name:'传人馆'},
          {id:'5', name:'博物馆'},
          {id:'6', name:'地方馆'},
          {id:'7', name:'3D馆'},
        ]},
        {id:'3', name:'权限管理',children:[
          {id:'1', name:'角色管理'},
          {id:'2', name:'账号管理'},
        ]},
      ]
    }
  }
};
</script>

<style>
.el-menu {
    width: 200px;;
    position: fixed;
    top:0;
    bottom: 0;
}
</style>
