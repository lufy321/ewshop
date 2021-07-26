<template>
  <div class="home">
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default>首页</template>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <tab-list/>
<!--    <goods-list></goods-list>-->
    <back-top @bTop="bTop"></back-top>
  </div>
</template>

<script>

import {reactive, ref} from 'vue';
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./ChildComps/HomeSwiper";
import RecommendView from "./ChildComps/RecommendView";
import TabList from "./ChildComps/TabList";
import {getHomeAllData} from "network/home";
import BackTop from "components/common/backtop/BackTop";

export default {
  name: 'Home',
  components: {
    NavBar,
    BackTop,
    HomeSwiper,
    RecommendView,
    TabList,
  },
  setup() {
    let recommends = ref([]);
    let banners = ref([]);

    const bTop = () => {
      console.log(1111111111);
    }

    getHomeAllData().then((res) => {
      recommends.value = res.goods.data;
      banners.value = res.slides;
    })



    return {
      banners,
      recommends,
      bTop
    }
  }
}
</script>

<style scoped lang="scss">

</style>