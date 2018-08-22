<template>
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
</template>

<script>
export default {
  data() {
    return {
      list: {
        dateTime: [
          {
            value: "0",
            label: "创建日期"
          },
          {
            value: "1",
            label: "最终修改日期"
          }
        ],
        selectSource: [
          {
            value: "0",
            label: "全部来源"
          },
          {
            value: "1",
            label: "新华网"
          },
          {
            value: "2",
            label: "人民网"
          }
        ],
        operator:[
            {
                value:"0",
                label: "全部操作人"
            },
            {
                value:"1",
                label: "运营A"
            },
            {
                value:"2",
                label: "运营B"
            }
        ]
      },
      value: {
        search: "", //搜索value
        dateTime: "0", //按照创建日期、者最终修改日期 value
        datePicker: "", //起始日期至终止日期 value
        selectSource: "0", //全部来源
        operator:"0", //操作人
        stype: {  // 排序规则
          ctime: true, // 按创建时间排序， true降序  false升序
          utime: true, // 按最终修改时间排序， true降序  false升序
        }
      },

      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    // 发送搜索参数
    onSench() {
      this.$emit('s-params', this.value);
    },

    // 修改排序参数
    onSort(str) {
      var self = this;
      switch (str) {
        case "ctime":
            self.value.stype.ctime = !self.value.stype.ctime;
            break;
        case "utime":
            self.value.stype.utime = !self.value.stype.utime;
            break;
        default:
            break;
      }
    }
  }
};
</script>

<style>
.el-select {
  width: 150px;
}
.el-range-editor.el-input__inner {
  width: 300px;
}
</style>
