<script setup lang="ts">
import Game from '../components/Games/GameCard.vue';
import LoadingGame from '../components/Common/LoadingGameCard.vue';

import { ref, onBeforeMount } from 'vue';
import { getAllGames } from '../services/games';

const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);
const games = ref<any>([]);

async function fetchGames() {
    try {
        isLoading.value = true;
        games.value = await getAllGames()
        isLoading.value = false;
        isError.value = false;

    } catch (error: any) {

        isError.value = true;
        isLoading.value = false;
        throw error.message;

    }
}

const searchInput = ref<string>('');

function searchGames(search?: string) {

    if (!search) {
        fetchGames();
        return;
    }

    games.value = games.value.filter((game: any) => {
        return game.name.toLowerCase().includes(search.toLowerCase()) ||
            game.console.toLowerCase().includes(search.toLowerCase())
    });
}

function clearSearch() {
    searchInput.value = '';
    fetchGames();
}

onBeforeMount(async () => {
    await fetchGames();
});

</script>

<template>
    <main id="Games" class="container p-2 mx-auto">
        <h1>Games list</h1>

        <div id="controls" class="flex flex-row flex-wrap items-center justify-between gap-4">
            <div id="search" class="flex gap-2">
                <input @input="searchGames(searchInput)" v-model="searchInput" type="text"
                    placeholder="Rechercher un jeu" />
                <button v-if="searchInput" @click="clearSearch">❌</button>
            </div>
            <router-link :to="{ name: 'AddGame' }" class="px-4 py-2 bg-white border rounded-md shadow">➕ Add new
                game</router-link>
        </div>

        <div id="games-list">
            <ul class="grid grid-cols-1 gap-2 mt-4 md:grid-cols-2 xl:grid-cols-3 md:gap-4 xl:gap-8">
                <li v-for="game in games" :key="game.id">
                    <Game :game="game" />
                </li>
                <li v-if="isLoading" v-for="num in 10" :key="num">
                    <LoadingGame />
                </li>
            </ul>
            <div v-if="games.length === 0">
                <p v-if="!isLoading && !isError" class="p-4 text-center text-red-500 bg-red-100 rounded-md">No
                    games in stock</p>
                <p v-if="isError" class="p-4 text-center text-red-500 bg-red-100 rounded-md">Can't fetch games</p>
            </div>
        </div>

    </main>
</template>