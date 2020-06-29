<template>
  <div class="pagelet-write garr-container-white newVersion">
    <div class="edit-wrap common-container-wrapper">
      <el-form
        ref="pojo"
        :model="pojo"
        :rules="rules"
      >
        <div class="publish-editor">
          <el-form-item prop="title">
            <el-input v-model="pojo.title" type="text" placeholder="起个好标题" />
          </el-form-item>
          <el-form-item prop="content">
            <div
              v-quill:myQuillEditor="editorOption"
              class="quill-editor"
              :content="pojo.content"
              @change="onEditorChange"
            />
          </el-form-item>
        </div>
        <div class="form-wrap">
          <div class="form-cards" />
          <div class="form-container">
            <div class="pgc-edit-cell edit-cell">
              <div class="edit-label">
                展示封面
              </div>
              <div class="edit-input">
                <div class="article-cover">
                  <div class="pgc-radio article-cover-radio-group">
                    <el-radio-group v-model="isImg">
                      <el-radio :label="false">
                        无封面
                      </el-radio>
                      <el-radio :label="true">
                        单图
                      </el-radio>
                    </el-radio-group>
                  </div>
                  <div v-show="isImg" style="padding-left: 0px;">
                    <div class="article-cover-images">
                      <el-form-item>
                        <el-upload
                          class="avatar-uploader"
                          action="http://localhost:3001/upload"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                          name="img"
                        >
                          <img v-if="showimg" :src="uploadImg" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon" />
                        </el-upload>
                      </el-form-item>
                    </div>
                    <div class="article-cover-tip">
                      优质的封面有利于推荐，格式支持JPEG、PNG
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pgc-edit-cell edit-cell">
              <div class="edit-label">
                投稿频道
              </div>
              <div class="edit-input">
                <div class="article-cover">
                  <el-form-item prop="channelId">
                    <el-select v-model="pojo.channelId" placeholder="选择频道" filterable clearable>
                      <el-option
                        v-for="item in channelList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div v-if="pojo.gatheringId!==undefined" class="pgc-edit-cell edit-cell">
              <div class="edit-label">
                参与活动
              </div>
              <div class="edit-input">
                <div class="article-cover">
                  <label>{{ this.$route.query.gName }}</label>
                </div>
              </div>
            </div>
            <div v-if="pojo.columnId!==undefined" class="pgc-edit-cell edit-cell">
              <div class="edit-label">
                投递专栏
              </div>
              <div class="edit-input">
                <div class="article-cover">
                  <label>{{ this.$route.query.cName }}</label>
                </div>
              </div>
            </div>
            <div class="pgc-edit-cell edit-cell inline-group" style="display: flex;">
              <div class="edit-label">
                发文特权
              </div>
              <div class="edit-input">
                <div class="pgc-external-link">
                  <div class="pgc-checkbox">
                    <label>
                      <span class="tui2-checkbox-text">
                        <span>扩展链接</span>
                      </span>
                      <el-switch v-model="isUrl" active-value="true" inactive-value="false" />
                    </label>
                    <el-input v-show="isUrl" v-model="pojo.url" placeholder="内容" style="margin-top:10px">
                      <template slot="prepend">
                        Http://
                      </template>
                    </el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="publish-footer">
          <div class="garr-footer-publish-content publish-footer-content">
            <div class="footer-tip">
              正文字数：
              0
            </div>
            <!-- <button type="button" class="byte-btn byte-btn-default byte-btn-size-large byte-btn-shape-square publish-btn">
            <span>预览</span>
          </button> -->
            <button id="publish" type="button" class="byte-btn byte-btn-primary byte-btn-size-large byte-btn-shape-square publish-btn publish-btn-last" @click="handleSave('pojo')">
              <span>发布</span>
            </button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { quillRedefine } from 'vue-quill-editor-upload'
import channelApi from '@/api/channel'
import newsApi from '@/api/news'
export default {
  asyncData () {
    return channelApi.search({ state: '1' }).then((res) => {
      return { channelList: res.data }
    })
  },
  data () {
    return {
      pojo: {},
      isImg: false,
      isUrl: false,
      uploadImg: '',
      showimg: false,
      editorOption: {},
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入新闻内容', trigger: 'blur' },
          { min: 10, max: 5000, message: '长度在 10 到 5000 个字符', trigger: 'blur' }
        ],
        channelId: [
          { required: true, message: '请至少选择一个频道投稿', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    if (this.$route.query.gId !== undefined) {
      this.pojo.gatheringId = this.$route.query.gId
    }
    if (this.$route.query.cId !== undefined) {
      this.pojo.columnId = this.$route.query.cId
    }
    this.editorOption = quillRedefine({
      uploadConfig: {
        action: 'http://localhost:3001/upload',
        res: (response) => {
          return response.info
        },
        name: 'img' // 图片上传参数
      }
    })
  },
  methods: {
    onEditorChange ({ editor, html, text }) {
      this.pojo.content = html
    },
    handleAvatarSuccess (res) {
      // this.pojo.avatar = res.info
      this.uploadImg = res.info
      this.$nextTick(() => {
        this.showimg = true
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式或png!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleSave (pojo) {
      this.$refs[pojo].validate((valid) => {
        if (valid) {
          if (this.isImg === false) {
            this.pojo.image = ''
          } else {
            this.pojo.image = this.uploadImg
          }
          newsApi.save(this.pojo).then((res) => {
            if (res.flag) {
              this.$router.push('/userHome')
            }
            this.$message({
              message: res.message,
              type: res.flag ? 'success' : 'error '
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/publish.css';
.quill-editor {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
