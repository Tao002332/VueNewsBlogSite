<template>
  <!-- content-right -->
  <div id="graphic" class="garr-panel">
    <div class="garr-container">
      <div class="task-list-plaza">
        <div class="task-name">
          创作活动
        </div>
        <div class="plaza-content">
          <div class="task-filter ">
            <div class="filter-item">
              <div class="item-label">
                活动状态
              </div>
              <div class="item-components active">
                <el-radio-group v-model="searchMap.state" size="small" @change="fetchData">
                  <el-radio-button label="0">
                    进行中
                  </el-radio-button>
                  <el-radio-button label="1">
                    已结束
                  </el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="filter-item">
              <div class="item-label">
                频道类型
              </div>
              <div class="item-components topic-wrap">
                <el-select v-model="searchMap.channelId" placeholder="请选择" filterable clearable @change="fetchData">
                  <el-option
                    v-for="item in channelList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </div>
          </div>
          <div class="search-ipt">
            <div class="byte-input-group-wrapper byte-input-group-wrapper-default" style="width: 287px;">
              <span class="byte-input-group">
                <span class="byte-input-inner-wrapper">
                  <span class="prefix" />
                  <input v-model="searchMap.name" type="text" placeholder="请搜索活动标题" class="byte-input byte-input-size-default byte-input-prefix" style="width:200px">
                  <Button type="button" class="searchButton" @click="fetchData">查询</Button>
                </span>
              </span>
            </div>
          </div>
          <div v-infinite-scroll="loadMore" class="task-list">
            <div v-for="(item,index) in list.rows" :key="index" class="task-card">
              <nuxt-link :to="{path:'/manager/activityDetail',query:{gatheringId:item.id}}">
                <svg class="icon hot-icon" aria-hidden="true">
                  <use xlink:href="#iconranqi-copy" />
                </svg>
                <div class="card-title">
                  {{ item.name }}
                </div>
                <div class="card-description">
                  {{ item.summary }}
                </div>
                <div class="card-numbers">
                  <span class="people-numbersno-money">{{ item.joinCount }}人参与</span>
                </div>
              </nuxt-link>
            </div>
          </div>
          <div class="byte-pagination mp-pagination-default-top-margin mp-pagination-right byte-pagination-size-default">
            <ul class="byte-pagination-list">
              <li class="byte-pagination-item byte-pagination-item-active">
                1
              </li>
              <li class="byte-pagination-item">
                2
              </li>
              <li class="byte-pagination-item">
                3
              </li>
            </ul>
            <div class="byte-pagination-option" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import gatheringApi from '@/api/gathering'
import channelApi from '@/api/channel'
export default {
  asyncData () {
    return channelApi.search({ state: '1' }).then((res) => {
      return { channelList: res.data }
    })
  },
  data () {
    return {
      list: [],
      pageNo: 1,
      searchMap: {
        state: '0'
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      console.log(this.searchMap)
      gatheringApi.searchPage(this.searchMap, 1, 10).then((res) => {
        this.list = res.data
      })
    },
    loadMore () {
      this.pageNo++
      gatheringApi.searchPage(this.searchMap, this.pageNo, 10).then((res) => {
        this.list.rows = this.list.rows.concat(res.data.rows)
      })
    }
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/manager.css';
@import '~/assets/css/manager-activity.css';
.searchButton{
    background-color: #fff;
    border: 1px solid #d8d8d8;
    color: #222222;
    display: inline-block;
    position: relative;
    outline: none;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    transition: all .3s;
    box-sizing: border-box;
    padding: 0 16px;
    font-size: 14px;
    height: 32px;
    line-height: 1.499;
}
</style>
