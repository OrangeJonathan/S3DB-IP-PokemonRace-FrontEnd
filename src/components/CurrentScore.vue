<template>
    <div>
      <p class="text-white text-xl text-center">{{ currentScore }}</p>
    </div>
</template>

<script>
export default {
  props: {
    currentScore: {
      type: Number,
      required: true,
      default: 0,
    },
  },
}
</script>