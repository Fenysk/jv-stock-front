<script setup lang="ts">
import Game from '../components/Games/GameCard.vue';

import { ref, onBeforeMount } from 'vue';
import { getAllGames } from '../services/games';

const games = ref<any>([]);

onBeforeMount(async () => {
    games.value = await getAllGames();
});

</script>

<template>
    <div>
        <h1>Games list</h1>

        <div class="controls">
            <router-link to="/games/add" class="button">Add a new game</router-link>
        </div>

        <ul v-if="games.length > 0" class="flex flex-col gap-4">
            <li v-for="game in games" :key="game.id">
                <Game :game="game" />
            </li>
        </ul>
        <p v-else>No games found.</p>
    </div>
</template>