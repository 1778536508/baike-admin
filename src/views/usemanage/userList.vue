<template>
<div>
  <search-filter></search-filter>
  <router-link tag="el-button"
               class="el-button el-button--success " :to="{
                     name:'User',
                     params:{
                      type: 2
                     }
                   }" style="float:right;margin-right:200px;">新增</router-link>
    <el-table
      border=""
      :data="userlist" style="margin-top:50px">
      <el-table-column prop="userId" label="账号" width="200"></el-table-column>
      <el-table-column prop="username" label="姓名" width="200"></el-table-column>
      <el-table-column prop="createdTime" label="创建日期" width="200"></el-table-column>
      <el-table-column label="状态" width="200">
        <template slot-scope="scope">
          <p v-if="scope.row.state==0">已停用</p>
          <p v-if="scope.row.state==1">已使用</p>
        </template>
      </el-table-column>
      <el-table-column prop="id" width="200" >
        <template slot-scope="scope">
          <el-button
            class="el-button el-button--primary"
            @click = "edit(scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small el-button--danger" v-if="scope.row.state==1" @click = "updateuse(scope.$index)">停用</el-button>
          <el-button size="small el-button--primary" v-if="scope.row.state==0" @click = "updateuse(scope.$index)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<el-pagination-->
    <!--@size-change="handleSizeChange"-->
    <!--@current-change="handleCurrentChange"-->
    <!--background-->
    <!--layout="total, prev, pager, next, jumper"-->
    <!--:total="1000">-->
    <!--</el-pagination>-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="total, prev, pager, next, jumper"
      :total='logintotal'>
    </el-pagination>

  </div>
</template>

<script>
  import searchFilter from "@/components/core/searchFilter";
  import {mapGetters, mapActions } from 'vuex'
  export default {
    name: "userList",
    components: {
      searchFilter,
    },
    data (){
      return {}
    },
    computed:{
      ...mapGetters([
        'userlist',
        'aosmsg',
        'logintotal',

      ])
    },
    mounted(){
        this.getlist();
    },
    methods:{
      ...mapActions([
        'getlist',
        'updateuse',
        'getuserMsg',

      ]),
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.aosmsg.pageNo =Number(`${val}`);
        console.log(this.aosmsg.pageNo);
        this.getlist()
      },

      // 接受收缩参数  查询数据
      getSenchParams(value) {
        console.log("获取到的参数", value);
      },

      edit(userdata){
       // console.log(data);
        document.cookie = "clickuserId="+userdata.id;
        window.location.href = window.location.origin+"#/menu/user/1";
        ///window.location.href = window.location.origin+"/#/user/2";
      }
    }
  }
</script>

<style scoped>

</style>
