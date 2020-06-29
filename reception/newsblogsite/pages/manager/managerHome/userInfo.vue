<template>
  <!-- content-right -->
  <div id="graphic" class="garr-panel">
    <div class="garr-container">
      <div class="byte-tabs byte-tabs-horizontal byte-tabs-line byte-tabs-size-default">
        <div class="byte-tabs-header-nav byte-tabs-header-nav-horizontal byte-tabs-header-size-default byte-tabs-header-nav-line">
          <div class="byte-tabs-header-scroll is-dropdown">
            <div class="byte-tabs-header-wrapper">
              <div class="byte-tabs-header" style="transform: translateX(0px);">
                <nuxt-link to="/manager/managerHome/userInfo" class="byte-tabs-header-title" active-class="active" exact>
                  账号信息
                </nuxt-link>
                <nuxt-link to="/manager/managerHome/userInfo/blackList" class="byte-tabs-header-title" active-class="active">
                  黑名单
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nuxt-child />
  </div>
</template>
<style lang="css" scoped>
@import '~/assets/css/manager.css';
@import '~/assets/css/manager-info.css';
</style>
