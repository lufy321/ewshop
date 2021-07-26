<template>
  <van-config-provider :theme-vars="themeVars">
    <van-tabs v-model:active="active" swipeable sticky color="#42b983" @change="Change">
      <van-tab v-for="iName in itemName" :title="iName">
        <van-pull-refresh
            v-model="state.refreshing" @refresh="onRefresh">
          <van-list
              class="van-list"
              v-model:loading="state.loading"
              :finished="state.finished"
              finished-text="没有更多了"
              @load="onLoad"
          >
            <goods-list>
              <goods-list-item v-for="item in goods[currentType].list" :product="item" :key="item"/>
            </goods-list>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </van-config-provider>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";
import {onMounted, reactive} from "vue";
import {ref} from 'vue';
import GoodsListItem from "components/content/goods/GoodsListItem";
import {getHomeGoods} from "network/home";
export default {
  name: "Tab",
  components: {
    GoodsList,
    GoodsListItem
  },
  setup() {
    const goods = reactive({
      sales: {page: 1, list: []},
      new: {page: 1, list: []},
      recommend: {page: 1, list: []}
    })
    let totalPage = ref(0)
    let currentType = ref("sales")
    const state = reactive({
      loading: false,
      finished: false,
      refreshing: false,
    });
    let active = ref(0);
    let itemName = ["畅销", "新品", "精选"];
    const Change = () => {
      let type = ["sales", "new", "recommend"];
      currentType.value = type[active.value];
      onRefresh()
    }

    const themeVars = {
      tabsLineHeight: '45px'
    };


    onMounted(() => {
      onRefresh();
    })

    const loadData = () => {
      getHomeGoods(currentType.value, goods[currentType.value].page).then((res) => {
        goods[currentType.value].list = goods[currentType.value].list.concat(res.goods.data);
        state.loading = false;
        totalPage = res.goods.data.length;
        if(goods[currentType.value].page >= totalPage) {
          state.finished = true;
        }
      })
    }

    const onLoad = () => {
      if(!state.refreshing && goods[currentType.value].page < totalPage){
        goods[currentType.value].page += 1;
      }
      if(state.refreshing) {
        goods[currentType.value].list = [];
        state.refreshing = false;
      }
      loadData();
    }

    const onRefresh = () => {
      state.refreshing = true;
      // 清空列表数据
      state.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      goods[currentType.value].page = 1;
      onLoad();
    }

    return{
      state,
      onLoad,
      onRefresh,
      themeVars,
      active,
      Change,
      currentType,
      goods,
      totalPage,
      itemName
    }
  }
}
</script>

<style scoped lang="scss">
  .van-list {
    margin-bottom: 50px;
  }
</style>