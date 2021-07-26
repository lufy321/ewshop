<template>
  <div class="shop-cart">
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default>购物车</template>
    </nav-bar>

    <div class="cart-box">
      <div class="cart-body">
        <van-checkbox-group ref="checkboxGroup" v-model="result" @change="groupChange">
          <van-swipe-cell :right-width="50" v-for="(item, index) in list" :key="index">
            <div class="good-item">
<!--              选中购物车中商品的ID-->
              <van-checkbox :name="item.id"/>
              <div class="good-img" @click="$router.push({path: '/detail', query: {id: item.goods.id}})">
                <img :src="item.goods.cover_url" alt="">
              </div>
              <div class="good-desc">
                <div class="good-title">
                  <span>{{item.goods.title}}</span>
                  <span>X {{item.goods.stock}}</span>
                </div>
                <div class="good-btn">
                  <div class="price"><small>￥</small>{{item.goods.price + ".00"}}</div>
                  <van-stepper
                      @change="onChange"
                      async-change
                      :name="item.id"
                      :model-value="item.num"
                      :max="item.goods.stock"
                      :min="1"
                      integer
                  />
                </div>
              </div>
            </div>
            <template #right>
              <van-button
                square
                icon="delete"
                type="danger"
                class="delete-button"
                @click="deleteGood(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <van-config-provider :theme-vars="themeVars">
        <van-submit-bar
          class="submit-all"
          :price="total * 100"
          @submit="onSubmit"
          button-text="提交订单"
        >
         <van-checkbox @click="allCheck" v-model:checked="checkAll">全选</van-checkbox>
        </van-submit-bar>
      </van-config-provider>

      <div class="empty" v-if="!list.length">
        <van-empty description="购物车空空如也">
          <van-button round type="danger" color="#1baeae" @click="goTo">前往选购</van-button>
        </van-empty>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {checkedCard} from "network/cart";
import {modifyCart} from "network/cart";
import {deleteCartItem} from "network/cart";
import {computed, onMounted, reactive, ref, toRefs} from 'vue';
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {Toast} from "vant";
import {getCart} from "network/cart";
export default {
  name: "ShopCart",
  components: {
    NavBar
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    // 数据模型，状态
    const state = reactive({
      list: [],
      result: [], // id 数组
      checkAll: true
    })

    const themeVars = {
      submitBarZIndex: 9
    }

    // 初始化购物车数据
    const init = () => {
      Toast.loading({message: "加载中...", forbidClick: true});
      //得到购物车的数据，include包括商品信息
      getCart("include=goods").then(res => {
        state.list = res.data;
        // console.log(res.data);
        // 选中的购物车列表，只留下id数组，n代表的是里面的每一个购物车得到的参数，item遍历的时候只留下里面的id
        state.result = res.data.filter((n) => n.is_checked == 1).map((item) => item.id);
        Toast.clear();
      })
    }

    onMounted(() => {
      init();
    })
    // 通过计算属性 计算总价
    const total = computed(() => {
      let sum = 0;
      // 首先过滤购物车中所有商品，用includes方法查找result里面有没有item这个值，存在则为真，
      state.list
      .filter((item) => state.result.includes(item.id))
      .forEach((item) => {
        sum += parseInt(item.num) * parseFloat(item.goods.price);
      })
      return sum;
    })

    // 异步改变购物车数量
    const onChange = (value, detail) => {
      // 加一个轻提示，防止异步处理程序还未加载完另一个请求又来了，造成死锁
      Toast.loading({message: '修改中...', forbidClick: true})
      modifyCart(detail.name, {num: value}).then(res => {
        // 将在 onMounted中的list 中的 num 也要改
        state.list.forEach((item) => {
          if(item.id == detail.name) {
            item.num = value;
          }
        });
        Toast.clear();
      })
    }

    // 复选框改变处理方法
    const groupChange = (result) => {
      if(result.length == state.list.length) {
        state.checkAll = true;
      } else {
        state.checkAll = false;
      }
      state.result = result; // 选中的 id 数组
      // 改变数据表中选中状态
      checkedCard({cart_ids: result});
    }

    // 全选
    const allCheck = () => {
      if(!state.checkAll) {
        state.result = state.list.map((item) => item.id);
        state.checkAll = true;
      } else {
        state.result = [];
        state.checkAll = false;
      }
    }

    // 前往购物
    const goTo = () => {
      router.push({path: "/home"});
    }

    // 删除商品
    const deleteGood = (id) => {
      deleteCartItem(id).then((res) => {
        init(); // 重新初始化
        store.dispatch("updateCart"); //改变Vue中的状态数量
      })
    }

    // 创建订单
    const onSubmit = () => {
      // 判断结果长度是否为空，来确定是否选择了商品
      if(state.result.length == 0) {
        // 轻提示
        Toast.fail("未选择商品！")
        return;
      } else {
        // 进入订单支付页面
        router.push({path: "/createorder"});
      }
    }

    return {
      themeVars,
      ...toRefs(state),
      onChange,
      allCheck,
      total,
      groupChange,
      goTo,
      deleteGood,
      onSubmit
    };
  }
}
</script>

<style scoped lang="scss">
  .cart-box {
    .cart-body {
      font-size: 12px;
      margin: 60px 0 100px 0;
      padding-left: 10px;
      .good-item {
        display: flex;
        .good-img {
          img {
            width: 100px;
            height: auto;
          }
        }
        .good-desc {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          padding: 20px;
          .good-title {
            display: flex;
            justify-content: space-between;
          }
          .good-btn {
            display: flex;
            justify-content: space-between;
            .price {
              font-size: 16px;
              color: red;
              line-height: 28px;
            }
          }
        }
      }
      .delete-button {
        width: 50px;
        height: 100%;
      }
    }
    .submit-all {
      margin-bottom: 50px;
    }
  }
</style>