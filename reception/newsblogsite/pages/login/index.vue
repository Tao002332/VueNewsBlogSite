<template>
  <div style="margin:0 auto;font-family:PingFangSC;height:100%">
    <div id="login_box" class="login_box">
      <div class="page-wrap">
        <nuxt-link to="/" class="logo-wrap" style="z-index: 99;">
          <img src="~/assets/img/logo.png" style="opacity: 0.6;">
        </nuxt-link>
        <div class="slogan-wrap">
          <img src="~/assets/img/logo.png" style="opacity: 0.4;">
        </div>
        <div id="BD_Login_Form" class="login-wrap">
          <div class="login-form-byted">
            <div class="form-main">
              <div id="form-header" class="form-header">
                <div id="login-switch" class="login-switch">
                  <div v-show="isRegister" id="login-switch-form" class="login-switch-title active">
                    手机号注册
                  </div>
                  <div v-show="!isRegister" class="login-switch-title active">
                    帐密登录
                  </div>
                </div>
              </div>
              <div class="form-body">
                <el-form
                  v-show="!isRegister"
                  ref="loginForm"
                  :model="loginForm"
                >
                  <div class="form-item">
                    <input v-model="loginForm.mobile" type="text" placeholder="手机号" class="bytedance-input">
                  </div>
                  <div class="form-item">
                    <input v-model="loginForm.password" type="password" placeholder="密码" class="bytedance-input">
                  </div>
                  <div id="login-button">
                    <button type="button" class="bytedance-submit" style="border-radius: 5px; font-size: 18px;" @click="handleLogin">
                      确定
                    </button>
                  </div>
                </el-form>
                <el-form
                  v-show="isRegister"
                  ref="registerForm"
                  :model="registerForm"
                  :rules="rules"
                >
                  <el-form-item class="form-item" prop="mobile">
                    <input v-model="registerForm.mobile" type="text" placeholder="手机号" class="bytedance-input">
                  </el-form-item>
                  <el-form-item class="form-item" prop="code">
                    <input v-model="registerForm.code" type="text" placeholder="请输入6位验证码" class="bytedance-input">
                    <div class="mobile-code-get">
                      <button type="button" :disabled="disabled" class="get-code" @click="sendSms">
                        {{ showText }}
                      </button>
                    </div>
                  </el-form-item>
                  <el-form-item class="form-item" prop="password">
                    <input v-model="registerForm.password" type="password" placeholder="密码（密码长度8-20个字符）" class="bytedance-input">
                  </el-form-item>
                  <el-form-item class="form-item" prop="checkPassword">
                    <input v-model="registerForm.checkPassword" type="password" placeholder="确认密码" class="bytedance-input">
                  </el-form-item>
                  <div id="login-button">
                    <button type="button" class="bytedance-submit" style="border-radius: 5px; font-size: 18px;" @click="handleRegister('registerForm')">
                      确定
                    </button>
                  </div>
                </el-form>
              </div>
            </div>
            <div class="i-divider-horizontal">
              <span class="i-divider-inner-text">其他方式</span>
            </div>
            <div class="form-footer">
              <div v-show="!isRegister" class="footer-login-type" @click="isRegister=true">
                <svg class="icon login-type-icon" aria-hidden="true">
                  <use xlink:href="#iconzhuce" />
                </svg>
                <span>注册</span>
              </div>
              <div v-show="isRegister" class="footer-login-type" @click="isRegister=false">
                <svg class="icon login-type-icon" aria-hidden="true">
                  <use xlink:href="#icondenglu" />
                </svg>
                <span>登录</span>
              </div>
            </div>
            <div style="margin-top:10px;font-size:14px;color:gray;text-align: center;">
              <span class="terms">
                登录/注册即表示你同意用户协议和隐私条款
                <nuxt-link to="login/modifyPassword" style="margin-left: 40px;">忘记密码</nuxt-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from '@/api/user'
export default {
  data () {
    const validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {},
      registerForm: {},
      isRegister: false,
      disabled: false,
      time: 0,
      showText: '获取验证码',
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{6,16}$/, message: '密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 6-12位' }
        ],
        checkPassword: [
          { required: true, validator: validateCheckPass, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为控', trigger: 'blur' },
          { require: true, min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.$route.query.isRegister !== undefined) {
      this.isRegister = true
    }
  },
  methods: {
    handleLogin () {
      this.$store.dispatch('user/login', this.loginForm).then((res) => {
        if (res.flag) {
          this.$store.dispatch('user/getInfo', res.data.token).then((res1) => {
            this.$router.push('/')
          })
        }
      })
    },
    sendSms () {
      if (this.registerForm.mobile === undefined || this.registerForm.mobile === '') {
        this.$message({
          message: '请输入手机号',
          type: 'error'
        })
        return false
      }
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!reg.test(this.registerForm.mobile)) {
        this.$message({
          message: '手机格式不正确',
          type: 'error'
        })
        return false
      }
      userApi.sendSms(this.registerForm.mobile).then((res) => {
        if (res.flag) {
          this.time = 60
          this.disabled = true
          this.timer()
          this.$message({
            message: res.message,
            type: res.flag ? 'success' : 'error'
          })
        }
      })
    },
    timer () {
      if (this.time > 0) {
        this.time--
        this.showText = this.time + 's后重新获取'
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        this.showText = '获取验证码'
        this.disabled = false
      }
    },
    handleRegister (registerForm) {
      this.$refs[registerForm].validate((valid) => {
        if (valid) {
          userApi.register(this.registerForm.mobile, this.registerForm.password, this.registerForm.code).then((res) => {
            if (res.flag) {
              this.$router.push('/login')
            }
            this.$message({
              message: res.message,
              type: res.flag ? 'success' : 'error'
            })
          })
        } else {
          this.$message({
            message: '注册信息失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/login.css';
</style>
