<template>
  <div id="root" class="full-screen">
    <div class="pgc-wrapper">
      <!-- header 三层结构 -->
      <div class="garr-header">
        <div class="shead_wrap">
          <nuxt-link to="/manager" class="shead_logo">
            logo
          </nuxt-link>
          <div class="shead_right">
            <div class="sys-msg">
              <div>
                <a href="#" class="sys-msg-entity">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconmessage" />
                  </svg>
                </a>
              </div>
            </div>
            <div class="user-panel">
              <div class="information">
                <a title="主页" @click="showLogout=!showLogout">
                  <div class="new_user_avatar">
                    <img v-if="avatar" :src="avatar">
                    <svg v-else class="icon" aria-hidden="true">
                      <use xlink:href="#iconicon-user" />
                    </svg>
                  </div>
                  <div class="new_user_info">
                    <div class="new_user_name">
                      <span>{{ nickname }}</span>
                    </div>
                  </div>
                </a>
              </div>
              <div v-show="showLogout" class="author_dashbord">
                <ul>
                  <li class="author">
                    <span>
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconshezhi" />
                      </svg>
                      账号设置
                    </span>
                  </li>
                  <li class="loginout">
                    <span @click="logout">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icontuichu" />
                      </svg>
                      退出登录
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nuxt-child />
    </div>
    <backTop />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import backTop from '@/components/backTop.vue'
export default {
  components: { backTop },
  data () {
    return {
      showLogout: false
    }
  },
  computed: {
    ...mapGetters([
      'nickname',
      'avatar'
    ])
  },
  mounted () {
    setTimeout(() => {
      if (this.nickname === undefined || this.nickname === '') {
        this.$router.push('/login')
      }
    }, 1000)
  },
  methods: {
    logout () {
      this.showLogout = false
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/manager.css';
@import '~/assets/css/manager-index.css';
.icon {
    width: 16px;
    height: 16px;
}
</style>
