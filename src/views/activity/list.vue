<template>
    <div class="filter-list">
        <!-- <search-filter @s-params="getSenchParams"></search-filter> -->
        <div class="filter">
          <el-row>
              <el-col :span="24" style="margin-bottom:10px;">
                  <el-input
                  placeholder="搜索内容标题"
                  v-model="activityValue.search"
                  clearable
                  style="width:300px">
                  </el-input>

                  <el-select v-model="activityValue.dateTime" placeholder="请选择">
                      <el-option
                      v-for="item in activityQuery.dateTime"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>

                  <el-date-picker
                      v-model="activityValue.datePicker"
                      type="datetimerange"
                      :picker-options="activityOptions"
                      range-separator="至"
                      start-placeholder="起始日期"
                      end-placeholder="终止日期"
                      align="right">
                  </el-date-picker>
              </el-col>

              <el-col :span="24">
                  <el-select v-model="activityValue.selectStatus" placeholder="全部状态">
                      <el-option
                      v-for="item in activityQuery.selectStatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>

                  <el-select v-model="activityValue.selectOperator" placeholder="请选择">
                      <el-option
                      v-for="item in activityQuery.selectOperator"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>

                  <!-- <el-button type="text">创建日期<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                  <el-button type="text">最终修改日期<i class="el-icon-caret-bottom el-icon--right"></i></el-button> -->
                 <!--  <el-button type="text" @click="onSort('ctime')">
                    提审日期
                    <i :class="{'el-icon-caret-bottom': activityValue.stype.ctime, 'el-icon-caret-top': !activityValue.stype.ctime,  'el-icon--right': true}"></i>
                  </el-button>
                  <el-button type="text" @click="onSort('utime')">
                    发布日期
                    <i :class="{'el-icon-caret-bottom': activityValue.stype.utime, 'el-icon-caret-top': !activityValue.stype.utime, 'el-icon--right': true}"></i>
                  </el-button> -->
                  <el-button type="text" v-for="item in activityQuery.dateTime"
                  @click="materSort(activityName, item)" :key="item.value">
                   {{item.label}}
                    <i v-if="item.value == 0" :class="{'el-icon-caret-bottom': activityValue.mySort.ctime.status, 'el-icon-caret-top': !activityValue.mySort.ctime.status, 'el-icon--right': true}"></i>
                    <i v-if="item.value == 1" :class="{'el-icon-caret-bottom': activityValue.mySort.utime.status, 'el-icon-caret-top': !activityValue.mySort.utime.status, 'el-icon--right': true}"></i>
                  </el-button>
                  <el-button type="primary" @click="activitySench">确定</el-button>
              </el-col>
          </el-row>
        </div>
        <el-table
            border=""
            :data="activityDatas">
            <el-table-column prop="title" label="标题" width="180"></el-table-column>
            <!-- <el-table-column prop="source" label="来源" width="180"></el-table-column> -->
            <el-table-column prop="trialTime" label="提审时间"></el-table-column>
            <el-table-column prop="releaseTime" label="发布时间"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="operator" label="操作人"></el-table-column>
            <el-table-column label="操作">
                 <template slot-scope="scope">
                    <router-link tag="el-button"
                    class="el-button el-button--default el-button--small"
                    :to="{path:'Activitydetails',query:{id:scope.row.id, type: 1}}">
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
            :total="activityTotal">
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
    'activityValue': {
      get () {
        console.log(this.$store.state)
        return this.$store.state.activityList.activityValue
      },
      set (value) {
        this.$store.commit('UPDATA_ACTIVITYVALUE', value)
      }
    },
    ...mapGetters([
      'activityName',
      'activityQuery',
      'activityOptions',
      'activityDatas',
      'activityTotal'
    ])
  },
  created: function() {
    // 获取数据
    this.activityGetList();
    this.getStatus(this.activityName); // 获取搜索项 全部状态
    this.getOperater(this.activityName); // 获取搜索项 全部操作人
  },
  components: {
    searchFilter
  },
  methods: {
      ...mapActions([
        'getStatus',
        'activitySench',
        'activityGetList',
        'activityGetListByPage',
        'getStatus',
        'getOperater',
        'onSort'
      ]),
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.activityGetListByPage(val); // 分页查询
        // console.log(`当前页: ${val}`);
      },
      // 接受收缩参数  查询数据
      getSenchParams(value) {
        console.log("获取到的参数", value);
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
