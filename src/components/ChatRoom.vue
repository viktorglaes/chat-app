<template>
  <div class="chat">
    <div class="messages">
      <div class="message" v-for="message in messages" v-bind:key="message.id">
        {{ message }}
      </div>
    </div>
    <form
      class="margin-top"
      onSubmit="return false;"
      v-on:keyup.enter="sendMessage"
    >
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
      message: "",
      messages: [],
      labelPosition: "on-border",
    };
  },
  created() {
    this.socket = io("http://localhost:3000");
  },
  mounted() {
    this.socket.on("message", (message) => {
      this.messages.push(message);
    });
  },
  methods: {
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

<style lang="scss">
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
  .message {
    display: flex;
    border-bottom: 1px solid #efefef;
    padding: 10px;
    margin: 5px;
    border-radius: 20rem;
    background-color: #57d5e7;
  }
  .message:not(:last-child) {
    margin-bottom: 5px;
  }
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
