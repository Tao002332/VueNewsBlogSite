<template>
  <div class="app-container">
    <el-form ref="searchMap" :model="searchMap" label-width="90px" :inline="true">
      <el-form-item label="城市名称">
        <el-input v-model="searchMap.cityName" placeholder="城市名称" />
      </el-form-item>
      <el-form-item label="城市类型">
        <el-select v-model="searchMap.type" placeholder="城市类型" filterable clearable>
          <el-option
            v-for="item in typeList"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="fetchData()">查询</el-button>
      <el-button type="primary" @click="searchMap={}">清空</el-button>
    </el-form>
    <el-table
      :data="list"
      border
      style="width:100%"
      stripe
    >
      <el-table-column label="城市id" prop="id" width="200px" align="center" />
      <el-table-column label="城市父id" prop="pid" width="200px" align="center" />
      <el-table-column label="城市名称" prop="cityName" width="200px" align="center" />
      <el-table-column label="城市类型" prop="type" width="200px" align="center" />
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
  </div>
</template>
<script>
import cityApi from '@/api/city'
export default {
  data() {
    return {
      typeList: [
        { typeId: '0', typeName: '国' },
        { typeId: '1', typeName: '省' },
        { typeId: '2', typeName: '市' },
        { typeId: '3', typeName: '县' }
      ],
      list: [], // 集合
      total: 0, // 总数
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页的数量
      searchMap: {} // 查询条件
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      cityApi.searchPage(this.currentPage, this.pageSize, this.searchMap).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    }
  }
}
</script>
