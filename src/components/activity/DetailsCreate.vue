<template>
  <div>
    <el-row>
      <h2>活动新增页面</h2>
    </el-row>
    <el-row class="ndy-minWid" type="flex" justify="center">
      <el-col :span="20" center="true">
        <el-form :model="ActivityDetails.ruleForm" :rules="ActivityDetails.rules" ref="create" label-width="100px" class="demo-ruleForm">

          <el-form-item label="标题" prop="Myname.name">
            <el-input v-model="ActivityDetails.ruleForm.Myname.name"></el-input>
          </el-form-item>

          <el-form-item label="头像" class="ndymargin" prop="Myimages.VerifImage">
            <el-upload
              class="ndy-upload1"
              :action= params._url
              :name= params.imagefile
              :data= params.data
              :headers=params.headers
              enctype="multipart/form-data"
              list-type="picture-card"
              :on-success="ActivitySuccessClapack"
              :on-error="ActivityErrorClapack"
              :on-remove="ActivityHandleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <p class="images-cations" v-html="params.remarks.size"></p>
          </el-form-item>

          <el-form-item label="时间" prop="Mydate1.date1">
            <el-form-item prop="Mydate1.date1" value="开始时间" class="ndy-formDate">
              <el-date-picker
                v-model="ActivityDetails.ruleForm.Mydate1.date1"
                type="datetime"
                placeholder="选择开始日期时间">
              </el-date-picker>
            </el-form-item>
            <p class="ndy-formDate">&nbsp;-&nbsp;</p>
            <el-form-item prop="Mydate2.date2" value="结束时间" class="ndy-formDate">
              <el-date-picker
                v-model="ActivityDetails.ruleForm.Mydate2.date2"
                type="datetime"
                placeholder="选择结束日期时间">
              </el-date-picker>
            </el-form-item>
          </el-form-item>

          <el-form-item label="地点" prop="Myregion.region">
            <el-input v-model="ActivityDetails.ruleForm.Myregion.region"></el-input>
          </el-form-item>


          <el-form-item label="正文" prop="Mycontent.longContent">
            <el-row>
                <div id="editor1" style="text-align:left;"></div>
            </el-row>
          </el-form-item>


          <el-row>
            <el-col :span="24" class="ndy-odiv">
              <el-button type="primary" @click="BtnVation" plain>保存</el-button>
              <el-button type="success" @click="BtnSubmit" plain>提交审核</el-button>
              <el-button type="el-button el-button--info" @click="$router.go(-1)">取消</el-button>
            </el-col>
          </el-row>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import E from 'wangeditor'
  export default {
    data() {
      return {
        params: {  // 上传图片接口
          _url: window.config.domain + window.config.app.upImage,  // 接口域名
          imagefile: window.uploadView.imagefile,   // 统一name
          data: window.uploadView.data,     // 文件夹name
          headers: window.uploadView.headers,    // 设置请求头
          remarks: window.uploadView.remarks    // 图片备注
        }
      }
    },
    computed: {
      ...mapGetters([
        'ActivityDetails',  // 所有数据
        'ActivityDetailsName',  // 标题
        'ActivityDetailsDate1', // 开始时间
        'ActivityDetailsDate2', // 结束时间
        'ActivityDetailsRegion', // 地点
        'ActivityDetailsContent',  // 正文
      ]),
    },
    methods: {
      // 保存
      BtnVation () {
        var _this = this
        console.log(new Date(this.$store.state.ActivityDetails.ActivityDetails.ruleForm.Mydate1.date1))
        this.$refs.create.validate((valid) => {
          console.log('valid', valid)
          if (valid === true) {
            // this.open('保存');
            var obj = {
              name: '保存',    //名字
              massType: 2,    //弹窗类型  2带确定、取消的弹窗   1只有确定
              btnType: 1    // 保存1   提交审核2   发布3
            }
            this.ActivityOpen(obj);
          }
        })
      },
      // 提交审核
      BtnSubmit () {
        var _this = this
        this.$refs.create.validate((valid) => {
          console.log('valid', valid)
          if (valid === true) {
            var obj = {
              name: '提交审核',    //名字
              massType: 2,    //弹窗类型  2带确定、取消的弹窗   1只有确定
              btnType: 2    // 保存1   提交审核2   发布3
            }
            _this.ActivityOpen(obj)
          }
        })
      },
      // 富文本实例
      newEdit (dome) {
        var _this = this;
        var editor = new E(dome);
        editor.customConfig.onchange = (html) => {
          console.log(html)
          _this.$store.state.ActivityDetails.ActivityDetails.ruleForm.Mycontent.longContent = editor.txt.text();  // 纯文本
          _this.$store.state.ActivityDetails.ActivityDetails.ruleForm.Mycontent.createContent = html;
          _this.$store.state.ConsultDetails.ConsultDetails.ruleForm.Mycontent.contentState = 'a'
          _this.$refs.create.validate((valid) => {})
        }
        // 请求地址
        editor.customConfig.uploadImgServer = _this.params._url;
        // 统一name
        editor.customConfig.uploadFileName = _this.params.imagefile;
        // 文件夹name
        editor.customConfig.uploadImgParams = _this.params.data;
        // 设置请求头
        editor.customConfig.uploadImgHeaders = _this.params.headers;
        // 上传图片回调函数
        editor.customConfig.uploadImgHooks = {
          customInsert: function (insertImg, result, editor) {
            console.log('result=>', result)
            insertImg(result.data.uri)    // 将返回的数据添加到富文本中
          }
        };
        editor.create()
      },
      ...mapActions([
        'ActivityDetailsReset',   // 获取数据
        'ActivityOpen',     // 弹窗
        'ActivitySuccessClapack',    // 上传图片成功回调
        'ActivityHandleRemove',   // 上传图片删除回调
        'ActivityErrorClapack'   // 上传图片失败回调
      ]),
    },
    mounted () {
      var _this = this;
      this.newEdit('#editor1');
      this.ActivityDetailsReset(function () {
        document.getElementsByClassName('w-e-text-container')[0].style.height = 'auto%';
        document.getElementsByClassName('w-e-text-container')[0].style.minHeight = '500px';
        document.getElementsByClassName('w-e-text')[0].style.minHeight = '500px';
        // 赋值之后监听
        _this.$watch('ActivityDetailsName',function (){    // 监听标题
          _this.$store.state.ActivityDetails.ActivityDetails.ruleForm.Myname.nameStatus = 'a';
        })
        _this.$watch('ActivityDetailsDate1',function (){    // 监听开始时间
          _this.$store.state.ActivityDetails.ActivityDetails.ruleForm.Mydate1.date1State = 'a';
        })
        _this.$watch('ActivityDetailsDate2',function (){    // 监听结束时间
          _this.$store.state.ActivityDetails.ActivityDetails.ruleForm.Mydate2.date2State = 'a';
        })
        _this.$watch('ActivityDetailsRegion',function (){    // 监听地点
          _this.$store.state.ActivityDetails.ActivityDetails.ruleForm.Myregion.regionState = 'a';
        })
        _this.$watch('ActivityDetailsRegion',function (){    // 正文
          _this.$store.state.ActivityDetails.ActivityDetails.ruleForm.Mycontent.contentState = 'a';
        })
      })
    }
  }
</script>

<style>


</style>
