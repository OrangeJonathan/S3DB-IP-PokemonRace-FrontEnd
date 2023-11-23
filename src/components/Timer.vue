<template>
  <div>
    <p class="text-white text-xl text-center">{{ formattedTime }}</p>
  </div>
</template>

<script>
export default {
  props: {
    timerActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      startTime: 60,
      timeLeft: 0,
      timer: null,
    };
  },
  mounted() {
    this.timeLeft = this.startTime;
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      return `${this.padTime(minutes)}:${this.padTime(seconds)}`;
    },
  },
  watch: {
    timerActive(value) {
      if (value) {
        this.startTimer();
      } else {
        clearInterval(this.timer);
        this.$emit('timerEnded', false); // Emit an event when the timer ends
      }
    },
  },
  methods: {
    padTime(time) {
      return time < 10 ? `0${time}` : time;
    },
    startTimer() {
      clearInterval(this.timer); // Clear any existing timer

      this.timeLeft = this.startTime; // Reset the time
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timer);
          this.timeLeft = this.startTime;
          this.$emit('timerEnded', false); // Emit an event when the timer ends
        }
      }, 1000);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
/* Add your component styles here if needed */
</style>
