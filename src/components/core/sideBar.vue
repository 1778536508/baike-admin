<template>
    <el-aside>
        <el-row>
            <el-col :span="24">
                <el-menu
                    default-active="/menu/material"
                    class="el-menu-vertical-demo"
                    background-color="#304156"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router>
                    <template v-for="(item, i) in navs">
                        <el-menu-item :index="item.id" v-if="!item.children">
                            <i class="el-icon-view"></i>
                            <span>{{item.name}}</span>
                        </el-menu-item>
                        <el-submenu :index="item.id" v-if="item.children">
                            <template slot="title">
                                <i class="el-icon-edit"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item-group>
                                 <el-menu-item v-for="(it, index) in item.children" :index="it.id" :key="index">
                                     {{it.name}}
                                 </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
    </el-aside>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        { id: "/menu/material", name: "抓取素材" },
        {
          id: "2",
          name: "编辑发布",
          children: [
            // { id: "/ency", name: "百科" },
            { id: "/menu/consult", name: "资讯" },
            { id: "/menu/activity", name: "活动" },
            // { id: "/activate", name: "活化馆" },
            // { id: "/museum", name: "博物馆" },
            // { id: "/local", name: "地方馆" },
            // { id: "", name: "3D馆" }
          ]
        },
        {
          id: "3",
          name: "权限管理",
          children: [
            { id: "3-1", name: "角色管理" },
            { id: "/menu/usermanage", name: "账号管理" }
          ]
        }
      ]
    };
  }
};
</script>

<style>
  .ndy-aa{
    color: #fff;
    text-decoration: none;
    /*display: block;*/
    /*width: 100%;*/
    /*height: 100%;*/
  }
</style>
