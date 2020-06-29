<template>
  <div class="y-wrap">
    <div class="content">
      <nuxt-link to="/" class="logo-wrap">
        <img src="~/assets/img/logo.png" style="opacity: 0.6;">
      </nuxt-link>
      <div class="forgetBox">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1" />
          <el-step title="步骤 2" />
        </el-steps>
        <div v-show="active===0">
          <h1 class="box-title">
            修改密码
          </h1>
          <div class="baseForget">
            <el-form
              :model="modifyForm"
            >
              <el-form-item class="input-field">
                <el-input v-model="modifyForm.mobile" placeholder="账号（手机号）" />
              </el-form-item>
              <button type="button" class="action-btn" style="width:300px" @click="handleSendSms">
                重置
              </button>
            </el-form>
          </div>
        </div>
        <div v-show="active!==0">
          <h1 class="box-title">
            重设密码
          </h1>
          <h2 class="box-subtitle">
            修改手机号是： {{ modifyForm.mobile }}
          </h2>
          <div class="baseForget">
            <el-form
              ref="modifyForm"
              :model="modifyForm"
              :rules="rules"
            >
              <el-form-item class="input-field phone-code" prop="code">
                <input v-model="modifyForm.code" type="text" placeholder="验证码">
                <span :disabled="disabled" class="code-btn" @click="SendSms">
                  {{ showText }}
                </span>
              </el-form-item>
              <el-form-item class="input-field" prop="password">
                <input v-model="modifyForm.password" type="password" placeholder="新密码（密码长度6-16个字符）">
              </el-form-item>
              <el-form-item class="input-field" prop="checkPassword">
                <input v-model="modifyForm.checkPassword" type="password" placeholder="确认密码">
              </el-form-item>
              <button type="button" class="action-btn" @click="clear">
                上一步
              </button>
              <button type="button" class="action-btn" @click="handleModifyPassword('modifyForm')">
                提交
              </button>
            </el-form>
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
      } else if (value !== this.modifyForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      disabled: false,
      time: 0,
      showText: '获取验证码',
      modifyForm: {},
      rules: {
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
  methods: {
    handleSendSms () {
      if (this.modifyForm.mobile === undefined || this.modifyForm.mobile === '') {
        this.$message({
          message: '请输入手机号',
          type: 'error'
        })
        return false
      }
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!reg.test(this.modifyForm.mobile)) {
        this.$message({
          message: '手机格式不正确',
          type: 'error'
        })
        return false
      }
      this.active++
    },
    SendSms () {
      userApi.sendSms(this.modifyForm.mobile).then((res) => {
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
    handleModifyPassword (modifyForm) {
      this.$refs[modifyForm].validate((valid) => {
        if (valid) {
          userApi.modifyPassword(this.modifyForm.mobile, this.modifyForm.password, this.modifyForm.code).then((res) => {
            if (res.flag) {
              this.logout()
              this.$router.push('/login')
            }
            this.$message({
              message: res.message,
              type: res.flag ? 'success' : 'error'
            })
          })
        } else {
          this.$message({
            message: '修改密码失败',
            type: 'error'
          })
        }
      })
    },
    logout () {
      this.$store.dispatch('user/logout')
    },
    clear () {
      this.active = 0
      this.modifyForm = {}
    }
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/login.css';
@import '~/assets/css/modifyPassword.css';

</style>
