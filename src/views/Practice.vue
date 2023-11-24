<template>
  <div>
    <div class="flex items-center justify-center content-center space-x-10">
        <p class="bg-color-333 px-5 py-2 rounded-b-lg text-white text-center">
          Time Left:
          <Timer :timerActive="timerActive" :startTime="timeSeconds" @timerEnded="handleTimer" />
        </p>
        <p class="bg-color-333 px-5 py-2 rounded-b-lg text-white text-center">
          Score:
          <CurrentScore :currentScore="currentScore" />
        </p>
        <p class="bg-color-333 px-5 py-2 rounded-b-lg text-white text-center">
          High Score:
          <HighScore :currentScore="currentScore" />
        </p>
    </div>
    <div class="flex justify-between pt-20">
      <p class="bg-color-333 px-5 py-2 rounded-r-lg text-white text-center min-w-20">
        <GenerationSelector :btnIsDisabled="timerActive" @selected-generation="handleGeneration"/>
      </p>
      <p class = "">
        <Guess :timerActive="timerActive" :generation="generation" @timerStarted="handleTimer" @score="handleScore"/>
      </p>
      <p class="bg-color-333 px-5 py-2 rounded-l-lg text-white text-center min-w-20">
        <TimeSelector :btnIsDisabled="timerActive" @selected-time="handleTime" class="flex-col items-center justify-center" />
      </p>
    </div>
  </div>
</template>

<script>
import Guess from "@/components/Guess.vue";
import Timer from "@/components/Timer.vue";
import CurrentScore from "@/components/CurrentScore.vue";
import HighScore from "@/components/HighScore.vue";
import GenerationSelector from "@/components/GenerationSelector.vue";
import TimeSelector from "@/components/TimeSelector.vue";

export default {
  name: "Practice",
  components: {
    Guess,
    Timer,
    CurrentScore,
    HighScore,
    GenerationSelector,
    TimeSelector,
  },
  data() {
    return {
      timerActive: false,
      currentScore: 0,
      generation: 0,
      timeSeconds: 60,
    };
  },
  methods: {
    activateTimer() {
      this.timerActive = true;
    },
    handleTimer(value) {
      this.currentScore = 0;
      this.timerActive = value;
    },
    handleTime(value) {
      this.timeSeconds = value;
    },
    handleScore(value) {
      this.currentScore = value;
    },
    handleGeneration(value){
      console.log(value);
      this.generation = value;
    }
  },
};
</script>

<style>
@import "/src/assets/practice.css";	
</style>
