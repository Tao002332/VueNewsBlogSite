<template>
  <div>
    <div class="articles garr-container-white" style="min-height: 0px; padding-bottom: 0px; box-shadow: none;">
      <div class="search-wrap">
        <input v-model="searchMap.name" type="text" placeholder="请输入专栏名称关键词" class="search-input">
        <span class="search">
          <svg class="icon" aria-hidden="true" @click="fetchData">
            <use xlink:href="#icon4" />
          </svg>
        </span>
      </div>
      <div class="title-tab-status-wrap">
        <div class="filter-field">
          <span class="filter-title selected">专栏状态</span>
          <el-radio-group v-model="searchMap.state" size="small" @change="fetchData">
            <el-radio-button label="0">
              未审核
            </el-radio-button>
            <el-radio-button label="1">
              已审核
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="articles garr-container-white" style="margin-top: 20px;">
      <div v-if="list===[]" class="empty">
        <div class="empty-img" />
        <div class="empty-tip">
          您还没有专栏～
        </div>
        <div class="empty-btn">
          <button type="button" class="tui2-btn tui2-btn-size-default tui2-btn-primary publish-button">
            <nuxt-link to="/manager/publish">
              马上申请
            </nuxt-link>
          </button>
        </div>
      </div>
      <div>
        <ul v-infinite-scroll="loadMore" class="media">
          <li v-for="(item,index) in list" :key="index">
            <dl class="media-list">
              <dd>
                <a>
                  <h3>
                    {{ item.name }}
                  </h3>
                  <p>{{ item.createTime }}</p>
                </a>
              </dd>
              <dd class="relation">
                <div>
                  <span class="btn-attention">
                    <nuxt-link :to="{ path: '/manager/publish', query:{ cId:item.id, cName: item.name} }">
                      发表文章
                    </nuxt-link>
                  </span>
                </div>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import columnApi from '@/api/column'
export default {
  data () {
    return {
      list: [],
      searchMap: {},
      currentPage: 1
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      console.log(this.searchMap)
      columnApi.mySearchPage(this.searchMap, 1, 10).then((res) => {
        this.list = res.data.rows
      })
    },
    loadMore () {
      this.currentPage++
      columnApi.mySearchPage(this.searchMap, this.currentPage, 10).then((res) => {
        this.list = this.list.concat(res.data.rows)
      })
    }
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/manager.css';
@import '~/assets/css/userList.css';
.media li .media-list:after {
    width: 910px;
}
.media li .media-list>dd h3{
  margin-left: 40px;
}
.media li .media-list>dd p{
  margin-left: 40px;
}
.media li .media-list>dd.avatar-wrap>a:before {
   position: inherit;
}
</style>
