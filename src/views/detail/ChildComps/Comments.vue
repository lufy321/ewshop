<template>
  <div class="comments">
    <div v-if="comments.length">
      <comment-item v-for="item in comments" :key="item.id" :comments="item"></comment-item>
    </div>
    <div v-else class="comments-else">
      <van-empty description="来评论吧!">
        <van-button round type="danger" color="#1baeae" class="bottom-button">评论</van-button>
      </van-empty>
    </div>
  </div>
</template>

<script>
import CommentItem from "./CommentItem";
export default {
  name: "Comment",
  components: {
    CommentItem
  },
  props: {
    comments: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .comments-else {
    margin: 15px 0;
    text-align: center;
    font-weight: bold;
  }
  .bottom-button {
    width: 160px;
    height: 40px;
  }
</style>