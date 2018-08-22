<template>
  <div>
    <el-row>
      <h2>活动审核页面</h2>
    </el-row>
    <el-row class="ndy-minWid" type="flex" justify="center">
      <el-col :span="20" center="true">
        <el-form label-width="100px" class="demo-ruleForm">

          <el-form-item label="标题">
            <p>{{ActivityDetails.ruleForm.Myname.name}}</p>
          </el-form-item>


          <!--头像-->
          <el-form-item label="活动头像" class="ndymargin">
            <div class="ndy-images"  v-if="ActivityDetails.ruleForm.Myimages.imagesArr[0] ? ActivityDetails.ruleForm.Myimages.imagesArr[0].imagesUrl : false">
              <div>
                <div>
                  <img width="100%" :src="ActivityDetails.ruleForm.Myimages.imagesArr[0].imagesUrl" alt="">
                </div>
              </div>
            </div>
          </el-form-item>



          <el-form-item label="时间">
            <p>{{ActivityDetails.ruleForm.Mydate1.date1}}  -  {{ActivityDetails.ruleForm.Mydate2.date2}}</p>
          </el-form-item>
          <el-form-item label="地点">
            <p>{{ActivityDetails.ruleForm.Myregion.region}}</p>
          </el-form-item>

          <el-form-item label="正文:">
            <div v-html="ActivityDetails.ruleForm.Mycontent.longContent"></div>
          </el-form-item>

          <!--<el-form-item label="发布渠道:">-->
            <!--<el-row>-->
              <!--<el-col :span="4">-->
                <!--<el-checkbox :indeterminate="dataObj.channel.sIndeterminate" v-model="dataObj.channel.checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
              <!--</el-col>-->
              <!--<el-col :span="4" v-for="(item, index) in dataObj.channel.datas" :key="index">-->
                <!--<el-checkbox @change="handleCheckedCitiesChange(item)" v-model="item.neWshow"></el-checkbox>-->
                <!--<span>&nbsp;{{item.name}}</span>-->
              <!--</el-col>-->
            <!--</el-row>-->
          <!--</el-form-item>-->

          <el-row>
            <el-col :span="24" class="ndy-odiv">
              <el-button type="success" @click="ActivityBtnRelease" plain>发布</el-button>
              <el-button type="danger" @click="ActivityNoExamine" plain>审核不通过</el-button>
              <el-button type="el-button el-button--info" @click="$router.go(-1)">取消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>

    </el-row>



    <el-dialog :title="ActivityMessageBox.title" :visible.sync="ActivityMessageBox.dialogFormVisible">
      <details-reason @btn-cacel="ActivityBtnCacel" :ReasonMsg="ActivityMessageBox.contentMsg"></details-reason>
    </el-dialog>

  </div>
</template>
<script>
  // vuex
  import {mapGetters, mapActions} from 'vuex'
  // Enc

  // 弹窗
  import DetailsReason from '@/components/MessageBox/DetailsReason.vue'
  export default {
    components: {
      DetailsReason
    },
    data() {
      return {

      };
    },
    computed: {
      ...mapGetters([
        'ActivityDetails',  // 所有数据
        'ActivityMessageBox'    // 审核不通过数据
      ])
    },
    methods: {
      ...mapActions([
        'ActivityDetailsHttp',  // 获取所有数据
        'ActivityNoExamine',    // 点击审核不通过回调函数
        'ActivityBtnCacel',    // 确认不通过审核 / 取消
        'ActivityOpen',  // 弹窗
      ]),
      set (value) {
        // console.log('====>',value)
        this.$store.state.ActivityDetails.ActivityDetails.params.data.informationId = value
      },
      // 发布按钮
      ActivityBtnRelease() {
        var obj = {
          name: '发布',    //名字
          massType: 2,    //弹窗类型  2带确定、取消的弹窗   1只有确定
          btnType: 3    // 保存1   提交审核2   发布3
        };
        this.ActivityOpen(obj)
      },
    },
    mounted () {
        // 将id传入vuex
        this.set(this.$route.query.id);
        // 执行axios
        this.ActivityDetailsHttp(function () {});
    }
  }
</script>

<style>
  .v-modal{
    display: none;
  }
</style>
