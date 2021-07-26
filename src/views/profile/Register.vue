<template>
  <div class="register">
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default>新用户注册</template>
    </nav-bar>

    <div class="top-img">
      <van-image width="10rem" height="5rem" fit="contain" src="https://www.lmonkey.com/_nuxt/img/logo.ca1ae0c.png"/>
    </div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="name"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{required: true, message: '请填写用户名'}]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{required: true, message: '请填写密码'}]"
      />
      <van-field
          v-model="password_confirmation"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="密码"
          :rules="[{ required: true, message: '两次密码不相同，请重新输入' }]"
      />
      <van-field
          v-model="email"
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <div class="su-button">
        <div class="link-login" @click="$router.push({path:'/login'})">
          已有账号，立即登录
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
import {register} from "network/user";
import {Notify, Toast} from "vant";

export default {
  name: "Register",
  components: {
    NavBar
  },
  setup() {
    const router = useRouter();
    const userinfo = reactive({
      name: "",
      password: "",
      password_confirmation: "",
      email: "",
    });
    const onSubmit = () => {
      if(userinfo.password !== userinfo.password_confirmation) {
        Notify("两次密码不一致，请重新输入!");
      } else {
        register(userinfo).then((res) => {
          if(res.status === 201) {
            Toast.success("注册成功");
            setTimeout(() => {
              router.push({path: "/login"});
            }, 1000);
          }
          userinfo.password = "";
          userinfo.password_confirmation = "";
        })
      }
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