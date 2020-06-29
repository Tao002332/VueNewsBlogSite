<template>
  <div class="garr-container-white m-accountinfo">
    <div class="m-accountinfo-body">
      <div class="m-accountinfo-tip" />
      <div class="g-grid-row m-nameandbriefedititem module module-name">
        <div class="g-grid-row">
          <div class="m-avataruploader m-nameandbriefedititem-avatar">
            <div class="m-avataruploader-imagewrapper">
              <img class="imagewrapper-image-url" :src="userInfo.avatar">
            </div>
          </div>
          <div class="m-nameandbriefedititem-info">
            <span class="item-label item-label-name">{{ userInfo.nickname }}</span>
          </div>
        </div>
        <button type="button" class="byte-btn byte-btn-default byte-btn-size-default byte-btn-shape-square item-btn" @click="dialogEditVisible=true">
          <span>修改信息</span>
        </button>
      </div>
      <div class="module">
        <div class="module-left">
          账号信息
        </div>
        <div class="module-right">
          <div class="module-item">
            <div class="item-label">
              用户id号
            </div>
            <div class="item-content">
              {{ userInfo.id }}
            </div>
          </div>
        </div>
      </div>
      <div class="module">
        <div class="module-left">
          登录方式
        </div>
        <div class="module-right">
          <div class="module-item">
            <div class="item-label">
              绑定手机
            </div>
            <div class="item-content">
              {{ userInfo.mobile }}
            </div>
          </div>
        </div>
      </div>
      <div class="module">
        <div class="module-left">
          运营人信息
        </div>
        <div class="module-right">
          <div class="module-item">
            <div class="item-label">
              联系邮箱
            </div>
            <div class="item-content">
              {{ userInfo.email }}
            </div>
          </div>
        </div>
      </div>
      <div class="module">
        <div class="module-left">
          个性信息
        </div>
        <div class="module-right">
          <div class="module-item">
            <div class="item-label">
              生日
            </div>
            <div class="item-content">
              {{ userInfo.birthday }}
            </div>
          </div>
          <div class="module-item">
            <div class="item-label">
              兴趣
            </div>
            <div class="item-content">
              {{ userInfo.interest }}
            </div>
          </div>
          <div class="module-item">
            <div class="item-label">
              个性
            </div>
            <div class="item-content">
              {{ userInfo.personality }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="修改"
      :visible.sync="dialogEditVisible"
    >
      <el-form ref="userInfo" :model="userInfo" label-width="80px" :rules="rules">
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="userInfo.nickname" placeholder="昵称" />
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3001/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="img"
          >
            <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="userInfo.birthday"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="兴趣">
          <el-input v-model="userInfo.interest" placeholder="兴趣" />
        </el-form-item>
        <el-form-item label="个性">
          <el-input v-model="userInfo.personality" placeholder="个性" />
        </el-form-item>
        <button type="button" class="byte-btn byte-btn-default byte-btn-size-default byte-btn-shape-square item-btn" @click="handleUpdate('userInfo')">
          提交
        </button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import userApi from '@/api/user'
export default {
  data () {
    return {
      userInfo: {},
      dialogEditVisible: false,
      rules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      if (!getToken().token) {
        return false
      }
      this.$store.dispatch('user/getInfo', getToken().token).then((res) => {
        if (res.flag) {
          this.userInfo = res.data
        }
      })
    },
    handleAvatarSuccess (res, file) {
      this.userInfo.avatar = res.info
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式或 png!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleUpdate (userInfo) {
      const d = new Date(this.userInfo.birthday)
      this.userInfo.birthday = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      this.$refs[userInfo].validate((valid) => {
        if (valid) {
          userApi.saveInfo(this.userInfo).then((res) => {
            if (res.flag) {
              this.fetchData()
              this.dialogEditVisible = false
            }
            this.$message({
              message: res.message,
              type: res.flag ? 'success' : 'error'
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/manager.css';
@import '~/assets/css/manager-info.css';
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-form-item{
    margin-bottom: 20px;
  }
</style>
