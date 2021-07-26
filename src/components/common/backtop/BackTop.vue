<template>
  <div class="back-top" @click="backTop"></div>
</template>

<script>

export default {
  name: "BackTOP",
  setup(props, {emit}) {


    return {
      backTop: () => {
        emit("bTop");
      }
    }
  }
}
</script>

<style scoped>
  .back-top {
    width: 35px;
    height: 35px;
    position: fixed;
    bottom: 70px;
    right: 10px;
    z-index: 9;
    box-shadow: 3px 3px 3px #888888;
    border-radius: 50%;
    background: #fcfcfc url("~assets/css/icon/up.png") no-repeat center center;
  }
</style>