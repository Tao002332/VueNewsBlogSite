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
                      <img v-if="avatar" :src="avatar" onload="this.style.opacity=1;" style="opacity: 1;">
                      <svg v-else class="icon" aria-hidden="true" style="height:10px;width:10px">
                        <use xlink:href="#iconicon-user" />
                      </svg>
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
      <div class="middlebar">
        <div class="y-box middlebar-inner">
          <div class="y-left logo-box">
            <nuxt-link to="/" class="logo-link">
              <img src="~/assets/img/logo.png" class="logo">
            </nuxt-link>
          </div>
          <div class="y-right">
            <div style="margin-top: 9px; width: 340px;">
              <div class="wsearch">
                <div class="y-box input-group">
                  <input v-model="keyWord" type="text" class="y-left input-text" placeholder="请输入关键字">
                  <div class="y-right btn-submit">
                    <nuxt-link tag="button" class="tt-button tt-button--default" :to="{path:'/search',query:{kw:keyWord}}">
                      搜索
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="wrapper">
      <div class="yheader">
        <a href="#">
          <img :src="userInfo.avatar" class="bg-header" alt="头像">
        </a>
        <div>
          <a href="#">
            <img :src="userInfo.avatar" alt="作者头像" class="avatar">
          </a>
          <ul>
            <li class="title">
              <a href="#">
                <span class="name">{{ userInfo.nickname }}</span>
              </a>
            </li>
          </ul>
          <div>
            <span v-show="!mySelf && !isFollow" class="btn-attention ">
              <em>关注</em>
            </span>
            <span v-show="!mySelf && isFollow" class="btn-attention following ">
              <em>已关注</em>
            </span>
          </div>
        </div>
      </div>
      <div class="left">
        <div>
          <ul class="tab tab-0">
            <nuxt-link :to="{path:'/userHome',query:{uid: userInfo.id }}" tag="li" active-class="active" exact>
              文章
            </nuxt-link>
            <nuxt-link :to="{path:'/userHome/share',query:{uid: userInfo.id }}" tag="li" active-class="active">
              分享
            </nuxt-link>
            <nuxt-link v-if="mySelf" to="/userHome/collected" tag="li" active-class="active">
              收藏
            </nuxt-link>
            <nuxt-link v-if="mySelf" to="/userHome/myFans" tag="li" active-class="active">
              粉丝
            </nuxt-link>
            <nuxt-link v-if="mySelf" to="/userHome/myFollow" tag="li" active-class="active">
              关注
            </nuxt-link>
          </ul>
        </div>
        <nuxt-child />
      </div>
      <div class="right">
        <dl class="statistics">
          <dt>
            <a href="#">
              <h3>
                <em class="y-number"><i>{{ userInfo.followCount }}</i></em>
              </h3>
              <p>关注</p>
            </a>
          </dt>
          <dd>
            <a href="#">
              <h3>
                <em class="y-number"><i>{{ userInfo.fansCount }}</i></em>
              </h3>
              <p>粉丝</p>
            </a>
          </dd>
        </dl>
      </div>
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import channelApi from '@/api/channel'
import userApi from '@/api/user'
export default {
  asyncData () {
    return channelApi.search({ state: '1' }).then((res) => {
      return { channelList: res.data }
    })
  },
  data () {
    return {
      userInfo: {},
      keyWord: '',
      mySelf: false,
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
    this.fetchData()
  },
  methods: {
    fetchData () {
      if (getToken().token && this.nickname !== this.userInfo.nickname) {
        userApi.isFollow(this.userInfo.id).then((res) => {
          this.isFollow = res.flag
        })
      }
      if (this.$route.query.uid !== undefined && this.$route.query.uid !== '') {
        userApi.visitOtherById(this.$route.query.uid).then((res) => {
          this.userInfo = res.data
        })
      } else {
        if (!getToken().token) {
          this.$router.push('/login')
        }
        this.$store.dispatch('user/getInfo', getToken().token).then((res) => {
          this.userInfo = res.data
          this.mySelf = true
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
