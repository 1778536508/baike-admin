<template>
    <div class="filter-list">
        <!-- <search-filter @s-params="getSenchParams"></search-filter> -->
        <div class="filter">
          <el-row>
              <el-col :span="24" style="margin-bottom:10px;">
                  <el-input
                  placeholder="搜索内容标题"
                  v-model="consultValue.search"
                  clearable
                  style="width:300px">
                  </el-input>

                  <el-select v-model="consultValue.dateTime" placeholder="请选择">
                      <el-option
                      v-for="item in consultQuery.dateTime"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>

                  <el-date-picker
                      v-model="consultValue.datePicker"
                      type="datetimerange"
                      :picker-options="consultOptions"
                      range-separator="至"
                      start-placeholder="起始日期"
                      end-placeholder="终止日期"
                      align="right">
                  </el-date-picker>
              </el-col>

              <el-col :span="24">
                 <el-select v-model="consultValue.selectChannel" placeholder="全部频道">
                      <el-option
                      v-for="item in consultQuery.selectChannel"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>

                  <el-select v-model="consultValue.selectStatus" placeholder="全部状态">
                      <el-option
                      v-for="item in consultQuery.selectStatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>

                  <el-select v-model="consultValue.selectOperator" placeholder="全部操作人">
                      <el-option
                      v-for="item in consultQuery.selectOperator"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                  <el-button type="text" v-for="item in consultQuery.dateTime"
                  @click="materSort(consultName, item)" :key="item.value">
                   {{item.label}}
                    <i v-if="item.value == 0" :class="{'el-icon-caret-bottom': consultValue.mySort.ctime.status, 'el-icon-caret-top': !consultValue.mySort.ctime.status, 'el-icon--right': true}"></i>
                    <i v-if="item.value == 1" :class="{'el-icon-caret-bottom': consultValue.mySort.utime.status, 'el-icon-caret-top': !consultValue.mySort.utime.status, 'el-icon--right': true}"></i>
                  </el-button>
                  <el-button type="primary" @click="consultSench">搜索</el-button>
              </el-col>
          </el-row>
        </div>
        <el-table
            border=""
            :data="consultDatas">
            <el-table-column prop="title" label="标题" width="180"></el-table-column>
            <el-table-column prop="channel" label="频道" width="180"></el-table-column>
            <el-table-column prop="trialTime" label="提审日期"></el-table-column>
            <el-table-column prop="releaseTime" label="发布日期"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="operator" label="操作人"></el-table-column>
            <el-table-column label="操作">
                 <template slot-scope="scope">
                  <router-link v-if="scope.row.statusCode == 3" tag="el-button"
                  class="el-button el-button--default el-button--small"
                  :to="{path:'Consultdetails',query:{id:scope.row.id, type: 4}}">
                   审核
                  </router-link>
                  <router-link v-else tag="el-button"
                  class="el-button el-button--primary el-button--small"
                  :to="{path:'Consultdetails',query:{id:scope.row.id, type: 1}}">
                   编辑
                  </router-link>
                 </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout="total, prev, pager, next, jumper"
            :total="consultTotal">
        </el-pagination>
    </div>
</template>

<script>
import searchFilter from "@/components/core/searchFilter";
import {mapGetters, mapActions} from 'vuex'
export default {
  data() {
    return {};
  },
  computed: {
    'consultValue': {
      get () {
        console.log(this.$store.state)
        return this.$store.state.consultList.consultValue
      },
      set (value) {
        this.$store.commit('UPDATA_CONSULTVALUE', value)
      }
    },
    ...mapGetters([
      'consultName',
      'consultQuery',
      'consultOptions',
      'consultDatas',
      'consultTotal'
    ])
  },
  created: function() {
    this.getChannel(this.consultName); // 获取搜索项 全部频道
    this.getStatus(this.consultName); // 获取搜索项 全部状态
    this.getOperater(this.consultName); // 获取搜索项 全部操作人
    this.consultGetList(); // 获取数据
  },
  components: {
    searchFilter
  },
  methods: {
      ...mapActions([
        'consultSench',
        'consultGetList',
        'consultGetListByPage',
        'getChannel',
        'getStatus',
        'getOperater',
        'onSort'
      ]),
      // 跳转查看
      toSee(row, url) {
        console.log("id --- >", row.id, url);
      },

      // 跳转编辑
      toEdit(row, url) {
        console.log("id --- >", row.id, url);
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
        this.consultGetListByPage(val); // 分页查询
      },

      materSort(name, sort) {
        var obj = {};
        obj['name'] = name;
        obj['sort'] = sort;
        this.onSort(obj);
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
