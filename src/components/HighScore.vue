<template>
    <div>
      <p class="text-white text-xl text-center">{{ highScore }}</p>
    </div>
</template>

<script>
export default {
  props: {
    currentScore: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
    highScore: 0,
    }; 
  },
  watch: {
    currentScore(value) {
      if (value > this.highScore) {
        this.highScore = this.currentScore;
      }
    },
  }
    
}
</script>