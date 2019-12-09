<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="标题1" name="1">内容</van-collapse-item>
      <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
      <van-collapse-item title="标题3" name="3">内容</van-collapse-item>
    </van-collapse>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import { Collapse, CollapseItem } from 'vant';

Vue.use(Collapse).use(CollapseItem);

export default {
  name: 'App',
  data() {
    return {
      activeName: '1'
    };
  }
}
</script>

<style>
  @import "https://cdn.jsdelivr.net/npm/vant@2.2/lib/index.css";
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
