<template>
  <div class="pagelet-write garr-container-white newVersion">
    <div class="edit-wrap common-container-wrapper">
      <el-form
        ref="pojo"
        :model="pojo"
        :rules="rules"
        label-width="90px"
      >
        <div class="publish-editor">
          <el-form-item label="专栏名称" prop="name">
            <el-input v-model="pojo.name" type="text" placeholder="专栏名称" />
          </el-form-item>
          <el-form-item label="专栏描述" prop="summary">
            <el-input v-model="pojo.summary" type="textarea" placeholder="专栏描述: 申请理由，描述该专栏" />
          </el-form-item>
        </div>
        <div class="publish-footer">
          <div class="garr-footer-publish-content publish-footer-content">
            <button id="publish" type="button" class="byte-btn byte-btn-primary byte-btn-size-large byte-btn-shape-square publish-btn publish-btn-last" @click="handleSave('pojo')">
              <span>申请</span>
            </button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import columnApi from '@/api/column'
export default {
  data () {
    return {
      pojo: {},
      rules: {
        name: [
          { required: true, message: '请输入专栏名称', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请输入专栏描述', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    handleSave (pojo) {
      this.$refs[pojo].validate((valid) => {
        if (valid) {
          columnApi.apply(this.pojo).then((res) => {
            if (res.flag) {
              this.$router.push('/manager/managerHome/content/column')
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
</style>
