<template>
  <div id="app">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabList" :key="item.id" :label="item" :name="item">
        <router-view />
        <!-- 这是master分支 -->
        <!-- 打标签 -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "app",
  data () {
    return {
      activeName: "",
      tabList: []
    }
  },
  created () {
    // eslint-disable-next-line no-console
    console.log()
    this.tabList = this.$router.options.routes.map(item => item.name)
    this.activeName = this.$route.name
    $(window).on("resize", () => {
      this.$eventBus.$emit('window-resize')
    })
  },
  watch: {
    "$route.name"(val) {
      this.activeName = val
    }
  },
  methods: {
    handleClick (tab) {
    // eslint-disable-next-line no-console
      window.open(`${window.location.host}/${tab.name}`)
      this.$router.push({
        path: `/${tab.name}`
      })
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
