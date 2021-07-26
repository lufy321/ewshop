<template>
  <van-swipe class="my-swipe" :autoplay="3000" lazy-render indicator-color="white">
    <van-swipe-item v-for="(item, index) in banners" :key="index">
      <a href="" @click.prevent="goDetail(item.id)">
        <img :src="item.img_url" alt="">
      </a>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup() {
    const router = useRouter();
    const goDetail = (id) => {
      router.push({path: "/detail", query: {id}});
    }
    return {
      goDetail
    }
  }
}
</script>

<style scoped>
  img {
    width: 100%;
    height: auto !important;
  }
  .my-swipe {
    margin-top: 45px;
  }
</style>