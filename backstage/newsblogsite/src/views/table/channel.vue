<template>
  <div class="app-container">
    <el-form :model="searchMap" :inline="true">
      <el-form-item label="频道名称" prop="name">
        <el-input v-model="searchMap.name" placeholder="频道名称" />
      </el-form-item>
      <el-form-item label="频道状态">
        <el-switch v-model="searchMap.state" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
      </el-form-item>
      <el-button type="primary" @click="fetchData()">查询</el-button>
      <el-button type="primary" @click="searchMap={}">清空</el-button>
      <el-button type="primary" @click="handleEdit('')">添加</el-button>
      <download-excel
        class="export-excel-wrapper"
        :data="list"
        :fields="jsonFields"
        name="channelData.xls"
      >
        <el-button type="primary">导出EXCEL</el-button>
      </download-excel>
    </el-form>
    <el-table
      :data="list"
      border
      style="width:100%"
      stripe
    >
      <el-table-column prop="id" label="频道ID" width="400px" align="center" />
      <el-table-column prop="name" label="频道名称" width="400px" align="center" />
      <el-table-column prop="state" label="频道状态" width="400px" align="center" />
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[5,10,20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="fetchData"
      @current-change="fetchData"
    />
    <el-dialog :title="id!=''?'编辑':'添加'" :visible.sync="dialogEditVisible">
      <el-form ref="pojo" :model="pojo" label-width="80px" class="demo-ruleForm" :rules="rules" auto-complete="on" label-position="left">
        <el-form-item label="频道名称" prop="name">
          <el-input v-model="pojo.name" placeholder="频道名称" />
        </el-form-item>
        <el-form-item label="频道状态">
          <el-switch v-model="pojo.state" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
        </el-form-item>
        <el-button type="success" @click="handleSave('pojo')">保存</el-button>
        <el-button type="primary" @click="dialogEditVisible = false">关闭</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import channelApi from '@/api/channel'
export default {
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入频道名称', trigger: 'blur' }
        ]
      },
      jsonFields: {
        '频道id': 'id',
        '频道名称': 'name',
        '频道状态': 'state'
      },
      list: [], // 集合
      total: 0, // 总数
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页的数量
      searchMap: {}, // 查询条件
      pojo: {},
      dialogEditVisible: false,
      id: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      channelApi.searchPage(this.currentPage, this.pageSize, this.searchMap).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    handleEdit(id) {
      this.id = id
      this.dialogEditVisible = true
      if (id !== '') {
        channelApi.findById(this.id).then(res => {
          if (res.flag) {
            this.pojo = res.data
          }
        })
      } else {
        this.pojo = {}
      }
    },
    handleSave(pojo) {
      this.$refs[pojo].validate(valid => {
        if (valid) {
          channelApi.update(this.id, this.pojo).then(res => {
            this.$message({
              message: res.message,
              type: (res.flag ? 'success' : 'error')
            })
            if (res.flag) {
              this.dialogEditVisible = false
              this.fetchData()
              this.pojo = {}
            }
          })
        } else {
          this.$message({
            message: 'error submit!!',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
  .export-excel-wrapper {
      display: inline-block;
      margin-right: 10px;
      margin-left: 10px;
      vertical-align: top;
  }
</style>
