<template>
  <div>
    <el-form :model="loginbasicmsg.basic" :rules="loginbasicmsg.rules" ref="ruleform" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号名编辑" prop="loginaddname">
        <el-input v-model="loginbasicmsg.basic.loginaddname" maxlength="20"  ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="loginaddpassword">
        <el-input v-model="loginbasicmsg.basic.loginaddpassword" type="password" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="loginaddregion">

        <el-select  v-model="loginbasicmsg.basic.loginaddregion" placeholder="请输入部门" >
          <el-option v-for="(item, index) in logindepartment" :label="item.desc" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="loginaddrealname">
        <el-input v-model="loginbasicmsg.basic.loginaddrealname" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="commitmsg1('ruleform')">保存</el-button>
        <!--<el-button @click="resetForm('ruleform')">重置</el-button>-->
        <el-button @click="open2" >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters, mapActions } from 'vuex'
  export default {
    name: "userEdit",
    data (){
      return {
      }},
    computed:{
      // ...mapGetters([
      //   'loginbasicmsg',
      // ]),
      'loginbasicmsg':{
        get () {
          //console.log("dddddd")
          console.log(this.$store.state.loginbasic.loginbasicmsg)
          return this.$store.state.loginbasic.loginbasicmsg
        },
      },
      'loginbasicmsg.loginaddname': {
        get () {
          // console.log("dddddd")
          //console.log("看看"+this.$store.state.loginbasic.loginbasicmsg.basic.loginaddname)
          return this.$store.state.loginbasic.loginbasicmsg.basic.loginaddname
        },
        set (value) {
          this.$store.commit('registername', value)
        }
      },
      'loginbasicmsg.loginaddpassword': {
        get () {
          return this.$store.state.loginbasic.loginbasicmsg.basic.loginaddpassword
        },
        set (value) {
          this.$store.commit('registerpassword', value)
        }
      },
      'loginbasicmsg.loginaddregion': {
        get () {
          return this.$store.state.loginbasic.loginbasicmsg.basic.loginaddregion
        },
        set (value) {
          this.$store.commit('registeregion', value)
        }
      },
      'loginbasicmsg.realname': {
        get () {
          return this.$store.state.loginbasic.loginbasicmsg.basic.loginaddrealname
        },
        set (value) {
          this.$store.commit('registerrealname', value)
        }
      },
      logindepartment:{
        get () {
         // console.log(this.$store.state.loginbasic.logindepartment)
          return this.$store.state.loginbasic.logindepartment;
        }
      }
    },
    mounted (){
      this.getdeparment();
      this.getuserMsg();
      this.loginbasicmsg.rules.loginaddpassword[0].required = false;
      console.log("获取rule",this.loginbasicmsg.rules.loginaddpassword[0].required)
      console.log("看看基本信息获取到没",this.loginbasicmsg)
    },
    methods:{
      ...mapActions([
        "commitmsg",
        "getdeparment",
        'getuserMsg',
        'editstoremsg'
      ]),
      commitmsg1(formname){

        this.$refs[formname].validate((valid) => {
          if (valid) {
            // alert('submit!');
           // alert(this.loginbasicmsg.basic.loginaddpassword)
            this.editstoremsg()
          } else {
            console.log('error submit!!');
            return false;
          }
        })
        //this.commitmsg(this,loginbasicmsg.basic)
      },

      open2() {
        this.$confirm('是否确认不保存，直接返回上一页', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          //console.log(window.location)
          window.location.href = window.location.origin+"/#/menu/usermanage"

        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      }
    },

  }
</script>

<style scoped>

</style>
