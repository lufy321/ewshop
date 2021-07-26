<template>
  <div class="address-box">
    <nav-bar class="nav-bar">
      <template v-slot:default>地址管理</template>
    </nav-bar>

    <van-empty style="margin-top: 60px" v-show="list.length == 0" description="还没有地址信息，去添加吧！"/>

    <div class="address-item">
      <van-config-provider :theme-vars="themeVars">
        <van-address-list
            style="height: 200px"
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
        />
      </van-config-provider>
    </div>


  </div>
</template>

<script>
import {reactive, toRefs, onMounted} from "vue";
import {getAddressList} from "network/address";
import {useRouter, useRoute} from "vue-router";
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "Address",
  components: {
    NavBar
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      chosenAddressId: "1",
      list: [],
    })

    const themeVars = {
      addressListAddButtonZIndex: 9
    }

    onMounted(() => {
      getAddressList().then((res) => {
        if(res.data.length == 0) {
          state.list = [];
          return;
        }
        //不为空，map遍历数据
        state.list = res.data.map((item) => {
          return{
            id: item.id,
            name: item.name,
            tel: item.phone,
            // 省市县地址信息保存到一个变量address中
            address: `${item.province} ${item.city} ${item.county} ${item.address}`,
            //判断是否为默认地址
            isDefault: !!item.is_default,
          }
        })
      })
    })
    const onAdd = () => {
      router.push({path: "/addressedit", query: {type: "add"}});
    }

    const onEdit = (item) => {
      router.push({path: "/addressedit", query: {type: "edit", addressId: item.id}});
    }

    return {
      ...toRefs(state),
      onAdd,
      onEdit,
      themeVars
    }
  }
}
</script>

<style lang="scss">
.address-box {
  .address-item {
    margin-top: 45px;

    .van-button {
      background: var(--color-tint);
      border-color: var(--color-tint);
    }
  }

  .van-address-list__bottom {
    bottom: 50px !important;
  }
}
</style>