<template>
  <div>
    <!-- 2栏结构 -->
    <div class="pgc-content">
      <!-- content-left -->
      <ul class="tui2-menu-container garr-menu" style="position: fixed; top: 80px;">
        <li :class="mainShow?'tui2-menu-sub tui2-menu-sub-active':'tui2-menu-sub'" @click="mainShow=!mainShow">
          <div :class="mainShow?'tui2-menu-sub-title tui2-menu-sub-title-active tui2-menu-sub-title-hide':'tui2-menu-sub-title'">
            <span class="garr-sub-menu">
              主要功能
            </span>
          </div>
          <ul :class="mainShow?'tui2-menu-sub-menu tui2-menu-sub-menu-show':'tui2-menu-sub-menu'">
            <nuxt-link tag="li" to="/manager/managerHome" class="tui2-menu-item" active-class="tui2-menu-item-active" exact>
              <span>主页</span>
            </nuxt-link>
            <nuxt-link tag="li" to="/manager/publish" class="tui2-menu-item" active-class="tui2-menu-item-active" exact>
              <span>发布</span>
            </nuxt-link>
            <nuxt-link tag="li" to="/manager/managerHome/content" class="tui2-menu-item" active-class="tui2-menu-item-active">
              <span>内容</span>
            </nuxt-link>
            <nuxt-link tag="li" to="/manager/managerHome/activity" class="tui2-menu-item" active-class="tui2-menu-item-active">
              <span>活动</span>
            </nuxt-link>
            <nuxt-link tag="li" to="/manager/managerHome/share" class="tui2-menu-item" active-class="tui2-menu-item-active">
              <span>关注动态</span>
            </nuxt-link>
          </ul>
        </li>
        <li :class="infoShow?'tui2-menu-sub tui2-menu-sub-active':'tui2-menu-sub'" @click="infoShow=!infoShow">
          <div :class="infoShow?'tui2-menu-sub-title tui2-menu-sub-title-active tui2-menu-sub-title-hide':'tui2-menu-sub-title'">
            <span class="garr-sub-menu">
              <i />
              个人中心
            </span>
          </div>
          <ul :class="infoShow?'tui2-menu-sub-menu tui2-menu-sub-menu-show':'tui2-menu-sub-menu'">
            <nuxt-link tag="li" to="/manager/managerHome/userInfo" class="tui2-menu-item" active-class="tui2-menu-item-active">
              <span>账号设置</span>
            </nuxt-link>
            <nuxt-link tag="li" to="/userHome/myFans" class="tui2-menu-item" active-class="tui2-menu-item-active">
              <span>我的粉丝</span>
            </nuxt-link>
            <nuxt-link tag="li" to="/userHome/myFollow" class="tui2-menu-item" active-class="tui2-menu-item-active">
              <span>我的关注</span>
            </nuxt-link>
          </ul>
        </li>
      </ul>
      <div>
        <nuxt-child />
        <!-- footer -->
        <div class="pgc-footer" style="height: 97px;">
          <div class="sfoot">
            <div>
              <a>学习中</a>
              <span>|</span>
              <a>学习中</a>
              <span>|</span>
              <a>学习中</a>
              <span>|</span>
              <a>学习中</a>
              <span>|</span>
              <a>学习中</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mainShow: true,
      infoShow: false
    }
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/manager.css';
@import '~/assets/css/manager-index.css';
</style>
