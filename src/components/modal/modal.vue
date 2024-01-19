<template>
    <div class="modal" v-show="open">
        <div class="modal-inner">
            <div class="modal-content">
                <slot />
                <button class="mt-5 px-4 py-2 rounded-full shadow-md hover:shadow-lg bg-gradient-to-r from-blue-200 to-blue-400" type="button" @click="$emit('close')">Close</button>
                <button class="float-right mt-5 px-4 py-2 rounded-full shadow-md hover:shadow-lg bg-gradient-to-l from-green-200 to-green-400" type="button" @click="$emit('additional-button')">{{ additionalButtonName }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        open: Boolean,
        additionalButtonName: {
            type: String,
            default: 'Additional Button'
        
        },
    },
}
</script>

<style scoped>
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.modal-inner {
  max-width: 500px;
  margin: 2rem auto;
}

.modal-content {
  position: relative;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
  border-radius: 0.3rem;
  padding: 1rem;
}
</style>