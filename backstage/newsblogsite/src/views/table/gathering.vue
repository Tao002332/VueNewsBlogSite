<template>
  <div class="app-container">
    <el-button type="primary" style="margin-left: 16px;" @click="display = true">
      显示查询条件
    </el-button>
    <el-button type="primary" @click="handleEdit('')">添加活动</el-button>
    <download-excel
      class="export-excel-wrapper"
      :data="list"
      :fields="jsonFields"
      name="gatheringData.xls"
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
        <el-form-item label="活动名称">
          <el-input v-model="searchMap.name" placeholder="活动名称" />
        </el-form-item>
        <el-form-item label="主办方">
          <el-input v-model="searchMap.sponsor" placeholder="主办方" />
        </el-form-item>
        <el-form-item label="活动开始日期">
          <el-date-picker
            v-model="searchMap.startDateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="活动结束日期">
          <el-date-picker
            v-model="searchMap.endDateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="举办地址">
          <el-input v-model="searchMap.address" placeholder="举办地址" />
        </el-form-item>
        <el-form-item label="报名截止日期">
          <el-date-picker
            v-model="searchMap.enrollDateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="活动状态">
          <el-switch v-model="searchMap.state" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
        </el-form-item>
        <el-form-item label="所属频道">
          <el-select v-model="searchMap.channelId" placeholder="所属频道" filterable clearable>
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select v-model="searchMap.province" placeholder="省" style="width:100px" filterable clearable @change="GetCityList(searchMap.province,'1')">
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.cityName"
              :value="item.id"
            />
          </el-select>
          <el-select v-show="searchMap.province" v-model="searchMap.municipal" placeholder="市" style="width:100px" filterable clearable @change="GetCityList(searchMap.municipal,'')">
            <el-option
              v-for="item in municipalList"
              :key="item.id"
              :label="item.cityName"
              :value="item.id"
            />
          </el-select>
          <el-select v-show="searchMap.municipal" v-model="searchMap.county" style="width:100px" placeholder="县" filterable clearable>
            <el-option
              v-for="item in countyList"
              :key="item.id"
              :label="item.cityName"
              :value="item.id"
            />
          </el-select>
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
      <el-table-column prop="id" label="活动ID" width="200px" align="center" />
      <el-table-column prop="name" label="活动名称" width="200px" align="center" />
      <el-table-column prop="sponsor" label="主办方" width="200px" align="center" />
      <el-table-column prop="sponsor" label="活动显示图片" width="200px" align="center">
        <template slot-scope="scope">
          <img width="100px;height:100px" :src="scope.row.image" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="200px" align="center" />
      <el-table-column prop="endTime" label="结束时间" width="200px" align="center" />
      <el-table-column prop="enrollTime" label="报名截止" width="200px" align="center" />
      <el-table-column prop="state" label="活动状态" width="200px" align="center" />
      <el-table-column prop="channelId" label="频道id" width="200px" align="center" />
      <el-table-column prop="city" label="城市" width="200px" align="center" />
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
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="pojo.name" placeholder="活动名称" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="活动简介" prop="summary">
          <el-input v-model="pojo.summary" placeholder="活动简介" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="详细说明" prop="detail">
          <el-input v-model="pojo.detail" type="textarea" placeholder="详细说明" maxlength="200" show-word-limit />
        </el-form-item>
        <el-form-item label="主办方" prop="sponsor">
          <el-input v-model="pojo.sponsor" placeholder="主办方" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3001/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="img"
          >
            <img v-if="pojo.image?true:showimg" :src="pojo.image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="活动时间" prop="selectTime">
          <el-date-picker
            v-model="pojo.selectTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="举办地址" prop="address">
          <el-input v-model="pojo.address" placeholder="举办地址" maxlength="100" show-word-limit />
        </el-form-item>
        <el-form-item label="报名截止" prop="enrollTime">
          <el-date-picker
            v-model="pojo.enrollTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="报名截止日期"
          />
        </el-form-item>
        <el-form-item label="活动状态">
          <el-switch v-model="pojo.state" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" />
        </el-form-item>
        <el-form-item label="所属频道" prop="channelId" filterable clearable>
          <el-select v-model="pojo.channelId" placeholder="所属频道">
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select v-model="pojo.province" placeholder="省" style="width:100px" filterable clearable @change="GetCityList(pojo.province,'1')">
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.cityName"
              :value="item.id"
            />
          </el-select>
          <el-select v-show="pojo.province" v-model="pojo.municipal" placeholder="市" style="width:100px" filterable clearable @change="GetCityList(pojo.municipal,'2')">
            <el-option
              v-for="item in municipalList"
              :key="item.id"
              :label="item.cityName"
              :value="item.id"
            />
          </el-select>
          <el-select v-show="pojo.municipal" v-model="pojo.county" style="width:100px" placeholder="县" filterable clearable>
            <el-option
              v-for="item in countyList"
              :key="item.id"
              :label="item.cityName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-button type="success" @click="handleSave('pojo')">确认</el-button>
        <el-button type="success" @click="resetForm('pojo')">重置表单</el-button>
        <el-button type="primary" @click="dialogEditVisible = false">关闭</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import gatheringApi from '@/api/gathering'
