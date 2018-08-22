<template>
  <div>
    <el-row>
      <h2>资讯审核页面</h2>
    </el-row>
    <el-row class="ndy-minWid" type="flex" justify="center">
      <el-col :span="20" center="true">
        <el-form label-width="100px" class="demo-ruleForm">



          <el-form-item label="标题">
            <p>{{ConsultDetails.ruleForm.Myname.name}}</p>
          </el-form-item>

          <!--头像-->
          <el-form-item label="头像" class="ndymargin">
            <div class="ndy-images ndy-images1" v-if="ConsultDetails.ruleForm.Myimages.imagesArr[0] ? ConsultDetails.ruleForm.Myimages.imagesArr[0].imagesUrl : false">
              <div>
                <div>
                  <img :src="ConsultDetails.ruleForm.Myimages.imagesArr[0].imagesUrl" alt="">
                </div>
              </div>
            </div>
            <div class="ndy-images ndy-images2" v-if="ConsultDetails.ruleForm.Myimages.imagesArr[1] ? ConsultDetails.ruleForm.Myimages.imagesArr[1].imagesUrl : false">
              <div>
                <div>
                  <img :src="ConsultDetails.ruleForm.Myimages.imagesArr[1].imagesUrl" alt="">
                </div>
              </div>
            </div>
            <div class="ndy-images ndy-images3" v-if="ConsultDetails.ruleForm.Myimages.imagesArr[2] ? ConsultDetails.ruleForm.Myimages.imagesArr[2].imagesUrl : false">
              <div>
                <div>
                  <img :src="ConsultDetails.ruleForm.Myimages.imagesArr[2].imagesUrl" alt="">
                </div>
              </div>
            </div>
          </el-form-item>


          <el-form-item label="频道">
            <p>{{ConsultDetails.ruleForm.channel.label}}</p>
          </el-form-item>

          <el-form-item label="正文:">
            <div v-html="ConsultDetails.ruleForm.Mycontent.createContent"></div>
          </el-form-item>

          <el-form-item label="发布渠道:">
            <el-row>
              <el-col :span="4">
                <el-checkbox :indeterminate="ConsultReleasePath.sIndeterminate" v-model="ConsultReleasePath.checkAll" @change="ConsultHandleCheckAllChange">全选</el-checkbox>
              </el-col>
              <el-col :span="4" v-for="(item, index) in ConsultReleasePath.datas" :key="index">
                <el-checkbox @change="ConsultHandleCheckedCitiesChange(item)" v-model="item.neWshow"></el-checkbox>
                <span>&nbsp;{{item.name}}</span>
              </el-col>
            </el-row>
          </el-form-item>

          <el-row>
            <el-col :span="24" class="ndy-odiv">
              <el-button type="success" @click="BtnRelease" plain>发布</el-button>
              <el-button type="danger" @click="ConsultNoExamine" plain>审核不通过</el-button>
              <el-button type="el-button el-button--info" @click="$router.go(-1)">取消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>

    </el-row>



    <el-dialog :title="ConsultMessageBox.title" :visible.sync="ConsultMessageBox.dialogFormVisible">
      <details-reason @btn-cacel="ConsultBtnCacel" :ReasonMsg="ConsultMessageBox.contentMsg"></details-reason>
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
        'ConsultDetails',       // 所有数据
        'ConsultMessageBox',   // 弹窗数据
        'ConsultReleasePath'   // 发布渠道数据
      ])
    },
    methods: {
      ...mapActions([
        'ConsultDetailsHttp',   // 获取所有数据
        'getChannel',           // 获取频道
        'ConsultBtnRelease',   // 资讯发布回调函数
        'ConsultNoExamine',    // 点击审核不通过回调函数
        'ConsultBtnCacel',    // 确认不通过审核 / 取消
        'ConsultHandleCheckAllChange',  // 发布渠道全选
        'ConsultHandleCheckedCitiesChange',  // 发布渠道单选
        'ConsultResetReleasePath',   // 发布渠道数据重置
      ]),
      set (value) {
        // console.log('====>',value)
        this.$store.state.ConsultDetails.ConsultDetails.params.data.informationId = value
      },
      // 发布按钮
      BtnRelease () {
        var obj = {
          name: '发布',    //名字
          massType: '',    //弹窗类型  2带确定、取消的弹窗   1只有确定   不确定状态赋值为任任意,之后进行判断赋值
          btnType: 3,    // 保存1   提交审核2   发布3
          newmessages: this.$store.state.ConsultDetails.ConsultDetails.ReleasePath.newmessages
        };
        this.ConsultBtnRelease(obj)
      }
    },
    mounted () {
      var _this = this;
      // 将id传入vuex
      this.set(this.$route.query.id);
      // 发布渠道数据重置
      this.ConsultResetReleasePath();
      // 执行axios
      this.ConsultDetailsHttp(function () {
        _this.getChannel("detailsEdit");
      });

    }
  }
</script>

<style>
  .v-modal{
    display: none;
  }
</style>
