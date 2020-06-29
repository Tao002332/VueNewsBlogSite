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
                <div class="rbox-inner">
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
              </div>
              <div v-if="item.image" class="lbox">
                <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}" class="img-wrap">
                  <img :src="item.image" style="height:100px;width:150px">
                </nuxt-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
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
  </div>
</template>
<script>
import newsApi from '@/api/news'
export default {
  data () {
    return {
      total: 0, // 总数
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页的数量
      list: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      if (this.$route.query.uid === undefined) {
        newsApi.mySearchPage({ state: '1', isDeath: '0', isPublic: '1' }, this.currentPage, this.pageSize).then((res) => {
          this.list = res.data.rows
          this.total = res.data.total
        })
      } else {
        newsApi.searchPage({ userId: this.$route.query.uid, state: '1', isDeath: '0', isPublic: '1' }, this.currentPage, this.pageSize).then((res) => {
          this.list = res.data.rows
          this.total = res.data.total
        })
      }
    }
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/search.css';
@import '~/assets/css/user.css';
</style>
