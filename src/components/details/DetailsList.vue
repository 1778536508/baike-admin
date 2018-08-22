<template>
  <div>
    <div class="ndy-fiex"
         v-loading="loading"
         v-if="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
    </div>
    <h1>{{datas}}</h1>
    <p>-------资讯活动--------</p>

    <template>

      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <router-link
              tag="el-button"
              class="el-button el-button--success"
              :to="{
                     name: scope.row.routerName,
                     params:{

                     },
                     query: {
                      type: 2,
                      id: scope.row.id
                     }
                   }"
            >添加</router-link>
            <router-link
              tag="el-button"
              class="el-button el-button--primary"
              :to="{
                     name: scope.row.routerName,
                     params:{

                     },
                     query: {
                      type: 1,
                      id: scope.row.id
                     }
                   }"
            >编辑</router-link>
            <router-link
              tag="el-button"
              class="el-button el-button--warning"
              :to="{
                     name: scope.row.routerName,
                     params:{

                     },
                     query: {
                      type: 3,
                      id: scope.row.id
                     }
                   }"
            >查看</router-link>
            <router-link
              tag="el-button"
              class="el-button el-button--danger"
              :to="{
                     name: scope.row.routerName,
                     params:{

                     },
                     query: {
                      type: 4,
                      id: scope.row.id
                     }
                   }"
            >审核</router-link>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '资讯',
          address: '上海市普陀区金沙江路 1518 弄',
          cate: 0,
          id: 1179,
          routerName: 'Consultdetails'
        }, {
          date: '2016-05-01',
          name: '资讯',
          address: '上海市普陀区金沙江路 1519 弄',
          cate: 0,
          id: 1179,
          routerName: 'Consultdetails'
        }, {
          date: '2016-05-03',
          name: '活动',
          address: '上海市普陀区金沙江路 1516 弄',
          cate: 1,
          id: 20001,
          routerName: 'Activitydetails'
        }, {
          date: '2016-05-04',
          name: '活动',
          address: '上海市普陀区金沙江路 1517 弄',
          cate: 1,
          id: 20001,
          routerName: 'Activitydetails'
        }],
        loading: true,
        datas: this.loading
      }
    },
    mounted () {
      var _this = this
      setTimeout(function () {
        _this.loading = false
      },500)
    }
  }
</script>
<style scoped lang="less">
  .ndy-fiex {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 1;
  }
</style>
