<template>
  <!-- content-right -->
  <div id="graphic" class="garr-panel">
    <div class="garr-container">
      <div class="garr-menu-tab">
        <div class="tui2-tabs tui2-tabs-top garr-menu-tab-content garr-tab-content">
          <div class="tui2-tabs-bar">
            <div>
              <nuxt-link to="/manager/managerHome/content" tag="div" class="tui2-tabs-tab" active-class="tui2-tabs-tab-active" exact>
                新闻
              </nuxt-link>
              <nuxt-link to="/manager/managerHome/content/share" tag="div" class="tui2-tabs-tab" active-class="tui2-tabs-tab-active">
                分享
              </nuxt-link>
              <nuxt-link to="/manager/managerHome/content/column" tag="div" class="tui2-tabs-tab" active-class="tui2-tabs-tab-active">
                专栏
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nuxt-child />
  </div>
</template>
<script>
export default {

}
</script>
<style lang="css" scoped>
@import '~/assets/css/manager.css';
</style>
