<template>
  <div class="comment-item">
    <div class="comment-head">
      <van-image width="40px" height="40px" lazy-load :src="comments.user.avatar_url" />
      <span class="user-name">{{comments.user.name}}</span>
    </div>
    <div class="updated-time">{{comments.updated_at}}</div>
    <div class="comments-info">
      <h3 class="reply">{{comments.reply}}</h3>
      <div class="content">{{comments.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentItem",
  props: {
    comments: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .comment-item {
    border-bottom: #fafafa solid 15px;
    padding: 10px;
  }
  .comment-head {
    position: relative;
    margin-bottom: 3px;
  }
  .user-name {
    position: absolute;
    top: 8px;
    margin-left: 5px;
  }
</style>