<template>
  <div>
    <el-row>
      <h2>资讯新增页面</h2>
    </el-row>
    <el-row class="ndy-minWid" type="flex" justify="center">
      <el-col :span="20" center="true">
        <el-form :model="ConsultDetails.ruleForm" :rules="ConsultDetails.rules" ref="create" label-width="100px" class="demo-ruleForm">

          <el-form-item label="标题" prop="Myname.name">
            <el-input v-model="ConsultDetails.ruleForm.Myname.name"></el-input>
          </el-form-item>

          <!--:headers= params.headers-->
          <el-form-item label="头像" class="ndymargin" prop="">
            <el-upload
              class="ndy-upload1"
              :action= params._url
              :name= params.imagefile
              :data= params.data
              :headers=params.headers
              list-type="picture-card"
              :on-success="ConsultSuccessClapack"
              :on-error="ConsultErrorClapack"
              :on-remove="ConsultHandleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-upload
              class="ndy-upload2"
              :action= params._url
              :name= params.imagefile
              :data= params.data
              :headers=params.headers
              list-type="picture-card"
              :on-success="ConsultSuccessClapack"
              :on-error="ConsultErrorClapack"
              :on-remove="ConsultHandleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-upload
              class="ndy-upload3"
              :action= params._url
              :name= params.imagefile
              :data= params.data
              :headers=params.headers
              list-type="picture-card"
              :on-success="ConsultSuccessClapack"
              :on-error="ConsultErrorClapack"
              :on-remove="ConsultHandleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <p class="consult-images-cations" v-html="params.remarks.size"></p>
            <p class="consult-images-cations" v-html="params.remarks.text"></p>
          </el-form-item>

          <el-form-item label="频道" prop="channel.value">
            <el-select v-model="ConsultDetails.ruleForm.channel.value" placeholder="请选择">
              <el-option
                v-for="item in ConsultDetails.ruleForm.channel.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
  // 富文本
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
        'ConsultDetails',
        'ConsultDetailsName',
        'ConsultDetailsContent',

      ]),
    },
    methods: {
      // 保存
      BtnVation () {

        //---------------------------------------
        // var obj = {
        //   name: '保存',    //名字
        //   massType: 2,    //弹窗类型  2带确定、取消的弹窗   1只有确定
        //   btnType: 1    // 保存1   提交审核2   发布3
        // }
        // this.ConsultOpen(obj);
        //-----------------------------------------

        // console.log('---保存',this.$store.state.ConsultDetails.ConsultDetails)
        this.$refs.create.validate((valid) => {
          console.log('valid', valid)
          if (valid === true) {
            // this.open('保存');
            var obj = {
              name: '保存',    //名字
              massType: 2,    //弹窗类型  2带确定、取消的弹窗   1只有确定
              btnType: 1    // 保存1   提交审核2   发布3
            }
            this.ConsultOpen(obj);
          }
        })
      },
      // 提交审核
      BtnSubmit () {
        this.$refs.create.validate((valid) => {
          console.log('valid', valid)
          if (valid === true) {
            // this.open('提交审核');
            var obj = {
              name: '提交审核',    //名字
              massType: 2,    //弹窗类型  2带确定、取消的弹窗   1只有确定
              btnType: 2    // 保存1   提交审核2   发布3
            }
            this.ConsultOpen(obj);
          }
        })
      },
      ...mapActions([
        'ConsultDetailsReset',    // 重置数据
        'getChannel',             // 获取频道
        'ConsultSuccessClapack', // 上传成功回调
        'ConsultHandleRemove',  // 上传失败回调
        'ConsultErrorClapack',   //上传图片失败回调
        'ConsultOpen',    // 弹窗
      ]),
      // 富文本实例
      newEdit (dome) {
        var _this = this
        var editor = new E(dome)
        editor.customConfig.onchange = (html) => {
          console.log(html)
          _this.$store.state.ConsultDetails.ConsultDetails.ruleForm.Mycontent.longContent = editor.txt.text();  // 纯文本
          _this.$store.state.ConsultDetails.ConsultDetails.ruleForm.Mycontent.createContent = html
          _this.$store.state.ConsultDetails.ConsultDetails.ruleForm.Mycontent.contentState = 'a'
          _this.$refs.create.validate((valid) => {})
        }
        // 上传图片请求地址
        editor.customConfig.uploadImgServer = _this.params._url;
        // 上传图片名字
        editor.customConfig.uploadFileName = _this.params.imagefile;
        // 上传图片额外参数
        editor.customConfig.uploadImgParams = _this.params.data;
        // 设置请求头
        editor.customConfig.uploadImgHeaders = _this.params.headers;
        // 上传图片回调函数
        editor.customConfig.uploadImgHooks = {
          customInsert: function (insertImg, result, editor) {
            insertImg(result.data.uri)
          }
        };
        editor.create()
      }
    },
    mounted () {

      var _this = this;
      this.newEdit('#editor1');
      this.ConsultDetailsReset(function () {
        document.getElementsByClassName('w-e-text-container')[0].style.height = 'auto';
        document.getElementsByClassName('w-e-text-container')[0].style.minHeight = '500px';
        document.getElementsByClassName('w-e-text')[0].style.minHeight = '500px';
        _this.getChannel("detailsCreate");
        // 赋值之后监听
        _this.$watch('ConsultDetailsName',function (){    // 监听标题
          _this.$store.state.ConsultDetails.ConsultDetails.ruleForm.Myname.nameStatus = 'a'
        })
        _this.$watch('ConsultDetailsContent',function (){    // 监听正文
          _this.$store.state.ConsultDetails.ConsultDetails.ruleForm.Mycontent.contentState = 'a'
        })
      });
    }
  }
</script>

<style>


</style>
