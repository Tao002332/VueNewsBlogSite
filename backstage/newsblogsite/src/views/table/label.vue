<template>
  <div class="app-container">
    <el-form ref="searchMap" :model="searchMap" label-width="90px" :inline="true">
      <el-form-item label="标签名称">
        <el-input v-model="searchMap.labelName" placeholder="城市名称" />
      </el-form-item>
      <el-form-item label="审核状态">
        <el-switch v-model="searchMap.state" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
      </el-form-item>
      <el-form-item label="是否推荐">
        <el-switch v-model="searchMap.recommend" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
      </el-form-item>
      <el-button type="primary" @click="fetchData()">查询</el-button>
      <el-button type="primary" @click="searchMap={}">清空</el-button>
      <download-excel
        class="export-excel-wrapper"
        :data="list"
        :fields="jsonFields"
        name="labelData.xls"
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
      <el-table-column label="标签id" prop="id" width="200px" align="center" />
      <el-table-column label="标签名称" prop="labelName" width="200px" align="center" />
      <el-table-column label="审核状态" prop="state" width="200px" align="center" />
      <el-table-column label="使用人数" prop="count" width="200px" align="center" />
      <el-table-column label="是否推荐" prop="recommend" width="200px" align="center" />
      <el-table-column label="粉丝数" prop="fans" width="200px" align="center" />
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleExamine(scope.row.id)">审核</el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column></el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[5,10,20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="fetchData"
      @current-change="fetchData"
    />
    <el-dialog title="审核" :visible.sync="dialogExamineVisible">
      <el-form :model="pojo" label-width="80px">
        <el-form-item label="标签名称">
          {{ pojo.labelName }}
        </el-form-item>
        <el-button type="success" @click="handleGrant()">确认</el-button>
        <el-button type="danger" @click="handleDelete()">删除</el-button>
        <el-button type="primary" @click="dialogExamineVisible = false">关闭</el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="审核" :visible.sync="dialogEditVisible">
      <el-form :model="pojo" label-width="80px">
        <el-form-item label="标签名称">
          {{ pojo.labelName }}
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-switch v-model="pojo.recommend" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
        </el-form-item>
        <el-button type="success" @click="handleRecommend()">确认</el-button>
        <el-button type="primary" @click="dialogEditVisible = false">关闭</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import labelApi from '@/api/label'
export default {
  data() {
    return {
      jsonFields: {
        '标签id': 'id',
        '标签名称': 'labelName',
        '标签状态': 'state',
        '使用数': 'count',
        '是否推荐': 'recommend',
        '粉丝数': 'fans'
      },
      list: [], // 集合
      total: 0, // 总数
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页的数量
      searchMap: {
        state: '0'
      }, // 查询条件
      pojo: {},
      dialogExamineVisible: false,
      dialogEditVisible: false,
      id: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      labelApi.searchPage(this.currentPage, this.pageSize, this.searchMap).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    handleExamine(id) {
      this.id = id
      this.dialogExamineVisible = true
      if (id !== '') {
        labelApi.findById(this.id).then(res => {
          if (res.flag) {
            this.pojo = res.data
          }
        })
      } else {
        this.pojo = {}
      }
    },
    handleEdit(id) {
      this.id = id
      this.dialogEditVisible = true
      if (id !== '') {
        labelApi.findById(this.id).then(res => {
          if (res.flag) {
            this.pojo = res.data
          }
        })
      } else {
        this.pojo = {}
      }
    },
    handleRecommend() {
      labelApi.recommend(this.id, this.pojo.recommend).then(res => {
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
    },
    handleGrant() {
      labelApi.examine(this.id).then(res => {
        this.$message({
          message: res.message,
          type: (res.flag ? 'success' : 'error')
        })
        if (res.flag) {
          this.dialogExamineVisible = false
          this.fetchData()
          this.pojo = {}
        }
      })
    },
    handleDelete() {
      this.$confirm('确定要删除该标签吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        labelApi.deleteById(this.id).then(res => {
          this.$message({
            message: res.message,
            type: (res.flag ? 'success' : 'error')
          })
          if (res.flag) {
            this.dialogExamineVisible = false
            this.fetchData() // 刷新数据
          }
        })
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

