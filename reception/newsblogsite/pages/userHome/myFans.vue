<template>
  <div>
    <div class="feedBox">
      <div class="relatedFeed">
        <ul class="media">
          <li v-if="myFansList===[]" class="empty">
            暂无内容
          </li>
          <li v-for="(item,index) in myFansList" :key="index">
            <dl class="media-list">
              <dd class="avatar-wrap">
                <a :href="'/userHome?uid='+item.id">
                  <img :src="item.avatar" alt="">
                </a>
              </dd>
              <dd>
                <a :href="'/userHome?uid='+item.id">
                  <h3>
                    {{ item.nickname }}
                  </h3>
                </a>
              </dd>
              <dd class="relation">
                <div>
                  <span class="btn-attention" @click="handleFollow(item.id)">
                    关注
                  </span>
                </div>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>
    <backTop />
  </div>
</template>
<script>
import userApi from '@/api/user'
import backTop from '@/components/backTop.vue'
export default {
  components: { backTop },
  data () {
    return {
      myFansList: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      userApi.getFanslist().then((res) => {
        this.myFansList = res.data
      })
    },
    handleFollow (id) {
      userApi.saveFollow(id).then((res) => {
        this.$message({
          message: res.message,
          type: res.flag ? 'success' : 'error'
        })
        if (res.flag) {
          this.fetchData()
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
@import '~/assets/css/search.css';
@import '~/assets/css/user.css';
@import '~/assets/css/userList.css';
</style>
