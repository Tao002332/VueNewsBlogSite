<template>
  <div>
    <div class="articles garr-container-white" style="min-height: 0px; padding-bottom: 0px; box-shadow: none;">
      <div class="search-wrap">
        <input v-model="searchMap.title" type="text" placeholder="请输入标题关键词" class="search-input">
        <span class="search">
          <svg class="icon" aria-hidden="true" @click="fetchData">
            <use xlink:href="#icon4" />
          </svg>
        </span>
      </div>
      <div class="title-tab-status-wrap">
        <div class="filter-field">
          <span class="filter-title selected">新闻状态</span>
          <el-radio-group v-model="searchMap.state" size="small" @change="fetchData">
            <el-radio-button label="0">
              未审核
            </el-radio-button>
            <el-radio-button label="1">
              已审核
            </el-radio-button>
          </el-radio-group>
        </div>
        <div class="filter-field">
          <span class="filter-title selected">删除状态</span>
          <el-radio-group v-model="searchMap.isDeath" size="small" @change="fetchData">
            <el-radio-button label="0">
              未删除
            </el-radio-button>
            <el-radio-button label="1">
              已删除
            </el-radio-button>
          </el-radio-group>
        </div>
        <div class="filter-field">
          <span class="filter-title selected">置顶状态</span>
          <el-radio-group v-model="searchMap.isTop" size="small" @change="fetchData">
            <el-radio-button label="0">
              未置顶
            </el-radio-button>
            <el-radio-button label="1">
              已置顶
            </el-radio-button>
          </el-radio-group>
        </div>
        <div class="filter-field">
          <span class="filter-title selected">公开状态</span>
          <el-radio-group v-model="searchMap.isPublic" size="small" @change="fetchData">
            <el-radio-button label="0">
              私人
            </el-radio-button>
            <el-radio-button label="1">
              公开
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="articles garr-container-white" style="margin-top: 20px;">
      <div v-if="list===[]" class="empty">
        <div class="empty-img" />
        <div class="empty-tip">
          您还没有发布过文章～
        </div>
        <div class="empty-btn">
          <button type="button" class="tui2-btn tui2-btn-size-default tui2-btn-primary publish-button">
            <nuxt-link to="/manager/publish">
              马上发布
            </nuxt-link>
          </button>
        </div>
      </div>
      <div>
        <ul v-infinite-scroll="loadMore" class="media">
          <li v-for="(item,index) in list" :key="index">
            <dl class="media-list">
              <dd class="avatar-wrap">
                <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}">
                  <img v-if="item.image" :src="item.image" alt="">
                </nuxt-link>
              </dd>
              <dd>
                <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}">
                  <h3>
                    {{ item.title }}
                  </h3>
                  <p>{{ item.createTime }} | {{ item.comment }}人评论 |  {{ item.visits }}人浏览</p>
                </nuxt-link>
              </dd>
              <dd class="relation">
                <div>
                  <span class="btn-attention" @click="newsUpdate(item.id,item.isTop,'top')">
                    {{ item.isTop!='0'?'取消置顶':'置顶' }}
                  </span>
                  <span class="btn-attention" @click="newsUpdate(item.id,item.isPublic,'public')">
                    {{ item.isPublic!='0'?'私人':'公开' }}
                  </span>
                  <span class="btn-attention" @click="newsUpdate(item.id,item.isDeath,'death')">
                    {{ item.isDeath!='0'?'恢复':'删除' }}
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
import newsApi from '@/api/news'
export default {
  data () {
    return {
      list: [],
      searchMap: {
        isPublic: '1',
        isTop: '0',
        isDeath: '0'
      },
      currentPage: 1
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      newsApi.mySearchPage(this.searchMap, 1, 10).then((res) => {
        this.list = res.data.rows
      })
    },
    newsUpdate (id, value, name) {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        value = (value === '0') ? '1' : '0'
        newsApi.newsUpdate(id, value, name).then((res) => {
          if (res.flag) {
            this.fetchData()
          }
          this.$message({
            message: res.message,
            type: res.flag ? 'success' : 'error'
          })
        })
      })
    },
    loadMore () {
      this.currentPage++
      newsApi.mySearchPage(this.searchMap, this.currentPage, 10).then((res) => {
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
.media li .media-list>dd.avatar-wrap img {
  width: 100px;
  border-radius:0%;
}
.media li .media-list>dd h3{
  margin-left: 100px;
}
.media li .media-list>dd p{
  margin-left: 100px;
}
.media li .media-list>dd.avatar-wrap>a:before {
   position: inherit;
}
</style>
