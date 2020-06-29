<template>
  <div>
    <div class="feedBox">
      <div class="relatedFeed">
        <ul class="media">
          <li v-if="myFollowList===[]" class="empty">
            暂无内容
          </li>
          <li v-for="(item,index) in myFollowList" :key="index">
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
                  <span class="btn-attention" @click="handleCancelFollow(item.id)">
                    取消关注
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
      myFollowList: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      userApi.getFollowlist().then((res) => {
        this.myFollowList = res.data
      })
    },
    handleCancelFollow (id) {
      this.$confirm('确定要取消关注该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userApi.deleteFollow(id).then((res) => {
          this.$message({
            message: res.message,
            type: res.flag ? 'success' : 'error'
          })
          if (res.flag) {
            this.fetchData()
          }
        })
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
