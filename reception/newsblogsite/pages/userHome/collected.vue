<template>
  <div>
    <div class="feedBox">
      <div class="relatedFeed">
        <ul>
          <li v-if="list===[]" class="empty">
            暂无内容
          </li>
          <li v-for="(item,index) in list" :key="index" class="item">
            <span id="ad_extra" style="display:none;" />
            <div class="item-inner  y-box">
              <div class="normal rbox ">
                <div class="rbox-inner" style="width:80%">
                  <div class="title-box">
                    <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}" class="link title">
                      {{ item.title }}
                    </nuxt-link>
                  </div>
                  <div class="y-box footer">
                    <div class="y-left">
                      <span v-show="item.isTop==1" class="lbtn ltop">置顶</span>
                      <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}" class="lbtn">
                        {{ item.visits }}阅读 ·
                      </nuxt-link>
                      <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}" class="lbtn comment">
                        {{ item.comment }}评论
                      </nuxt-link>
                      <span class="lbtn">· {{ item.createTime }}</span>
                    </div>
                  </div>
                </div>
                <div style="width:20%;display: inline-block;margin:auto 0px">
                  <el-button type="danger" @click="handleCollected(item.id)">
                    取消收藏
                  </el-button>
                </div>
              </div>
              <div class="lbox">
                <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}" class="img-wrap">
                  <img :src="item.image" style="height:100px;width:150px">
                </nuxt-link>
              </div>
            </div>
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
      list: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      newsApi.userCollected().then((res) => {
        this.list = res.data
      })
    },
    handleCollected (id) {
      newsApi.deleteCollect(id).then((res) => {
        if (res.flag) {
          this.fetchData()
        }
        this.$message({
          message: res.message,
          type: res.flag ? 'success' : 'error'
        })
      })
    }
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/search.css';
@import '~/assets/css/user.css';
</style>
