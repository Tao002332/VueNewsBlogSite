<template>
  <div class="app-container">
    <el-form ref="searchMap" :model="searchMap" label-width="80px" :inline="true">
      <el-form-item label="登录名称">
        <el-input v-model="searchMap.loginName" placeholder="登录名称" />
      </el-form-item>
      <el-form-item label="权限状态">
        <el-select v-model="searchMap.state" placeholder="权限状态" filterable clearable>
          <el-option
            v-for="item in stateList"
            :key="item.stateId"
            :label="item.stateName"
            :value="item.stateId"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="fetchData()">查询</el-button>
      <el-button type="primary" @click="searchMap={}">清空</el-button>
      <el-button v-if="stateId==2" type="primary" @click="dialogAddVisible=true">添加</el-button>
      <download-excel
        class="export-excel-wrapper"
        :data="list"
        :fields="jsonFields"
        name="adminData.xls"
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
      <el-table-column label="管理员id" prop="id" width="380" align="center" />
      <el-table-column label="登录名称" prop="loginName" width="300" align="center" />
      <el-table-column label="登录密码" prop="password" width="300" align="center" />
      <el-table-column label="权限状态" prop="state" width="300" align="center" />
      <el-table-column
        v-if="stateId==2"
        fixed="right"
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">修改授权</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
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
      <el-form :model="editPojo" label-width="80px">
        <el-form-item label="登录名称">
          {{ editPojo.loginName }}
        </el-form-item>
        <el-form-item label="权限状态">
          <el-select v-model="editPojo.state" placeholder="权限状态" filterable clearable>
            <el-option
              v-for="item in stateList"
              :key="item.stateId"
              :label="item.stateName"
              :value="item.stateId"
            />
          </el-select>
        </el-form-item>
        <el-button type="success" @click="handleGrant()">保存</el-button>
        <el-button type="primary" @click="dialogEditVisible = false">关闭</el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="添加" :visible.sync="dialogAddVisible">
      <el-form ref="addPojo" :model="addPojo" label-width="80px" class="demo-ruleForm" :rules="rules" auto-complete="on" label-position="left">
        <el-form-item label="登录名称" prop="loginName">
          <el-input v-model="addPojo.loginName" placeholder="登录名称" style="width:400px" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="addPojo.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            style="width:400px"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item label="权限状态" prop="state">
          <el-select v-model="addPojo.state" placeholder="权限状态" style="width:400px" filterable clearable>
            <el-option
              v-for="item in stateList"
              :key="item.stateId"
              :label="item.stateName"
              :value="item.stateId"
            />
          </el-select>
        </el-form-item>
        <el-button type="success" @click="handleSave('addPojo')">添加</el-button>
        <el-button type="primary" @click="dialogAddVisible = false">关闭</el-button>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
import adminApi from '@/api/admin'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      stateList: [
        { stateId: '0', stateName: '已作废' },
        { stateId: '1', stateName: '基础操作' },
        { stateId: '2', stateName: '高级操作' }
      ],
      jsonFields: {
        'admin Id': 'id',
        '登录名称': 'loginName',
        '密码': 'password',
        '状态': 'state'
      },
      rules: {
        loginName: [
          { required: true, message: '输入登录名称', trigger: 'blur' },
          { min: 6, max: 20, message: '最少5位 最多20位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '最少5位 最多20位', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择一个权限', trigger: 'change' }
        ]
      },
      list: [], // 集合
      total: 0, // 总数
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页的数量
      searchMap: {
        state: '1'
      }, // 查询条件
      id: '', // 当前id
      dialogEditVisible: false,
      dialogAddVisible: false,
      editPojo: {},
      addPojo: {},
      passwordType: 'password'
    }
  },
  computed: {
    ...mapGetters([
      'stateId'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      adminApi.searchPage(this.currentPage, this.pageSize, this.searchMap).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    handleEdit(id) {
      this.id = id
      this.dialogEditVisible = true
      if (id !== '') {
        adminApi.findById(id).then(res => {
          if (res.flag) {
            this.editPojo = res.data
          }
        })
      } else {
        this.editPojo = {}
      }
    },
    handleGrant() {
      adminApi.grant(this.id, this.editPojo.state).then(res => {
        this.$message({
          message: res.message,
          type: (res.flag ? 'success' : 'error')
        })
        if (res.flag) {
          this.fetchData()
        }
      })
      this.dialogEditVisible = false
    },
    handleDelete(id) {
      this.$confirm('确定要删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        adminApi.deleteById(id).then(res => {
          this.$message({
            message: res.message,
            type: (res.flag ? 'success' : 'error')
          })
          if (res.flag) {
            this.fetchData() // 刷新数据
          }
        })
      })
    },
    handleSave(addPojo) {
      this.dialogAddVisible = false
      this.$refs[addPojo].validate(valid => {
        if (valid) {
          adminApi.save(this.addPojo).then(res => {
            this.$message({
              message: res.message,
              type: (res.flag ? 'success' : 'error')
            })
            if (res.flag) {
              this.addPojo = {}
              this.fetchData() // 刷新数据
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
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
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
