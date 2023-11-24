<template>
    <div class="inline-block">
        <p v-for="(option, index) in options" :key="index">
            <input :disabled="btnIsDisabled" type="radio" :id="`option-${index}`" :value="option.value" v-model="generation" />
            <label :for="`option-${index}`">{{ option.label }}</label>
        </p>
    </div>
</template>

<script>
    export default{
        data () {
            return{
                options: [
                    { label: "All Generations", value: 0 }, 
                    { label: "Generation 1", value: 1 }, 
                    { label: "Generation 2", value: 2 },
                    { label: "Generation 3", value: 3 },
                    { label: "Generation 4", value: 4 },
                    { label: "Generation 5", value: 5 },
                    { label: "Generation 6", value: 6 },
                    { label: "Generation 7", value: 7 },
                    { label: "Generation 8", value: 8 },
                    { label: "Generation 9", value: 9 },],
                generation: "0",
            }
        },
        props: {
            btnIsDisabled: {
                type: Boolean,
                required: true,
            },
        },
        watch: {
            generation(value) {
                this.$emit('selected-generation', value);
            },
        },
    }
</script>