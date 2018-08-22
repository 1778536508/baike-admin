<template>
  <div class="mask" id="app">
    <div class="login-out">
      <div class="m_txt">
        大百科后台管理系统
      </div>
      <div class="m_input">
        <input placeholder="请输入帐号" type="text"  name="username" id="username" v-model="username">
      </div>
      <div class="m_input">
        <input placeholder="请输入密码" type="password" name="pwd" id="pwd" v-model="password">
      </div>
      <div class="m_btn">
        <a  href="javascript:void(0)" :class="{active:ifempty}" @click="checkMes">登录</a>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapGetters, mapActions } from 'vuex'
  export default {
    name: "app",
    data (){
      return {}
    },
    computed: {
      'username': {
        get () {
          return this.$store.state.login.username
        },
        set (value) {
          this.$store.commit('updateUsername', value)
        }
      },
      'password': {
        get () {
          return this.$store.state.login.password
        },
        set (value) {
          this.$store.commit('updatePassword', value)
        }
      },
      'ifempty': {
        get () {
          console.log(this.$store.state.login.ifempty)
          return this.$store.state.login.ifempty
        },
        set (value) {
          //this.$store.commit('updatePassword', value)
        }
      },
      // ...mapGetters([
      //   'username',
      //   'password',
      //   'accessToken',
      //   'ifempty'
      // ])
    },
    methods:{
      ...mapActions([
        'checkMes',
      ]),
      popwindow (mess){
        this.$alert(mess, '错误提示', {
          confirmButtonText: '确定',
        });
      },
      // che (){
      //     this.checkMes()
      //  //if(this.checkMes()!=''){}
      //    //this.popwindow(this.checkMes());
      //    //console.log(this.checkMes())
      //    //console.log(this.checkMes())
      //   //this.loginerrormsg
      // }

    },
    mounted(){
      //document.cookie = "iflogin = false"
    }

    }
</script>

<style scoped>
  ul li{
    list-style:none;
  }
.mask{
  width:100%;
  height: 100%;
  background:url("../../assets/login_bg.jpg") 0 0 no-repeat;
}
.login-out{
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -260px;
  margin-top: -220px;
  padding: 0 40px 40px;
  width: 440px;
  background-color: #fff;
  background-color: rgba(255,255,255,0.9);
  border-top: 3px solid #0096e0;
  -webkit-box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
  .m_txt{
    padding: 30px 0 16px;
    text-align: center;
    font-size: 20px;
    color: #0096e0;
  }
  .m_input{
    margin-top: 20px;
    padding: 0 20px;
    height: 46px;
    border: 1px solid #ccc;
  }
  .m_input input{
    margin-top: 12px;
    width: 100%;
    background-color: transparent;
    border: 0;
    outline: none;
  }
  .m_btn{
    margin-top: 30px;
  }
  .m_btn a{
    display: block;
    height: 46px;
    line-height: 46px;
    background-color: #ccc;
    text-align: center;
    font-size: 16px;
    color: #fff;
    cursor:pointer;
  }
  .m_btn a.active{
    background-color: #0096e0;
  }
</style>
