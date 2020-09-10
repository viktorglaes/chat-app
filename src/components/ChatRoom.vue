<template>
  <div class="chat">
    <div class="messages">
      <div class="message" v-for="message in messages" v-bind:key="message.id">
        {{ message }}
      </div>
    </div>
    <form class="margin-top">
      <b-field label="Message..." :label-position="labelPosition" grouped>
        <b-input class="full-width" type="text" v-model="message"></b-input>
        <p class="control">
          <b-button
            class="button is-primary send-button"
            v-on:click="sendMessage"
            >Send Message</b-button
          >
        </p>
      </b-field>
    </form>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "ChatRoom",
  components: {},
  data() {
    return {
      socket: {},
      //   context: {},
      //   position: {
      //     x: 0,
      //     y: 0,
      //   },
      message: "",
      messages: [],
      labelPosition: "on-border",
    };
  },
  created() {
    this.socket = io("http://localhost:3000");
  },
  mounted() {
    // this.context = this.$refs.game.getContext("2d");
    // this.socket.on("position", (data) => {
    //   this.position = data;
    //   this.context.clearRect(
    //     0,
    //     0,
    //     this.$refs.game.width,
    //     this.$refs.game.height
    //   );
    //   this.context.fillRect(this.position.x, this.position.y, 20, 20);
    // });

    this.socket.on("message", (message) => {
      this.messages.push(message);
    });
  },
  methods: {
    // move(direction) {
    //   this.socket.emit("move", direction);
    // },
    sendMessage() {
      if (!this.message) {
        this.toast();
      } else {
        this.socket.emit("message", this.message);
        this.message = "";
      }
    },
    toast() {
      this.$buefy.toast.open("Please enter message");
    },
  },
};
</script>

<style>
.chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.15);
}

.messages {
  flex: 1;
  overflow: scroll;
}

.messages .message {
  display: flex;
  border-bottom: 1px solid #efefef;
  padding: 10px;
  margin: 5px;
  border-radius: 20rem;
  background-color: #57d5e7;
}

.messages .message:not(:last-child) {
  margin-bottom: 5px;
}

form {
  display: flex;
}

form input {
  flex: 1;
  height: 35px;
  font-size: 18px;
  box-sizing: border-box;
}

input {
  flex: 1;
  height: 35px;
  font-size: 18px;
  box-sizing: border-box;
}
.margin-top {
  margin-top: 1rem;
}

.full-width {
  width: 38rem;
}
</style>
