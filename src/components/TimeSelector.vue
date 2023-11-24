<template>
    <div class="inline-block">
        <p v-for="(option, index) in options" :key="index">
            <input :disabled="btnIsDisabled" type="radio" :id="`option-${index}`" :value="option.value" v-model="seconds" />
            <label :for="`option-${index}`">{{ option.label }}</label>
        </p>
    </div>
</template>

<script>
    export default{
        data () {
            return{
                options: [
                    { label: "15 Seconds", value: 15 }, 
                    { label: "30 Seconds", value: 30 }, 
                    { label: "1 Minute", value: 60 }, 
                    { label: "2 Minutes", value: 120 },
                    { label: "3 Minutes", value: 180 },
                    { label: "4 Minutes", value: 240 },
                    { label: "5 Minutes", value: 300 },],
                seconds: "60",
            }
        },
        props: {
            btnIsDisabled: {
                type: Boolean,
                required: true,
            },
        },
        watch: {
            seconds(value) {
                this.$emit('selected-time', value);
            },
        },
    }
</script>