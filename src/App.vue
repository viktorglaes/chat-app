<template>
  <div id="app">
    <div class="header">
      <h1>Chat App</h1>
      <p class="user">User: {{ username }}</p>
      <p class="online">Online: {{ users.length }}</p>
    </div>

    <ChatRoom v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
  </div>
</template>

<script>
import ChatRoom from "./components/ChatRoom.vue";
import io from "socket.io-client";

export default {
  name: "App",
  components: {
    ChatRoom,
  },

  data() {
    return {
      username: "",
      socket: {},
      messages: [],
      users: [],
    };
  },

  created() {
    this.socket = io("/");
  },

  methods: {
    // prompt() {
    //   this.$buefy.dialog.prompt({
    //     message: `What's your name?`,
    //     inputAttrs: {
    //       placeholder: "e.g. Walter",
    //       maxlength: 30
    //     },
    //     trapFocus: true,
    //     onConfirm: value => (this.username = value)
    //   });
    // },
    joinServer() {
      this.socket.on("loggedIn", (data) => {
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit("userOn", this.username);
      });

      this.listen();
    },

    listen() {
      this.socket.on("userJoin", (user) => {
        this.users.push(user);
      });

      this.socket.on("userOut", (user) => {
        this.users.splice(this.users.indexOf(user), 1);
      });

      this.socket.on("msg", (message) => {
        this.messages.push(message);
      });
    },

    sendMessage(message) {
      this.socket.emit("msg", message);
    },
  },

  mounted() {
    this.username = prompt("What's your name?", "Anon");
    if (!this.username) {
      this.username = "Anon";
    }

    this.joinServer();
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
    margin-bottom: 5px;
    font-weight: bold;
  }
  .online {
    text-align: start;
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: bold;
  }
}
</style>
