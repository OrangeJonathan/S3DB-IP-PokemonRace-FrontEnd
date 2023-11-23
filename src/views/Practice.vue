<template>
  <div>
    <div class="flex items-center justify-center content-center space-x-10">
        <p class="bg-color-333 px-5 py-2 rounded-b-lg text-white text-center">
          Time Left:
          <Timer :timerActive="timerActive" @timerEnded="handleTimer" />
        </p>
        <p class="bg-color-333 px-5 py-2 rounded-b-lg text-white text-center">
          Score:
          <Timer :timerActive="timerActive" @timerEnded="handleTimer" />
        </p>
    </div>
    <div>
      <Guess :timerActive="timerActive" @timerStarted="handleTimer"/>
    </div>
  </div>
</template>

<script>
import Guess from "@/components/Guess.vue";
import Timer from "@/components/Timer.vue";

export default {
  name: "Practice",
  components: {
    Guess,
    Timer,
  },
  data() {
    return {
      timerActive: false,
    };
  },
  methods: {
    activateTimer() {
      this.timerActive = true;
    },
    handleTimer(value) {
      this.timerActive = value;
    },
  },
};
</script>

<style>
@import "/src/assets/practice.css";	
</style>
