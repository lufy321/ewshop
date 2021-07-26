<template>
  <div class="login">
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default>用户登录</template>
    </nav-bar>

    <div class="top-img">
      <van-image width="10rem" height="5rem" fit="contain" src="https://www.lmonkey.com/_nuxt/img/logo.ca1ae0c.png"/>
    </div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="email"
        name="电子邮箱"
        label="电子邮箱"
        placeholder="请输入正确格式的电子邮箱"
        :rules="[{ required: true, message: '请填写电子邮箱' }   ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{required: true, message: '请填写密码'}]"
      />

      <div class="su-button">
        <div class="link-login" @click="$router.push({path:'/register'})">
          没有账号，立即注册
        </div>
        <van-button round block type="info" color="#44b883" native-type="submit">
        提交
        </van-button>
      </div>
    </van-form>
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {useRouter} from 'vue-router';
import {ref, reactive, toRefs} from 'vue';
import {Notify, Toast} from "vant";
import {login} from "network/user";
import {useStore} from 'vuex';

export default {
  email: "Register",
  components: {
    NavBar
  },
  setup() {
    const router = useRouter();
    const store = useStore()
    const userinfo = reactive({
      email: "",
      password: "",
    });
    const onSubmit = () => {
      login(userinfo).then(res => {
        // 将token保存在本地window.localStorage setItem(key, value) getItem(key)
        window.localStorage.setItem('token', res.access_token);
        // 在vuex islogin
        store.commit('setIslogin', true);

        Toast.success('登录成功');

        userinfo.email = "";
        userinfo.password = "";

        setTimeout(() => {
          router.go(-1);
        },500)
      })
    }

    return {
      ...toRefs(userinfo),
      onSubmit,
    }
  }
}
</script>

<style scoped>
  .top-img {
    margin-top: 80px;
    text-align: center;
  }
  .su-button {
    margin: 16px;
  }
  .link-login {
    text-align: center;
    margin-bottom: 10px;
    color: var(--color-tint);
  }
</style>