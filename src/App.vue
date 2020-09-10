<template>
  <div id="app">
    <div class="header">
      <h1>Chat App</h1>
    </div>

    <ChatRoom />
  </div>
</template>

<script>
import ChatRoom from "./components/ChatRoom.vue";

export default {
  name: "App",
  components: {
    ChatRoom,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 95vh;
  width: 100%;
  max-width: 760px;
  margin: 1rem auto;
}

.header {
  font-size: 36px;
  text-align: center;
}
</style>
