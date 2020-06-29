<template>
  <div class="main">
    <!-- header -->
    <div class="common-header">
      <div class="topbar">
        <div class="bui-left clearfix">
          <a href="#" class="tb-link">下载</a>
          <nuxt-link :to="{path:'/login',query:{isRegister:true}}" class="tb-link">
            注册
          </nuxt-link>
        </div>
        <div class="bui-right">
          <nuxt-link to="/manager/publish" class="tb-link">
            发布
          </nuxt-link>
          <a href="#" class="tb-link">投诉</a>
        </div>
      </div>
    </div>
    <div class="bui-box container">
      <!-- left        -->
      <div class="bui-left index-channel">
        <ul>
          <li>
            <a :class="isActive == '0'?'channel-item active':'channel-item'" @click="getPublicSearchList()">
              <span>推荐</span>
            </a>
          </li>
          <li v-for="(item,index) in channelList" :key="index">
            <a :class="isActive == item.id ?'channel-item active':'channel-item'" @click="getSearchList(item.id)">
              <span>{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </div>
      <!--  content        -->
      <div class="bui-left index-content">
        <div class="feed-infinite-wrapper">
          <ul v-infinite-scroll="loadMore">
            <li v-for="(item,index) in searchList.rows" :key="index">
              <div :class="item.image?'bui-box single-mode':'no-mode'">
                <div v-if="item.image" class="bui-left single-mode-lbox">
                  <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}" class="img-wrap">
                    <img :src="item.image" class="lazy-load-img">
                  </nuxt-link>
                </div>
                <div :class="item.image?'single-mode-rbox':''">
                  <div :class="item.image?'single-mode-rbox-inner':''">
                    <div class="title-box">
                      <nuxt-link :to="{path:'/articleDetail',query:{newsId:item.id}}" class="link">
                        {{ item.title }}
                      </nuxt-link>
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
      <!-- right -->
      <div class="bui-right index-right-bar">
        <div class="search-wrapper">
          <div class="search-wrap">
            <div class="tt-autocomplete">
              <div class="tt-input tt-input-group tt-input-group--append">
                <input v-model="keyWord" type="text" class="tt-input__inner">
                <div class="tt-input-group__append">
                  <nuxt-link tag="button" class="tt-button tt-button--default" :to="{path:'/search',query:{kw:keyWord}}">
                    搜索
                  </nuxt-link>
                </div>
              </div>
              <div class="tt-autocomplete-suggestion" style="display: none;" />
            </div>
          </div>
        </div>
        <div>
          <div class="outer">
            <div v-if="userInfo.nickname!='' && userInfo.nickname!=undefined" class="logged inner">
              <div class="top">
                <p class="logout">
                  <a @click="logout()">退出登录</a>
                </p>
                <div>
                  <nuxt-link to="/userHome">
                    <img v-if="userInfo.avatar" :src="userInfo.avatar" class="head">
                    <svg v-else class="icon" aria-hidden="true">
                      <use xlink:href="#iconicon-user" />
                    </svg>
                  </nuxt-link>
                  <p class="name">
                    <nuxt-link to="/userHome">
                      {{ userInfo.nickname }}
                    </nuxt-link>
                  </p>
                </div>
              </div>
              <ul class="bottom">
                <li>
                  <nuxt-link to="/user">
                    <p class="num">
                      {{ userInfo.followCount }}
                    </p>
                    <br>
                    <p class="word">
                      关注
                    </p>
                  </nuxt-link>
                </li>
                <li class="line" />
                <li>
                  <nuxt-link to="/user">
                    <p class="num">
                      {{ userInfo.fansCount }}
                    </p>
                    <br>
                    <p class="word">
                      粉丝
                    </p>
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <div v-if="userInfo.nickname=='' || userInfo.nickname==undefined" class="login inner">
              <p class="login-msg">
                登录后可以保存您的浏览喜好、评论、收藏，并与APP同步，更可以发布微头条
              </p>
              <nuxt-link to="login">
                <button class="login-button" type="button">
                  登录
                </button>
              </nuxt-link>
              <ul class="third-login">
                <li class="sns">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconqq" />
                  </svg>
                  <span>QQ</span>
                </li>
                <li class="sns weixin">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconweixin" />
                  </svg>
                  <span>微信</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="company">
          <p> © 学习中</p>
          <p> 静态模型</p>
          <p> 奥力给</p>
        </div>
      </div>
    </div>
    <backTop />
  </div>
</template>
<script>
// import '~/assets/css/head-footer.css'
// import '~/assets/css/head-index.css'
import { getToken } from '@/utils/auth'
import channelApi from '@/api/channel'
import searchApi from '@/api/search'
import backTop from '@/components/backTop.vue'
export default {
  name: 'Index',
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
      isActive: '0',
      pageNo: 1,
      keyWord: '',
      userInfo: {},
      searchList: []
    }
  },
  created () {
    if (this.$route.query.channelId !== undefined && this.$route.query.channelId !== '') {
      this.getSearchList(this.$route.query.channelId)
    } else {
      this.getPublicSearchList()
    }
    this.getInfo()
  },
  methods: {
    getInfo () {
      if (!getToken().token) {
        return false
      }
      this.$store.dispatch('user/getInfo', getToken().token).then((res) => {
        if (res.flag) {
          this.userInfo = res.data
        }
      })
    },
    logout () {
      this.userInfo = {}
      this.$store.dispatch('user/logout')
    },
    getPublicSearchList () {
      this.isActive = '0'
      this.pageNo = 1
      searchApi.searchPage({ isPublic: '1' }, 1, 10).then((res) => {
        this.searchList = res.data
      })
    },
    getSearchList (id) {
      this.isActive = id
      this.pageNo = 1
      searchApi.searchPage({ channelId: this.isActive }, 1, 10).then((res) => {
        this.searchList = res.data
      })
    },
    loadMore () {
      this.pageNo++
      searchApi.searchPage({ channelId: this.isActive }, this.pageNo, 10).then((res) => {
        this.searchList.rows = this.searchList.rows.concat(res.data.rows)
      })
    }
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/head-footer.css';
@import '~/assets/css/head-index.css';
</style>
