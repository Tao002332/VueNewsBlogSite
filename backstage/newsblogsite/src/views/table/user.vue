<template>
  <div class="app-container">
    <el-button type="primary" style="margin-left: 16px;" @click="display = true">
      显示查询条件
    </el-button>
    <download-excel
      class="export-excel-wrapper"
      :data="list"
      :fields="jsonFields"
      name="userData.xls"
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
        <el-form-item label="手机号">
          <el-input v-model="searchMap.mobile" placeholder="登录名称" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="searchMap.nickname" placeholder="昵称" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="searchMap.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item label="注册日期">
          <el-date-picker
            v-model="searchMap.regDateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="注册日期开始"
            end-placeholder="注册日期结束"
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
        <el-form-item label="最后登录日期">
          <el-date-picker
            v-model="searchMap.lastDateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="最后登录日期开始"
            end-placeholder="最后登录日期结束"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-switch v-model="searchMap.sex" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
        </el-form-item>
        <el-form-item label="兴趣">
          <el-input v-model="searchMap.interest" placeholder="兴趣" />
        </el-form-item>
        <el-form-item label="个性">
          <el-input v-model="searchMap.personality" placeholder="个性" />
        </el-form-item>
        <el-form-item label="是否认证">
          <el-switch v-model="searchMap.isAuth" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
        </el-form-item>
        <el-form-item label="用户状态">
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
      <el-table-column label="用户id" prop="id" width="200px" align="center" />
      <el-table-column label="手机号" prop="mobile" width="150px" align="center" />
      <el-table-column label="密码" prop="password" width="150px" align="center" />
      <el-table-column label="昵称" prop="nickname" width="150px" align="center" />
      <el-table-column label="性别" prop="sex" width="100px" align="center" />
      <el-table-column label="头像" width="200px" align="center">
        <template slot-scope="scope">
          <img width="100px;height:100px" :src="scope.row.avatar" alt="">
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email" width="300px" align="center" />
      <el-table-column label="注册日期" prop="regDate" width="200px" align="center" />
      <el-table-column label="更新日期" prop="updateDate" width="200px" align="center" />
      <el-table-column label="最后登录" prop="lastDate" width="200px" align="center" />
      <el-table-column label="兴趣" prop="interest" width="200px" align="center" />
      <el-table-column label="个性" prop="personality" width="200px" align="center" />
      <el-table-column label="是否认证" prop="isAuth" width="100px" align="center" />
      <el-table-column label="认证名称" prop="authName" width="200px" align="center" />
      <el-table-column label="状态" prop="state" width="100px" align="center" />
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-button v-if="scope.row.isAuth!=1" type="primary" size="small" @click="handleEdit(scope.row.id)">认证</el-button>
          <el-button v-if="scope.row.state==1" type="danger" size="small" @click="handleForbind(scope.row.id,0)">封禁</el-button>
          <el-button v-if="scope.row.state==0" type="success" size="small" @click="handleForbind(scope.row.id,1)">解禁</el-button>
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
          {{ pojo.id }}
        </el-form-item>
        <el-form-item label="认证名称">
          {{ pojo.authName }}
        </el-form-item>
        <el-button type="success" @click="handleAuth(true)">认证通过</el-button>
        <el-button type="danger" @click="handleAuth(false)">认证失败</el-button>
        <el-button type="primary" @click="dialogEditVisible = false">关闭</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import userApi from '@/api/user'
import drawer from '@/components/drawer/drawer'
export default {
  components: { drawer },
  data() {
    return {
      jsonFields: {
        '用户id': 'id',
        '手机号': 'mobile',
        '密码': 'password',
        '昵称': 'nickname',
        '性别': 'sex',
        '生日': 'birthday',
        '头像': 'avatar',
        '邮箱': 'email',
        '注册日期': 'regDate',
        '更新日期': 'updateDate',
        '最后登录日期': 'lastDate',
        '在线时长': 'online',
        '兴趣': 'interest',
        '个性': 'personality',
        '粉丝数': 'fansCount',
        '关注数': 'followCount',
        '是否认证': 'isAuth',
        '认证名称': 'authName',
        '用户状态': 'state'
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
        isAuth: '0'
      }, // 查询条件
      dialogEditVisible: false,
      pojo: {},
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
      userApi.searchPage(this.currentPage, this.pageSize, this.searchMap).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    handleEdit(id) {
      this.id = id
      this.dialogEditVisible = true
      if (id !== '') {
        userApi.findById(this.id).then(res => {
          if (res.flag) {
            this.pojo = res.data
          }
        })
      } else {
        this.pojo = {}
      }
    },
    handleAuth(flag) {
      if (flag) {
        userApi.examine(this.id).then(res => {
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
        userApi.update(this.id, { isAuth: '0', authName: '' }).then(res => {
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
      }
    },
    handleForbind(id, forbindState) {
      this.$confirm('确定要继续吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userApi.stateChange(id, forbindState).then(res => {
          this.$message({
            message: res.message,
            type: (res.flag ? 'success' : 'error')
          })
          if (res.flag) {
            this.fetchData() // 刷新数据
            this.pojo = {}
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

  .el-form-item {
      margin-bottom: 10px;
  }
</style>
