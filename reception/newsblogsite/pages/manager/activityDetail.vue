<template>
  <div class="pgc-content">
    <div class="root">
      <div class="garr-container-white m-activitydetail">
        <div style="position: absolute; top: 352px;">
          <div class="activity-anchor-wrapper">
            <div class="activity-anchor-container" style="position: fixed; top: 120px;z-index:99;background:#ffff">
              <div class="activity-anchor">
                <nuxt-link to="#活动介绍" class="activity-anchor-item" active-class="active">
                  活动介绍
                </nuxt-link>
                <nuxt-link to="#活动时间" class="activity-anchor-item" active-class="active">
                  活动时间
                </nuxt-link>
                <nuxt-link to="#参与方式" class="activity-anchor-item" active-class="active">
                  参与方式
                </nuxt-link>
                <nuxt-link to="#活动规则" class="activity-anchor-item" active-class="active">
                  活动规则
                </nuxt-link>
                <nuxt-link to="#发布者" class="activity-anchor-item" active-class="active">
                  发布者
                </nuxt-link>
                <nuxt-link to="#城市" class="activity-anchor-item" active-class="active">
                  城市
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="activity-page">
          <!-- header 三层结构 -->
          <div class="activity-page-banner">
            <img :src="gatheringInfo.image">
          </div>
          <div class="activity-page-content">
            <div id="活动介绍" class="activity-page-body">
              <h1 class="activity-page-body-title">
                活动介绍
              </h1>
              <div class="activity-page-body-content">
                <p>{{ gatheringInfo.summary }}</p>
              </div>
            </div>
            <div id="活动时间" class="activity-page-body">
              <h1 class="activity-page-body-title">
                活动时间
              </h1>
              <div class="activity-page-body-content">
                <p>开始时间：{{ gatheringInfo.startTime }}</p>
                <p>结束时间：{{ gatheringInfo.endTime }}</p>
                <p>报名截止时间：{{ gatheringInfo.enrollTime }}</p>
              </div>
            </div>
            <div id="参与方式" class="activity-page-body">
              <h1 class="activity-page-body-title">
                参与方式
              </h1>
              <div class="activity-page-body-content">
                <p>均可参与</p>
              </div>
            </div>
            <div id="活动规则" class="activity-page-body">
              <h1 class="activity-page-body-title">
                活动规则
              </h1>
              <div class="activity-page-body-content">
                <p>{{ gatheringInfo.detail }}</p>
              </div>
            </div>
            <div id="发布者" class="activity-page-body">
              <h1 class="activity-page-body-title">
                发布者
              </h1>
              <div class="activity-page-body-content">
                <p>{{ gatheringInfo.sponsor }}</p>
              </div>
            </div>
            <div id="城市" class="activity-page-body">
              <h1 class="activity-page-body-title">
                城市
              </h1>
              <div class="activity-page-body-content">
                <p>{{ gatheringInfo.city }}</p>
              </div>
            </div>
          </div>
          <div class="activity-page-footer">
            <div class="activity-page-btn">
              <div class="link-button">
                <button type="button" class="tui2-btn tui2-btn-size-default tui2-btn-primary activity-button-left">
                  <span class="tui2-btn-content">
                    <nuxt-link :to="{ path: '/manager/publish', query:{ gId:gatheringInfo.id, gName: gatheringInfo.name} }">
                      发表文章
                    </nuxt-link>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import gatheringApi from '@/api/gathering'
export default {
  asyncData ({ query }) {
    return gatheringApi.findById(query.gatheringId).then((res) => {
      return {
        gatheringInfo: res.data
      }
    })
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/manager.css';
@import '~/assets/css/activity-detail.css';
</style>