import cityApi from '@/api/city'
import channelApi from '@/api/channel'
import drawer from '@/components/drawer/drawer'
export default {
  components: { drawer },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '输入活动名称', trigger: 'blur' },
          { require: true, min: 3, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '输入活动简介', trigger: 'blur' },
          { require: true, min: 3, max: 200, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '输入详细细节', trigger: 'blur' },
          { require: true, min: 3, max: 200, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sponsor: [
          { required: true, message: '请输入主办方名称', trigger: 'blur' },
          { require: true, min: 3, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        selectTime: [
          { required: true, message: '请选择活动时间', trigger: ['blur', 'change'] }
        ],
        address: [
          { required: true, message: '请输入详细地点', trigger: 'blur' }
        ],
        enrollTime: [
          { required: true, message: '请设置报名截止的时间', trigger: ['blur', 'change'] }
        ],
        channelId: [
          { required: true, message: '请选择所属频道', trigger: ['blur', 'change'] }
        ]
      },
      jsonFields: {
        '活动id': 'id',
        '活动名称': 'name',
        '活动简介': 'summary',
        '活动细节': 'detail',
        '主持人': 'sponsor',
        '封面': 'image',
        '开始时间': 'startTime',
        '结束时间': 'endTime',
        '详细地址': 'address',
        '报名截止时间': 'enrollTime',
        '活动状态': 'state',
        '频道id': 'channelId',
        '参与人数': 'joinCount',
        '城市': 'city'
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
      searchMap: {}, // 查询条件
      pojo: {},
      dialogEditVisible: false,
      id: '',
      showimg: false,
      display: false,
      drawerWidth: '40%',
      provinceList: [],
      municipalList: [],
      countyList: [],
      channelList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      gatheringApi.searchPage(this.currentPage, this.pageSize, this.searchMap).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
      cityApi.search({ type: '1' }).then(res => {
        this.provinceList = res.data
      })
      channelApi.getList().then(res => {
        this.channelList = res.data
      })
    },
    GetCityList(id, index) {
      console.log(id)
      cityApi.search({ pid: id }).then(res => {
        if (index === '1') {
          this.municipalList = res.data
        } else if (index === '2') {
          this.countyList = res.data
        }
      })
    },
    handleEdit(id) {
      this.id = id
      this.dialogEditVisible = true
      if (id !== '') {
        gatheringApi.findById(this.id).then(res => {
          if (res.flag) {
            this.pojo = res.data
            this.pojo.province = this.pojo.city.split(':')[0]
            this.pojo.municipal = this.pojo.city.split(':')[1]
            this.pojo.county = this.pojo.city.split(':')[2]
            this.pojo.selectTime = [
              this.pojo.startTime,
              this.pojo.endTime
            ]
          }
        })
      } else {
        this.pojo = {}
      }
    },
    handleSave(pojo) {
      this.getMap(this.pojo)
      this.$refs[pojo].validate(valid => {
        if (valid) {
          gatheringApi.update(this.id, this.pojo).then(res => {
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
    },
    resetForm(pojo) {
      this.$refs[pojo].resetFields()
      this.pojo = {}
    },
    getMap(map) {
      if (map.selectTime) {
        map.startTime = map.selectTime[0]
        map.endTime = map.selectTime[1]
      }
      if (map.province || map.municipal || map.county) {
        map.city = `${map.province}:${map.municipal}:${map.county}`
      }
    },
    handleAvatarSuccess(res) {
      this.pojo.img = res.info
      this.$nextTick(() => {
        this.showimg = true
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式或png!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
</style>
