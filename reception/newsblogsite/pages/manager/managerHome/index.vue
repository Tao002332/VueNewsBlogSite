<template>
  <!-- content-right -->
  <div class="garr-panel">
    <div class="garr-container">
      <div class="pgc-home">
        <div class="announcement">
          <!-- <div class="notice-wrap">
            <span class="intro">公告</span>
            <div class="content">
              <div class="item">
                <span class="notice-time">3:20</span>
                <a href="detail.html" class="notice-name">dadasdsadad</a>
              </div>
              <div class="item">
                <span class="notice-time">3:20</span>
                <a href="detail.html" class="notice-name">dadasdsadad</a>
              </div>
            </div>
          </div>
          <a class="home-go-more" href="#">更多</a> -->
        </div>
        <div class="home-top-container">
          <div class="common-dashboard common-dashboard-level-3 home-dashboard">
            <div class="common-dashboard-column">
              <div class="common-dashboard-primary">
                <a href="#">{{ userInfo.followCount }}</a>
              </div>
              <div class="common-dashboard-secondary">
                <div class="second-child">
                  关注数
                </div>
              </div>
            </div>
            <div class="common-dashboard-column">
              <div class="common-dashboard-primary">
                <a href="#">{{ userInfo.fansCount }}</a>
              </div>
              <div class="common-dashboard-secondary">
                <div class="second-child">
                  粉丝数
                </div>
              </div>
            </div>
          </div>
          <div class="start-write">
            <button v-if="userInfo.isAuth==0" type="button" class="byte-btn byte-btn-primary byte-btn-size-default byte-btn-shape-square" @click="dialogEditVisible=true">
              <span>前往认证</span>
            </button>
            <span class="greeting">晚上好，{{ userInfo.nickname }}</span>
          </div>
          <el-dialog
            title="修改"
            :visible.sync="dialogEditVisible"
          >
            <el-form ref="userInfo" :model="userInfo" label-width="80px">
              <el-form-item label="审核名称" prop="authName">
                <el-input v-model="userInfo.authName" placeholder="审核名称" />
              </el-form-item>
              <button type="button" class="byte-btn byte-btn-default byte-btn-size-default byte-btn-shape-square item-btn" @click="handleUpdate('userInfo')">
                提交
              </button>
            </el-form>
          </el-dialog>
        </div>
        <div class="home-content discovery">
          <div class="byte-tabs byte-tabs-horizontal byte-tabs-line byte-tabs-size-default">
            <div class="byte-tabs-header-nav byte-tabs-header-nav-horizontal byte-tabs-header-size-default byte-tabs-header-nav-line">
              <div class="byte-tabs-header-scroll is-dropdown">
                <div class="byte-tabs-header-wrapper">
                  <div class="byte-tabs-header">
                    <div class="byte-tabs-header-title active">
                      创作活动
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="byte-tabs-content byte-tabs-content-horizontal">
              <div class="byte-tabs-content-inner" style="margin-left: 0%">
                <div class="byte-tabs-content-item byte-tabs-content-item-active">
                  <div class="byte-tabs-pane activity-tab">
                    <div class="wrap-discover">
                      <div class="pgc-home-activity">
                        <nuxt-link to="/manager/managerHome/activity" class="home-go-more activity-more">
                          更多
                        </nuxt-link>
                        <div v-infinite-scroll="loadMore" class="task-list">
                          <div v-for="(item,index) in gatheringList.rows" :key="index" class="task-card">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import gatheringApi from '@/api/gathering'
import userApi from '@/api/user'
export default {
  data () {
    return {
      userInfo: {},
      gatheringList: [],
      pageNo: 1,
      dialogEditVisible: false
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      if (!getToken().token) {
        return false
      }
      this.$store.dispatch('user/getInfo', getToken().token).then((res) => {
        if (res.flag) {
          this.userInfo = res.data
        }
      })
      gatheringApi.searchPage({ state: '0' }, 1, 10).then((res) => {
        this.gatheringList = res.data
      })
    },
    loadMore () {
      this.pageNo++
      gatheringApi.searchPage({ state: '0' }, this.pageNo, 10).then((res) => {
        this.gatheringList.rows = this.gatheringList.rows.concat(res.data.rows)
      })
    },
    handleUpdate (userInfo) {
      this.$refs[userInfo].validate((valid) => {
        if (valid) {
          userApi.saveInfo(this.userInfo).then((res) => {
            if (res.flag) {
              this.fetchData()
              this.dialogEditVisible = false
            }
            this.$message({
              message: res.message,
              type: res.flag ? 'success' : 'error'
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/manager.css';
@import '~/assets/css/manager-index.css';
</style>
