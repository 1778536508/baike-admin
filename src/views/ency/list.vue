<template>
    <div class="filter-list">
        <!-- <search-filter @s-params="getSenchParams"></search-filter> -->
        <div class="filter">
          <el-row>
              <el-col :span="24" style="margin-bottom:10px;">
                  <el-input
                  placeholder="搜索内容标题"
                  v-model="value.search"
                  clearable
                  style="width:300px">
                  </el-input>
                  
                  <el-select v-model="value.dateTime" placeholder="请选择">
                      <el-option
                      v-for="item in list.dateTime"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>

                  <el-date-picker
                      v-model="value.datePicker"
                      type="datetimerange"
                      :picker-options="pickerOptions"
                      range-separator="至"
                      start-placeholder="起始日期"
                      end-placeholder="终止日期"
                      align="right">
                  </el-date-picker>
              </el-col>

              <el-col :span="24">
                  <el-select v-model="value.selectSource" placeholder="请选择">
                      <el-option
                      v-for="item in list.selectSource"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>

                  <el-select v-model="value.operator" placeholder="请选择">
                      <el-option
                      v-for="item in list.operator"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>

                  <!-- <el-button type="text">创建日期<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                  <el-button type="text">最终修改日期<i class="el-icon-caret-bottom el-icon--right"></i></el-button> -->
                  <el-button type="text" @click="onSort('ctime')">
                    创建日期
                    <i :class="{'el-icon-caret-bottom': value.stype.ctime, 'el-icon-caret-top': !value.stype.ctime,  'el-icon--right': true}"></i>
                  </el-button>
                  <el-button type="text" @click="onSort('utime')">
                    最终修改日期
                    <i :class="{'el-icon-caret-bottom': value.stype.utime, 'el-icon-caret-top': !value.stype.utime, 'el-icon--right': true}"></i>
                  </el-button>
                  <el-button type="primary" @click="onSench">确定</el-button>
              </el-col>
          </el-row>
        </div>
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
import {mapGetters, mapActions} from 'vuex'
// import $config from '$config'
export default {
  computed: {
    ...mapGetters([
      'list',
      'value',
      'pickerOptions',
      'tableData'
    ])
  },
  data() {
    return {
      
    };
  },
  created: function() {
    const config = $config.default.config; // 获取通用配置
    console.log(" ... ", config)
  },
  components: {
    searchFilter
  },
  methods: {
      ...mapActions([
        'onSench',
        'onSort',
        'getPageNum'
      ]),
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        var str = `当前页: ${val}`;
        this.getPageNum(str)
      },

      // 接受收缩参数  查询数据
      getSenchParams(value) {
        console.log("获取到的参数", value);
      },
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
