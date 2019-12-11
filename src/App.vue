<template>
  <div id="app">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabList" :key="item.id" :label="item" :name="item">
        <router-view />
        <!-- 这是dev分支1 -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
 }
</script>

<style lang='scss'>

.app {
background: #fff
}
</style>