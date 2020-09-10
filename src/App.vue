<template>
  <div id="app">
    <div class="header">
      <h1>Chat App</h1>
      <p class="user">{{ username }}</p>
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

  data() {
    return {
      username: "",
    };
  },

  methods: {
    prompt() {
      this.$buefy.dialog.prompt({
        message: `What's your name?`,
        inputAttrs: {
          placeholder: "e.g. Walter",
          maxlength: 30,
        },
        trapFocus: true,
        onConfirm: (value) => (this.username = value),
      });
    },
  },

  mounted() {
    this.username = this.prompt();
    if (!this.username) {
      this.username = "Anon";
    }
  },
};
</script>

<style lang="scss">
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

  .user {
    text-align: start;
    font-size: 16px;
  }
}
</style>
