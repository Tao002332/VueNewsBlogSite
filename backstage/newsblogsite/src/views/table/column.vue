<template>
  <div class="app-container">
    <el-button type="primary" style="margin-left: 16px;" @click="display = true">
      显示查询条件
    </el-button>
    <download-excel
      class="export-excel-wrapper"
      :data="list"
      :fields="jsonFields"
      name="columnData.xls"
    >
      <el-button type="primary">导出EXCEL</el-button>
    </download-excel>
    <drawer
      title="查询条件"
      :display.sync="display"
      :inner="true"
      :width="drawerWidth"
      :mask="true"
    >
      <el-form ref="searchMap" :model="searchMap" label-width="100px" auto-complete="on" label-position="left">
        <el-form-item label="专栏名称">
          <el-input v-model="searchMap.name" placeholder="专栏名称" />
        </el-form-item>
        <el-form-item label="申请人id">
          <el-input v-model="searchMap.userId" placeholder="申请人id" />
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker
            v-model="searchMap.createDateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="创建日期开始"
            end-placeholder="创建日期结束"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="确认日期">
          <el-date-picker
            v-model="searchMap.checkDateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="确认日期开始"
            end-placeholder="确认日期结束"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="审核状态">
          <el-switch v-model="searchMap.state" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
        </el-form-item>
        <el-button type="primary" @click="fetchData()">查询</el-button>
        <el-button type="primary" @click="searchMap={}">清空</el-button>

      </el-form>
    </drawer>
    <br>
    <el-table
      :data="list"
      border
      style="width:100%"
      stripe
    >
      <el-table-column prop="id" label="专栏ID" width="180px" align="center" />
      <el-table-column prop="name" label="专栏名称" width="180px" align="center" />
      <el-table-column prop="userId" label="申请人" width="180px" align="center" />
      <el-table-column prop="createTime" label="创建时间" width="180px" align="center" />
      <el-table-column prop="checkTime" label="确认时间" width="180px" align="center" />
      <el-table-column prop="state" label="审核" width="180px" align="center" />
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleExamine(scope.row.id)">审核</el-button>
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
    <el-dialog title="审核" :visible.sync="dialogExamineVisible">
      <el-form :model="pojo" label-width="80px">
        <el-form-item label="专栏名称">
          {{ pojo.name }}
        </el-form-item>
        <el-form-item label="描述">
          {{ pojo.summary }}
        </el-form-item>
        <el-form-item label="用户id">
          {{ pojo.userId }}
        </el-form-item>
        <el-button type="success" @click="handleGrant()">确认</el-button>
        <el-button type="danger" @click="handleDelete()">删除</el-button>
        <el-button type="primary" @click="dialogExamineVisible = false">关闭</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import columnApi from '@/api/column'
import drawer from '@/components/drawer/drawer'
export default {
  components: { drawer },
  data() {
    return {
      jsonFields: {
        '专栏id': 'id',
        '专栏名称': 'name',
        '专栏描述': 'summary',
        '用户id': 'userId',
        '创建时间': 'createTime',
        '确认时间': 'checkTime',
        '专栏状态': 'state'
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
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
      id: '',
      display: false,
      drawerWidth: '40%'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log(this.searchMap)
      columnApi.searchPage(this.currentPage, this.pageSize, this.searchMap).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    handleExamine(id) {
      this.id = id
      this.dialogExamineVisible = true
      if (id !== '') {
        columnApi.findById(this.id).then(res => {
          if (res.flag) {
            this.pojo = res.data
          }
        })
      } else {
        this.pojo = {}
      }
    },
    handleGrant() {
      columnApi.examine(this.id).then(res => {
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
      this.$confirm('确定要删除该专栏吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        columnApi.deleteById(this.id).then(res => {
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
