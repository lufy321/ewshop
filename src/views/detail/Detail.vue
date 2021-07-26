<template>
  <div class="detail">
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default>商品详情</template>
    </nav-bar>


    <div class="detail-img">
      <van-image width="100%" lazy-load :src="detail.cover_url" />
    </div>
    <van-card
        style="text-align: left"
        :num="detail.stock"
        :price="detail.price + '.00'"
        :desc="detail.description"
        :title="detail.title"
    >

      <template #tags>
        <van-tag plain type="danger">新书</van-tag>
        <van-tag plain type="danger">
          {{(detail.is_recommend = 1 ? "推荐" : "")}}
        </van-tag>
      </template>

      <template #footer>
        <van-button type="warning" @click="handleAddCart">加入购物车</van-button>
        <van-button type="danger" @click="goToCart">立即购买</van-button>
      </template>
    </van-card>
    <van-config-provider :theme-vars="themeVars">
      <van-tabs class="van-tabs" v-model:active="active" swipeable sticky color="#42b983">
        <van-tab title="概述">
          <div class="content" v-html="detail.details"></div>
        </van-tab>

        <van-tab title="热评">
          <comments :comments="detail.comments"/>
        </van-tab>

        <van-tab title="相关图书">
          <goods-list>
            <goods-list-item v-for="item in like_goods" :product="item" :key="item" />
          </goods-list>
        </van-tab>
      </van-tabs>

    </van-config-provider>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";
import NavBar from "components/common/navbar/NavBar";
import Comments from "./ChildComps/Comments";
import GoodsListItem from "components/content/goods/GoodsListItem";
import {addCart} from "network/cart";
import {useStore} from "vuex";
import {useRouter, useRoute} from 'vue-router';
import {getDetail} from "network/detail";
import {onMounted} from "vue";
import {ref, reactive, toRefs} from "vue";
import {Toast} from "vant";
export default {
  name: "Detail",
  components: {
    NavBar,
    GoodsList,
    GoodsListItem,
    Comments
  },
  setup() {
    let active = ref(0);
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let id = ref(0);
    id.value = route.query.id;

    const themeVars = {
      tabsLineHeight: '45px'
    };
    const book = reactive({
      detail: {},
      like_goods: []
    })

    // 添加购物车
    const handleAddCart = () => {
      addCart({goods_id: book.detail.id, num: 1}).then(res => {
        if (res.status == '201' || res.status == '204') {
          Toast.success('添加成功')
          // 设置store中 cartCount的数量
          store.dispatch('updateCart');
        }
      })
    }

    // 立即购买
    const goToCart = () => {
      addCart({goods_id:book.detail.id, num: 1}).then(res => {
        if(res.status == '204' || res.status == '201') {
          Toast.success('添加成功，显示购物车');
          store.dispatch('updateCart');
          router.push({path: '/shopcart'});
        }
      })
    }

    const init = () => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      })

      getDetail(id.value).then((res) => {
        book.detail = res.goods;
        book.like_goods = res.like_goods;
      }).catch(() => {
        Toast.fail("加载失败!")
      })

      Toast.clear();

    }

    onMounted(() => {
      init();
    });

    return {
      themeVars,
      id,
      init,
      ...toRefs(book),
      active,
      handleAddCart,
      goToCart,
    }
  }
}
</script>

<style scoped>
  .detail-img {
    margin-top: 45px;
  }
  .van-tabs {
    margin-bottom: 50px;
  }
</style>