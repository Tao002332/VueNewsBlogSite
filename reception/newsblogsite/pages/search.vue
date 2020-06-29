<template>
  <div class="y-wrap">
    <!-- 头部 -->
    <div id="header">
      <div style="height: 34px; background: #222;">
        <div class="y-box wtopbar">
          <div class="y-left y-nav-topbar">
            <div class="nav">
              <ul class="y-box nav-list">
                <li v-for="(item,index) in channelList" :key="index" class="y-left nav-item">
                  <nuxt-link :to="{path:'/',query:{channelId: item.id }}" class="nav-link ">
                    {{ item.name }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <ul class="y-right">
            <li class="tb-item userbox">
              <div class="y-box wuserbox">
                <nuxt-link to="/manager/publish" class="y-left new-article">
                  发布
                </nuxt-link>
                <div class="y-right username">
                  <a href="/userHome" class="user-head">
                    <div class="user-image">
                      <img :src="avatar" onload="this.style.opacity=1;" style="opacity: 1;">
                    </div>
                    <span>{{ nickname }}</span>
                  </a>
                </div>
              </div>
            </li>
            <li class="tb-item">
              <a class="tb-link" href="javascript:void(0)">反馈</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- content -->
    <div class="y-box container">
      <div class="y-left index-left">
        <a class="logo-wrap" href="index.html">
          <img src="plugins/ckeditor/samples/old/assets/inlineall/logo.png">
        </a>
      </div>
      <div class="y-left index-middle">
        <div class="searchBar">
          <div class="y-box">
            <div class="y-left search-content">
              <input v-model="searchMap.title" type="text" placeholder="输入你想要的">
            </div>
            <div class="y-right">
              <button type="button" class="search-btn" @click="fetchData">
                搜索
              </button>
            </div>
          </div>
        </div>
        <div class="bui-left index-content">
          <div class="feed-infinite-wrapper" style="background: #fff;padding-left: 20px;">
            <ul v-infinite-scroll="loadMore">
              <li v-for="(item,index) in searchList" :key="index">
                <div :class="item.image?'bui-box single-mode':'no-mode'">
                  <div v-if="item.image" class="bui-left single-mode-lbox">
                    <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}" class="img-wrap">
                      <img :src="item.image" class="lazy-load-img">
                    </nuxt-link>
                  </div>
                  <div :class="item.image?'single-mode-rbox':''">
                    <div :class="item.image?'single-mode-rbox-inner':''">
                      <div class="title-box">
                        <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}" class="link" v-html="item.title" />
                      </div>
                      <div class="bui-box footer-bar">
                        <div class="bui-left footer-bar-left">
                          <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}" class="footer-bar-action tag tag-style-other">
                            {{ item.channelName }}
                          </nuxt-link>
                          <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}" class="footer-bar-action publish-avatar">
                            <img v-if="item.userAvator" :src="item.userAvator">
                            <svg v-else class="icon" aria-hidden="true" style="height:10px;width:10px">
                              <use xlink:href="#iconicon-user" />
                            </svg>
                          </nuxt-link>
                          <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}" class="footer-bar-action source">
                            {{ item.userNickname }}
                          </nuxt-link>
                          <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}" class="footer-bar-action source">
                            {{ item.comment }}评论
                          </nuxt-link>
                          <span class="footer-bar-action">{{ item.createTime | ellipsis }}</span>
                        </div>
                        <div class="bui-right">
                          <div class="action-dislike">
                            <i class="bui-icon icon-close_small" style="font-size: 16px; color: rgb(221, 221, 221);">x</i>
                            不感兴趣
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="y-right index-right" />
    </div>
    <!-- 底部声明 -->
    <div class="footer-push" />
    <div id="footer">
      <div>
        <a href="javascript:;" class="fitem">学习中</a>
        <a href="javascript:;" class="fitem">学习中</a>
        <a href="javascript:;" class="fitem">学习中</a>
        <a href="javascript:;" class="fitem">学习中</a>
        <a href="javascript:;" class="fitem">学习中</a>
      </div>
    </div>
    <backTop />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import channelApi from '@/api/channel'
import searchApi from '@/api/search'
import backTop from '@/components/backTop.vue'
export default {
  filters: {
    ellipsis (value) {
      if (!value) { return '' }
      return new Date(value).toLocaleString()
    }
  },
  components: { backTop },
  asyncData () {
    return channelApi.search({ state: '1' }).then((res) => {
      return { channelList: res.data }
    })
  },
  data () {
    return {
      pageNo: 1,
      keyWords: '',
      searchMap: {},
      searchList: []
    }
  },
  computed: {
    ...mapGetters([
      'nickname',
      'avatar'
    ])
  },
  created () {
    if (this.$route.query.kw !== undefined && this.$route.query.kw !== '') {
      this.searchMap.title = this.$route.query.kw
    }
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.pageNo = 1
      this.keyWords = this.searchMap.title
      searchApi.searchPage(this.searchMap, 1, 10).then((res) => {
        this.searchList = this.changeColor(res.data.rows)
      })
    },
    changeColor (resultsList) {
      resultsList.map((item, index) => {
        // console.log('item', item)
        if (this.keyWords && this.keyWords.length > 0) {
          // 匹配关键字正则
          const replaceReg = new RegExp(this.keyWords, 'g')
          // 高亮替换v-html值
          const replaceString =
            '<span class="search-text">' + this.keyWords + '</span>'
          resultsList[index].title = item.title.replace(
            replaceReg,
            replaceString
          )
        }
      })
      return resultsList
    },
    loadMore () {
      this.pageNo++
      searchApi.searchPage(this.searchMap, this.pageNo, 10).then((res) => {
        this.searchList = this.searchList.concat(this.changeColor(res.data.rows))
      })
    }

  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/search.css';
@import '~/assets/css/head-footer.css';
@import '~/assets/css/head-index.css';
</style>
