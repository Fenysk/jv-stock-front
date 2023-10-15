<script setup lang="ts">
import Game from '../components/Games/GameCard.vue';
import LoadingGame from '../components/Common/LoadingGameCard.vue';

import { ref, onBeforeMount } from 'vue';
import { getAllGames } from '../services/games';

const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);
const games = ref<any>([]);
const sort = ref<string>('name');

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

function sortGames(sort: string) {
    if (sort === 'name') {
        games.value.sort((a: any, b: any) => {
            return a.name.localeCompare(b.name);
        });
    } else if (sort === 'released_year') {
        games.value.sort((a: any, b: any) => {
            return a.released_year - b.released_year;
        });
    } else if (sort === 'console') {
        games.value.sort((a: any, b: any) => {
            return a.console.localeCompare(b.console);
        });
    }
}

onBeforeMount(async () => {
    await fetchGames();
    sortGames(sort.value);
});

</script>

<template>
    <main id="Games" class="container p-2 mx-auto">
        <h1>Games list</h1>

        <div id="controls" class="flex flex-row flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-4">
                <div id="search" class="flex items-center gap-2">
                    <input @input="searchGames(searchInput)" v-model="searchInput" type="text"
                        placeholder="Rechercher un jeu" />
                    <button v-if="searchInput" @click="clearSearch">❌</button>
                </div>
                <div id="sort" class="flex items-center gap-2">
                    <label for="sort">Sort by</label>
                    <select @change="sortGames(sort)" v-model="sort" name="sort" id="sort">
                        <option value="name">Name</option>
                        <option value="released_year">Released date</option>
                        <option value="console">Console</option>
                    </select>
                </div>
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