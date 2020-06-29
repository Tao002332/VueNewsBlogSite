<template>
  <div class="main">
    <!-- header -->
    <div class="common-header">
      <div class="topbar">
        <div class="bui-left clearfix" />
        <div class="bui-right">
          <ul class="user-nav-list clearfix">
            <li class="new-article">
              <nuxt-link to="/manager/publish" class="tb-link">
                发布
              </nuxt-link>
            </li>
            <li>
              <div class="tt-dropdown">
                <div class="tt-dropdown-link tb-link">
                  <a class="user-name" href="manager-index.html" />
                  <nuxt-link to="/userHome" class="user-name">
                    <img :src="avatar" class="user-avatar">
                    {{ nickname }}
                  </nuxt-link>
                </div>
              </div>
            </li>
            <li>
              <a class="tb-link" href="/">反馈</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="middlebar">
        <div class="middlebar-inner clearfix" style="width: 1170px;">
          <div class="bui-left logo-box">
            <nuxt-link to="/" class="logo-link">
              <img src="~/assets/img/logo.png" class="logo">
            </nuxt-link>
          </div>
          <div class="bui-left chinese-tag">
            <nuxt-link to="/">
              首页
            </nuxt-link> /
            <nuxt-link :to="{path:'/',query:{channelId: channelInfo.id }}">
              {{ channelInfo.name }}
            </nuxt-link> /
            <span class="text">正文</span>
          </div>
          <div class="bui-right">
            <div class="search-wrapper">
              <div class="search-wrap">
                <div class="tt-autocomplete">
                  <div class="tt-input tt-input-group tt-input-group--append">
                    <input v-model="keyWord" type="text" class="tt-input__inner" placeholder="搜索站内资讯、或用户">
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
          </div>
        </div>
      </div>
    </div>
    <div class="bui-box container">
      <!-- left        -->
      <div class="bui-left index-left">
        <div class="share-box">
          <a class="share-count" href="#comment_area">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconpinglun" />
            </svg>
            <span>{{ newsInfo.comment }}</span>
          </a>
          <div class="share-hr" />
          <div class="share-type">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconqq" />
            </svg>
            <span>转发</span>
          </div>
          <div class="share-type">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconweixin" />
            </svg>
            <span>转发</span>
          </div>
        </div>
      </div>
      <!--  content        -->
      <div class="bui-left index-middle">
        <div class="article-box">
          <h1 class="article-title">
            {{ newsInfo.title }}
          </h1>
          <br>
          <hr>
          <br>
          <div class="article-content" v-html="newsInfo.content" />
          <div class="article-sub">
            <span>{{ newsInfo.createTime }}</span>
          </div>
          <div class="bui-box article-tag">
            <div class="bui-right">
              <div v-show="!collected" class="repin" @click="handelCollect">
                <svg class="icon collectIcon" aria-hidden="true">
                  <use xlink:href="#iconshoucang" />
                </svg>
                <span>收藏</span>
              </div>
              <div v-show="collected" class="repin">
                <svg class="icon collectIcon" aria-hidden="true">
                  <use xlink:href="#iconshoucang-copy" />
                </svg>
                <span>已收藏</span>
              </div>
            </div>
          </div>
          <div class="detail-comment">
            <a id="comment_area" href="#" />
            <div id="comment">
              <div class="c-header">
                <em>{{ newsInfo.comment }}</em> 条评论
              </div>
              <div class="inputBox">
                <div v-show="commentReply===''" class="bui-box">
                  <div class="avatar-wrap avatar-wrap-center">
                    <img v-if="!avatar" src="~/assets/img/user.png">
                    <img v-if="avatar" :src="avatar">
                  </div>
                  <div class="input-wrap">
                    <div class="c-textarea">
                      <textarea v-model="commentText" placeholder="写下评论" />
                    </div>
                    <div class="c-action">
                      <div class="c-submit" @click="handleComment('0')">
                        评论
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ul>
                <li v-for="(item,index) in commentList" :key="index" class="c-item">
                  <nuxt-link :to="{path:'/userHome',query:{uid: item.userId }}" class="avatar-wrap">
                    <img src="~/assets/img/user.png">
                  </nuxt-link>
                  <div class="c-content">
                    <div class="c-user-info">
                      <nuxt-link :to="{path:'/userHome',query:{uid: item.userId }}" class="c-user-name">
                        {{ item.nickname }}
                      </nuxt-link>
                      <span class="c-create-time">{{ item.publishTime }}</span>
                      <p>{{ item.content }}</p>
                    </div>
                    <div class="c-footer-action">
                      <span class="c-reply" @click="getChildrenCommnet(item._id,index)">回复</span>
                      <span title="点赞" class="bui-right c-digg">
                        {{ item.thumbup }}
                        <svg class="icon collectIcon" aria-hidden="true">
                          <use xlink:href="#iconbuoumaotubiao17-copy" />
                        </svg>
                      </span>
                    </div>
                    <div v-show="commentReply===index" class="J_input_0">
                      <span class="c-reply" @click="clearChildrenList">收起</span>
                      <div class="inputBox">
                        <div v-for="(item2,index2) in childrenCommnetList" :key="index2">
                          <div class="c-user-info">
                            <nuxt-link :to="{path:'/userHome',query:{uid: item2.userId }}" class="c-user-name">
                              {{ item2.nickname }}
                            </nuxt-link>
                            <span class="c-create-time">{{ item2.publishTime }}</span>
                            <p>{{ item2.content }}</p>
                          </div>
                        </div>
                        <div class="bui-box">
                          <div class="input-wrap not-main">
                            <div class="c-textarea">
                              <textarea v-model="commentText" placeholder="写下评论" />
                            </div>
                            <div class="c-action">
                              <div class="c-submit" @click="handleComment(item._id)">
                                回复
                              </div>
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
      </div>
      <!-- right -->
      <div class="bui-right index-right">
        <div class="pane-module">
          <div class="user-card">
            <div class="user-card-head">
              <nuxt-link :to="{path:'/userHome',query:{uid: userInfo.id }}" class="user-card-avatar">
                <img v-if="userInfo.avatar" :src="userInfo.avatar">
                <svg v-else class="icon" aria-hidden="true" style="height:52px;width:52px;line-height:52px">
                  <use xlink:href="#iconicon-user" />
                </svg>
              </nuxt-link>
              <div class="user-card-name">
                <nuxt-link :to="{path:'/userHome',query:{uid: userInfo.id }}">
                  {{ userInfo.nickname }}
                </nuxt-link>
                <div class="subscribe">
                  <div v-show="!isFollow" class="left-arrow subscribe-btn" @click="handleFollow">
                    <span>关注</span>
                  </div>
                  <div v-show="isFollow" class="left-arrow unsubscribe-btn">
                    <span>已关注</span>
                  </div>
                </div>
              </div>
            </div>
            <ul class="user-card-article-list">
              <li v-for="(item,index) in lastTop5" :key="index" class="user-card-article-item">
                <a :href="'/articleDetail?newsId='+item.id">{{ item.title }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <backTop />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import commentApi from '@/api/comment'
import newsApi from '@/api/news'
import channelApi from '@/api/channel'
import userApi from '@/api/user'
import backTop from '@/components/backTop.vue'
export default {
  components: { backTop },
  asyncData ({ query }) {
    if (query.newsId === undefined || query.newsId === '') {
      return false
    }
    return newsApi.findById(query.newsId).then((res) => {
      if (res.flag) {
        newsApi.addvisits(query.newsId)
        return {
          newsInfo: res.data
        }
      }
    })
  },
  data () {
    return {
      channelInfo: {},
      userInfo: {},
      lastTop5: [],
      commentList: [],
      childrenCommnetList: [],
      commentText: '',
      commentReply: '',
      keyWord: '',
      collected: false,
      isFollow: false
    }
  },
  computed: {
    ...mapGetters([
      'nickname',
      'avatar'
    ])
  },
  created () {
    if (this.$route.query.newsId !== undefined && this.$route.query.newsId !== '') {
      this.fetchData()
    }
  },
  mounted () {
    if (this.nickname !== undefined && this.nickname !== '') {
      newsApi.isCollected(this.newsInfo.id).then((res) => {
        this.collected = res.flag
      })
    }
  },
  methods: {
    fetchData () {
      if (this.nickname !== undefined && this.nickname !== '' && this.nickname !== this.userInfo.nickname) {
        userApi.isFollow(this.userInfo.id).then((res) => {
          this.isFollow = res.flag
        })
      }
      channelApi.findById(this.newsInfo.channelId).then((res) => {
        this.channelInfo = res.data
      })
      userApi.visitOtherById(this.newsInfo.userId).then((res) => {
        this.userInfo = res.data
      })
      newsApi.getLastTop5(this.newsInfo.userId).then((res) => {
        this.lastTop5 = res.data
      })
      this.getCommentList('0')
    },
    getCommentList (pid) {
      commentApi.search({ parentId: pid, state: '1', originId: this.newsInfo.id, originType: '1' }).then((res) => {
        if (pid === '0') {
          this.commentList = res.data
        } else {
          this.childrenCommnetList = res.data
        }
      })
    },
    checkLogginged () {
      if (this.nickname === undefined || this.nickname === '') {
        this.$message({
          message: '请先登录',
          type: 'error'
        })
        return false
      }
      return true
    },
    handleComment (pid) {
      if (!this.checkLogginged()) {
        this.commentText = ''
        return false
      }
      const comment = {
        content: this.commentText,
        nickname: this.nickname,
        parentId: pid,
        originId: this.newsInfo.id,
        originType: '1'
      }
      commentApi.save(comment).then((res) => {
        if (res.flag) {
          this.getCommentList('0')
          this.commentText = ''
          this.commentReply = ''
        }
        this.$message({
          message: res.message,
          type: res.flag ? 'success' : 'error'
        })
      })
    },
    handelCollect () {
      if (!this.checkLogginged()) {
        return false
      }
      newsApi.collect(this.newsInfo.id).then((res) => {
        if (res.flag) {
          this.collected = true
        }
        this.$message({
          message: res.message,
          type: res.flag ? 'success' : 'error'
        })
      })
    },
    handleFollow () {
      if (!this.checkLogginged()) {
        return false
      }
      userApi.saveFollow(this.userInfo.id).then((res) => {
        if (res.flag) {
          this.isFollow = true
        }
        this.$message({
          message: res.message,
          type: res.flag ? 'success' : 'error'
        })
      })
    },
    getChildrenCommnet (pid, index) {
      this.commentReply = index
      this.getCommentList(pid)
    },
    clearChildrenList () {
      this.commentReply = ''
      this.childrenCommnetList = []
    }
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/head-footer.css';
@import '~/assets/css/detail.css';
.collectIcon{
  font-size: 18px;
  color: rgb(202, 202, 202);
  height:14px;
  width:14px
}

</style>
