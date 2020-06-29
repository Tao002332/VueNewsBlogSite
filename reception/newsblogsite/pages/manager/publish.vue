<template>
  <!-- 内容 -->
  <div class="pgc-content">
    <div id="graphic" class="garr-panel">
      <div class="garr-container">
        <div class="garr-menu-tab">
          <div class="garr-menu-tab-back">
            <span>
              <!-- <nuxt-link to="/manager/managerHome">
                返回
              </nuxt-link> -->
            </span>
          </div>
          <div class="tui2-tabs tui2-tabs-top garr-menu-tab-content garr-tab-publish">
            <div class="tui2-tabs-bar">
              <nuxt-link to="/manager/publish" class="tui2-tabs-tab" active-class="tui2-tabs-tab-active" exact>
                新闻
              </nuxt-link>
              <nuxt-link to="/manager/publish/pShare" class="tui2-tabs-tab" active-class="tui2-tabs-tab-active">
                分享
              </nuxt-link>
              <nuxt-link to="/manager/publish/pColumn" class="tui2-tabs-tab" active-class="tui2-tabs-tab-active">
                专栏申请
              </nuxt-link>
            </div>
          </div>
        </div>
        <nuxt-child />
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="css" scoped>
@import '~/assets/css/manager.css';
@import '~/assets/css/publish.css';
.pgc-content{
  margin-top: 70px;
  background: #e8e8e8;
}
</style>
