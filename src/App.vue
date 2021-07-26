<template>
  <router-view :key="$route.fullPath"/>
  <main-tabber/>
</template>

<script>
  import {onMounted} from "vue";
  import {useStore} from 'vuex';
  import MainTabber from "components/content/maintabber/MainTabber";
  export default {
    name: 'App',
    components: {
      MainTabber
    },
    setup () {
      const store = useStore();
      onMounted(() => {
        store.dispatch('updateCart');
      })
    }
  }
</script>

<style lang="scss">
  @import "assets/css/base.css";
</style>
