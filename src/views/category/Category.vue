<template>
  <div class="category">
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default>分类</template>
    </nav-bar>

    <div class="main-box">

      <div class="order-tab">
        <van-tabs v-model:active="active" color="#42b983" sticky offset-top="45px" swipeable @change="Change">
          <van-tab v-for="items in itemName" :key="items" :title="items">
            <van-pull-refresh
                v-model="state.refreshing" @refresh="onRefresh">
              <van-list
                  class="van-list"
                  v-model:loading="state.loading"
                  :finished="state.finished"
                  finished-text="没有更多了"
                  @load="onLoad"
              >
                <van-card
                    v-for="item in goods[currentOrder].list"
                    :key="item.id"
                    :num="item.comments_count"
                    :tag="item.comments_count >= 0 ? '流行' : '标签'"
                    :price="item.price"
                    :desc="item.updated_at"
                    :title="item.title"
                    :thumb="item.cover_url"
                    :lazy-load="true"
                    @click="ClickItem(item.id)"
                />
              </van-list>
            </van-pull-refresh>
          </van-tab>
        </van-tabs>
      </div>

      <van-sidebar class="left-menu" v-model="activeKey">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item v-for="(item, index) in categories"
                             :key="item.id"
                             :title="item.name"
                             :name="item.name">
            <van-config-provider :theme-vars="themeVars">
              <van-sidebar-item v-for="sub in item.children"
                                :key="sub.id"
                                :title="sub.name"
                                @click="getGoods(sub.id)"
              />
            </van-config-provider>
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {onMounted, reactive, ref} from 'vue';
import {useRouter} from 'vue-router'
import {getCategory} from "network/category";
import {getCategoryGoods} from "network/category";

export default {
  name: "Category",
  components: {
    NavBar
  },
  setup() {
    const activeName = ref('1');
    const active = ref(0);
    const activeKey = ref(0);
    let categories = ref([]);
    let currentOrder = ref("sales");
    let currentCid = ref(0);

    const themeVars = {
      sidebarSelectedBorderColor: '#42b983'
    };

    const router = useRouter();
    const ClickItem = (id) => {
      router.push({path: '/detail', query: {id: id}})
    }

    const goods = reactive({
      sales: {page: 1, list: []},
      price: {page: 1, list: []},
      comments_count: {page: 1, list: []}
    })
    let totalPage = ref(0)
    const state = reactive({
      loading: false,
      finished: false,
      refreshing: false,
    });

    let itemName = ["销量排序", "价格排序", "评论排序"];

    const Change = () => {
      let order = ["sales", "price", "comments_count"];
      currentOrder.value = order[active.value];
      onRefresh()
    }

    const getGoods = (cid) => {
      currentCid.value = cid;
      onRefresh()
    }

    onMounted(() => {
      getCategory().then((res) => {
        categories.value = res.categories;
      })
      onRefresh();
    })

    const loadData = () => {
      getCategoryGoods(currentOrder.value, currentCid.value).then((res) => {
        goods[currentOrder.value].list = goods[currentOrder.value].list.concat(res.goods.data);
        state.loading = false;
        totalPage = 0;
        if(goods[currentOrder.value].page >= totalPage) {
          state.finished = true;
        }
      })
    }

    const onLoad = () => {
      if(!state.refreshing && goods[currentOrder.value].page < totalPage){
        goods[currentOrder.value].page += 1;
      }
      if(state.refreshing) {
        goods[currentOrder.value].list = [];
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
      goods[currentOrder.value].page = 1;
      onLoad();
    }

    return{
      activeName,
      active,
      activeKey,
      state,
      onLoad,
      onRefresh,
      Change,
      currentOrder,
      currentCid,
      categories,
      getGoods,
      goods,
      totalPage,
      itemName,
      ClickItem,
      themeVars
    };
  },
}
</script>

<style scoped>
  .main-box {
    margin-top: 45px;
    margin-bottom: 50px;
  }

  .order-tab {
    float: right;
    width: 70%;
    margin-bottom: 50px;
  }

  .van-list {
    width: 100%;
    padding: 10px;
  }
</style>