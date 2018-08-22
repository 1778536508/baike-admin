<template>
    <div class="filter-list">
        <search-filter @s-params="getSenchParams"></search-filter>
        <el-table
            border=""
            :data="tableData">
            <el-table-column prop="title" label="标题" width="180"></el-table-column>
            <el-table-column prop="source" label="来源" width="180"></el-table-column>
            <el-table-column prop="createdTime" label="创建日期"></el-table-column>
            <el-table-column prop="editedTime" label="最终修改日期"></el-table-column>
            <el-table-column prop="operator" label="操作人"></el-table-column>
            <el-table-column label="操作">
                 <template slot-scope="scope">
                    <el-button size="small">查看</el-button>
                    <el-button type="primary" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout="total, prev, pager, next, jumper"
            :total="1000">
        </el-pagination>

    </div>
</template>

<script>
import searchFilter from "@/components/core/searchFilter";
export default {
  data() {
    return {
      tableData: [
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          title: "非遗“双创”正当时",
          source: "新环网",
          createdTime: "2016-05-03",
          editedTime: "2016-07-03",
          operator: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  components: {
    searchFilter
  },
  methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

      // 接受收缩参数  查询数据
      getSenchParams(value) {
        console.log("获取到的参数", value);
      }
  }
};
</script>

<style>
.el-table {
  margin: 20px 0;
}
.el-button--small {
  padding: 6px 10px;
  float: left;
}
.el-pagination {
    text-align: center;
}
</style>
