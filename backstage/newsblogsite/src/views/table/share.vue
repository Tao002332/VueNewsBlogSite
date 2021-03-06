<template>
  <div class="app-container">
    <el-button type="primary" style="margin-left: 16px;" @click="display = true">
      显示查询条件
    </el-button>
    <download-excel
      class="export-excel-wrapper"
      :data="list"
      :fields="jsonFields"
      name="shareData.xls"
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
        <el-form-item label="用户id">
          <el-input v-model="searchMap.userId" placeholder="用户id" />
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
        <el-form-item label="更新日期">
          <el-date-picker
            v-model="searchMap.updateDateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="更新日期开始"
            end-placeholder="更新日期结束"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="是否公开">
          <el-switch v-model="searchMap.isPublic" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
        </el-form-item>
        <el-form-item label="是否置顶">
          <el-switch v-model="searchMap.isTop" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
        </el-form-item>
        <el-form-item label="审核状态">
          <el-switch v-model="searchMap.state" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
        </el-form-item>
        <el-form-item label="是否死亡">
          <el-switch v-model="searchMap.isDeath" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
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
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column label="分享id" prop="id" width="200px" align="center" />
      <el-table-column label="用户id" prop="userId" width="200px" align="center" />
      <el-table-column label="图片" width="200px" align="center">
        <template slot-scope="scope">
          <img width="100px;height:100px" :src="scope.row.image" alt="">
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="200px" align="center" sortable />
      <el-table-column label="修改时间" prop="updateTime" width="200px" align="center" sortable />
      <el-table-column label="是否公开" prop="isPublic" width="100px" align="center" />
      <el-table-column label="是否置顶" prop="isTop" width="100px" align="center" />
      <el-table-column label="状态" prop="state" width="100px" align="center" />
      <el-table-column label="是否死亡" prop="isDeath" width="100px" align="center" />
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">审核</el-button>
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
        <el-form-item label="用户id">
          {{ pojo.userId }}
        </el-form-item>
        <el-form-item label="封面">
          <img width="100px;height:100px" :src="pojo.image" alt="">
        </el-form-item>
        <el-form-item label="内容">
          <div v-html="pojo.content" />
        </el-form-item>
        <el-button type="success" @click="handleGrant()">确认</el-button>
        <el-button type="danger" @click="handleDelete()">删除</el-button>
        <el-button type="primary" @click="dialogEditVisible = false">关闭</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import shareApi from '@/api/share'
import drawer from '@/components/drawer/drawer'
export default {
  components: { drawer },
  data() {
    return {
      jsonFields: {
        '分享id': 'id',
        '用户id': 'userId',
        '内容': 'content',
        '封面': 'image',
        '创建时间': 'createTime',
        '更新时间': 'updateTime',
        '是否公开': 'isPublic',
        '是否置顶': 'isTop',
        '浏览人数': 'visits',
        '点赞': 'thumbup',
        '评论人数': 'comment',
        '审核状态': 'state',
        '是否死亡': 'isDeath'
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
      columnList: [],
      gatheringList: [],
      channelList: [],
      total: 0, // 总数
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页的数量
      searchMap: {
        isPublic: '1'
      }, // 查询条件
      pojo: {},
      dialogEditVisible: false,
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
      shareApi.searchPage(this.currentPage, this.pageSize, this.searchMap).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    handleEdit(id) {
      this.id = id
      this.dialogEditVisible = true
      if (id !== '') {
        shareApi.findById(this.id).then(res => {
          if (res.flag) {
            this.pojo = res.data
          }
        })
      } else {
        this.pojo = {}
      }
    },
    handleGrant() {
      shareApi.examine(this.id).then(res => {
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
    handleDelete() {
      this.$confirm('确定要删除该新闻吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        shareApi.deleteById(this.id).then(res => {
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
