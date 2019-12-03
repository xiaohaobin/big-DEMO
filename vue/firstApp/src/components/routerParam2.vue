<template>
  <div>
    <h1>路由参数</h1>
    <p>路由携带的参数：{{JSON.stringify(oParam)}}</p>
  </div>
</template>

<script>
 export default {
    name:"routerParam2",
    data (){
     return {
       oParam:{}
     }
    },
    created() {
      this.oParam = this.$route.params;
      // console.log(this.$route.params,"this.$route.params")
    },
    updated() {
      console.log("updating...")
    },
    watch:{
      //监听路由参数变量 $route
      '$route' (to, from) {
        // 对路由变化作出响应...
        console.log(this.$route.params,"1111")
        this.oParam = this.$route.params;
      }
    }
 }
</script>

<style>
</style>
