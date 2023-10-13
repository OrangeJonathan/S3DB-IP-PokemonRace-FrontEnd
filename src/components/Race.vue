<template>
    <div>
        <h1>{{ raceName }}</h1>
        <p>{{ raceDescription }}</p>
        <ul>
            <li v-for="pokemon in racePokemons" :key="pokemon.id">
                {{ pokemon.name }} - {{ pokemon.type }}
            </li>
        </ul>
        <button @click="startRace">Start Race</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            raceName: 'Pikachu Cup',
            raceDescription: 'A race for electric-type Pokémon',
            racePokemons: [
                { id: 1, name: 'Pikachu', type: 'Electric' },
                { id: 2, name: 'Jolteon', type: 'Electric' },
                { id: 3, name: 'Raichu', type: 'Electric' },
            ],
        };
    },
    methods: {
        startRace() {
            // Code to start the race
        },
    },
};
</script>
