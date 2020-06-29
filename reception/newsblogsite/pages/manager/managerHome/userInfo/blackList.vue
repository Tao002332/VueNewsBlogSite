<template>
  <div class="garr-container-white pgc-blacklist">
    <div v-if="blacklist===[]" class="blacklist">
      <div class="x-empty-text">
        暂无数据
      </div>
    </div>
    <div>
      <ul class="media">
        <li v-for="(item,index) in blacklist" :key="index">
          <dl class="media-list">
            <dd class="avatar-wrap">
              <a>
                <img :src="item.avatar" alt="">
              </a>
            </dd>
            <dd>
              <a>
                <h3>
                  {{ item.nickname }}
                </h3>
              </a>
            </dd>
            <dd class="relation">
              <div>
                <span class="btn-attention" @click="handleBlacklist(item.id)">
                  取消拉黑
                </span>
              </div>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import userApi from '@/api/user'
export default {
  data () {
    return {
      blacklist: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      userApi.getBlacklist().then((res) => {
        this.blacklist = res.data
      })
    },
    handleBlacklist (id) {
      this.$confirm('确定要删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userApi.deleteBlacklist(id).then((res) => {
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
@import '~/assets/css/manager.css';
@import '~/assets/css/manager-info.css';
@import '~/assets/css/userList.css';
.media li .media-list:after {
    width: 910px;
}
</style>
