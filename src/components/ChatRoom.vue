<template>
  <div class="chat">
    <div class="messages">
      <div
        class="message"
        v-for="message in messages"
        v-bind:key="message.index"
      >
        <div class="username">{{ message.username }}</div>
        <div class="message-text">{{ message.msg }}</div>
      </div>
    </div>
    <form
      class="margin-top"
      onsubmit="return false;"
      v-on:keyup.enter="sendMessage"
    >
      <b-field label="Message..." :label-position="labelPosition" grouped>
        <b-input class="full-width" type="text" v-model="msg"></b-input>
        <p class="control">
          <b-button
            class="button is-primary send-button"
            v-bind:disabled="!msg"
            v-on:click="sendMessage"
            >Send Message</b-button
          >
        </p>
      </b-field>
    </form>
  </div>
</template>

<script>
export default {
  name: "ChatRoom",
  props: ["messages"],
  components: {},
  data() {
    return {
      msg: "",
      labelPosition: "on-border"
    };
  },
  methods: {
    sendMessage() {
      if (!this.msg) {
        this.toast();
        return;
      }
      this.$emit("sendMessage", this.msg);
      this.msg = "";
    }
  },
  toast() {
    this.$buefy.toast.open("Please enter message");
  }
  // getTime() {
  //   let today = new Date();
  //   let time =
  //     (today.getHours() < 10 ? "0" : "") +
  //     today.getHours() +
  //     ":" +
  //     (today.getMinutes() < 10 ? "0" : "") +
  //     today.getMinutes() +
  //     ":" +
  //     (today.getSeconds() < 10 ? "0" : "") +
  //     today.getSeconds();
  //   return time;
  // }
};
</script>

<style lang="scss">
.chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.15);

  .messages {
    flex: 1;
    overflow: scroll;
    .message {
      display: flex;
      border-bottom: 1px solid #efefef;
      margin-bottom: 10px;

      &:last-of-type {
        border-bottom: none;
      }
      // &:first-of-type {
      //   margin-top: 10px;
      // }

      .username {
        width: 100px;
        margin-right: 15px;
        border-right: solid white;
        text-align: center;
        padding: 10px;
      }

      .message-text {
        flex: 1;
        background-color: #57d5e7;
        padding: 10px;
        border-radius: 20rem;
      }
    }
  }
  form {
    display: flex;
    .input {
      flex: 1;
      height: 35px;
      font-size: 18px;
      box-sizing: border-box;
      height: 100%;
    }
    .full-width {
      width: 38rem;
    }
  }
}
</style>
