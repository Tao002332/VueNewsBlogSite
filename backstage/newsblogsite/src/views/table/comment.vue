<template>
  <div class="app-container">
    <el-button type="primary" style="margin-left: 16px;" @click="display = true">
      显示查询条件
    </el-button>
    <download-excel
      class="export-excel-wrapper"
      :data="list"
      :fields="jsonFields"
      name="commentData.xls"
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
      <el-form :model="searchMap" label-width="80px" auto-complete="on" label-position="left">
        <el-form-item label="评论id">
          <el-input v-model="searchMap._id" placeholder="评论id" />
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker
            v-model="searchMap.publishDateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="用户id">
          <el-input v-model="searchMap.userId" placeholder="用户id" />
        </el-form-item>
        <el-form-item label="评论状态">
          <el-switch v-model="searchMap.state" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
        </el-form-item>
        <el-form-item label="评论父id">
          <el-input v-model="searchMap.parentId" placeholder="评论父id" />
        </el-form-item>
        <el-form-item label="所属类型">
          <el-select v-model="searchMap.originType" placeholder="所属类型" filterable clearable>
            <el-option
              v-for="item in originTypeList"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="searchMap.originType" label="所属id">
          <el-input v-model="searchMap.originId" placeholder="所属id" />
        </el-form-item>
        <el-button type="primary" @click="fetchData()">查询</el-button>
        <el-button type="primary" @click="searchMap={}">清空</el-button>
      </el-form>
    </drawer>
    <br>
    <el-table
      :data="list"
      border
      style="width: 100%"
      stripe
    >
      <el-table-column prop="_id" label="评论ID" width="180px" align="center" />
      <el-table-column prop="publishTime" label="发布时间" width="180px" align="center" />
      <el-table-column prop="userId" label="用户id" width="180px" align="center" />
      <el-table-column prop="nickname" label="用户昵称" width="180px" align="center" />
      <el-table-column prop="state" label="评论状态" width="180px" align="center" />
      <el-table-column prop="parentId" label="父id" width="180px" align="center" />
      <el-table-column prop="originId" label="所属id" width="180px" align="center" />
      <el-table-column prop="originType" label="所属类型" width="180px" align="center" />
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row._id)">审核</el-button>
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
    <el-dialog title="编辑" :visible.sync="dialogEditVisible">
      <el-form :model="pojo" label-width="80px">
        <el-form-item label="评论内容">
          <div v-html="pojo.content" />
        </el-form-item>
        <el-button type="success" @click="handleGrant()">确定</el-button>
        <el-button type="danger" @click="handleDelete()">删除</el-button>
        <el-button type="primary" @click="dialogEditVisible = false">关闭</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import commentApi from '@/api/comment'
import drawer from '@/components/drawer/drawer'
export default {
  components: { drawer },
  data() {
    return {
      jsonFields: {
        '评论id': '_id',
        '评论内容': 'content',
        '发布时间': 'publishTime',
        '发布者id': 'userId',
        '发布者昵称': 'nickname',
        '点赞数': 'thumbup',
        '评论数': 'comment',
        '评论状态': 'state',
        '评论父id': 'parentId',
        '所属id': 'originId',
        '所属类型': 'originType'
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
      originTypeList: [
        { typeId: '0', typeName: '新闻' },
        { typeId: '1', typeName: '分享' }
      ],
      list: [], // 集合
      total: 0, // 总数
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页的数量
      searchMap: {}, // 查询条件
      pojo: {},
      dialogEditVisible: false,
      display: false,
      drawerWidth: '40%',
      id: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log(this.searchMap)
      commentApi.searchPage(this.currentPage, this.pageSize, this.searchMap).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    handleEdit(id) {
      this.id = id
      this.dialogEditVisible = true
      commentApi.findById(this.id).then(res => {
        if (res.flag) {
          this.pojo = res.data
        }
      })
    },
    handleGrant() {
      commentApi.examine(this.id).then(res => {
        if (res.flag) {
          this.dialogEditVisible = false
          this.$message({
            message: res.message,
            type: (res.flag ? 'success' : 'error')
          })
        }
      })
    },
    handleDelete() {
      this.$confirm('确定要删除该评论吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        commentApi.deleteById(this.id).then(res => {
          this.$message({
            message: res.message,
            type: (res.flag ? 'success' : 'error')
          })
          if (res.flag) {
            this.dialogEditVisible = false
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
