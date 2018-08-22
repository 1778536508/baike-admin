<template>
    <div class="filter-list">
        <!-- <search-filter @s-params="getSenchParams"></search-filter> -->
        <div class="filter">
          <el-row>
              <el-col :span="24" style="margin-bottom:10px;">
                  <el-input
                  placeholder="搜索内容标题"
                  v-model="materialValue.search"
                  clearable
                  style="width:300px">
                  </el-input>

                  <el-select v-model="materialValue.dateTime" placeholder="请选择">
                      <el-option
                      v-for="item in materialQuery.dateTime"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>

                  <el-date-picker
                      v-model="materialValue.datePicker"
                      type="datetimerange"
                      :picker-options="materialOptions"
                      range-separator="至"
                      start-placeholder="起始日期"
                      end-placeholder="终止日期"
                      align="right">
                  </el-date-picker>
              </el-col>

              <el-col :span="24">
                  <el-select v-model="materialValue.selectSource" placeholder="请选择">
                      <el-option
                      v-for="item in materialQuery.selectSource"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>

                  <el-select v-model="materialValue.selectOperator" placeholder="请选择">
                      <el-option
                      v-for="item in materialQuery.selectOperator"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                  <el-button type="text" v-for="item in materialQuery.dateTime" 
                  @click="materSort(materialName, item)" :key="item.value">
                   {{item.label}}
                    <i v-if="item.value == 0" :class="{'el-icon-caret-bottom': materialValue.mySort.ctime.status, 'el-icon-caret-top': !materialValue.mySort.ctime.status, 'el-icon--right': true}"></i>
                    <i v-if="item.value == 1" :class="{'el-icon-caret-bottom': materialValue.mySort.utime.status, 'el-icon-caret-top': !materialValue.mySort.utime.status, 'el-icon--right': true}"></i>
                  </el-button>
                  <el-button type="primary" @click="materialSench">确定</el-button>
              </el-col>
          </el-row>
        </div>
        <el-table
            border=""
            :data="materialDatas">
            <el-table-column prop="title" label="标题" width="180"></el-table-column>
            <el-table-column prop="source" label="来源" width="180"></el-table-column>
            <el-table-column prop="createdTime" label="创建日期"></el-table-column>
            <el-table-column prop="updateTime" label="最终修改日期"></el-table-column>
            <el-table-column prop="operator" label="操作人"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <router-link v-if="scope.row.type == 0" tag="el-button"
                  class="el-button el-button--default el-button--small"
                  :to="{path: 'Consultdetails',query:{id:scope.row.id, type: 3}}">
                   查看
                </router-link>
                <router-link v-if="scope.row.type == 0" tag="el-button"
                  class="el-button el-button--primary el-button--small"
                  :to="{path:'Consultdetails',query:{id:scope.row.id, type: 1}}">
                   编辑
                </router-link>
                <router-link  v-if="scope.row.type == 1" tag="el-button"
                  class="el-button el-button--default el-button--small"
                  :to="{path: 'Activitydetails',query:{id:scope.row.id, type: 3}}">
                   查看
                </router-link>
                <router-link v-if="scope.row.type == 1" tag="el-button"
                  class="el-button el-button--primary el-button--small"
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
            :total="materialTotal">
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
    'materialValue': {
      get () {
        console.log(this.$store.state)
        return this.$store.state.materialList.materialValue
      },
      set (value) {
        this.$store.commit('UPDATA_MATERIAVALUE', value)
      }
    },
    ...mapGetters([
      'materialName',
      'materialQuery',
      'materialOptions',
      'materialDatas',
      'materialTotal'
    ])
  },
  created: function() {
    this.materialGetList(); // 获取数据
    this.getSource(this.materialName); // 获取全部来源
    this.getDateTerm(this.materialName); // 获取到时间查询
    this.getOperater(this.materialName); // 获取搜索项 全部操作人
  },
  components: {
    searchFilter
  },
  methods: {
      ...mapActions([
        'materialSench',
        'materialGetList',
        'materialGetListByPage',
        'getOperater',
        'getSource',
        'getDateTerm',
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
        this.materialGetListByPage(val);
        // console.log(`当前页: ${val}`);
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
