<template>
  <div>
    <h1>路由参数</h1>
    <p>路由携带的id：{{rId}}</p>
  </div>
</template>

<script>
 export default {
    name:"routerParam",
    data (){
     return {
       rId:"未知"
     }
    },
    created() {
      this.rId = this.$route.params.id;
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
        this.rId = this.$route.params.id;
        
      }
    }
 }
</script>

<style>
</style>
