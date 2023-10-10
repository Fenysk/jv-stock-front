<script setup lang="ts">
import LoadingGame from '../components/Common/LoadingGameCard.vue';
import Game from '../components/Purchases/GameCard.vue';
import { ref, onBeforeMount } from 'vue';
import { getPurchases } from '../services/purchases';

const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);
const purchases = ref<any>([]);

async function fetchPurchases() {
    try {
        isLoading.value = true;
        purchases.value = await getPurchases();
        isLoading.value = false;
        isError.value = false;
    } catch (error: any) {
        isLoading.value = false;
        isError.value = true;
        throw error.message;
    }
}

const searchInput = ref<string>('');

function searchPurchases(search?: string) {

    if (!search) {
        fetchPurchases();
        return;
    }

    purchases.value = purchases.value.filter((purchase: any) => {
        return purchase.Game.name.toLowerCase().includes(search.toLowerCase()) ||
            purchase.Game.console.toLowerCase().includes(search.toLowerCase())
    });
}

function clearSearch() {
    searchInput.value = '';
    fetchPurchases();
}

onBeforeMount(async () => {
    await fetchPurchases();
});

</script>

<template>
    <main id="Purchases" class="container mx-auto">
        <h1>Purchases</h1>

        <div id="controls" class="flex flex-row flex-wrap justify-between items-center gap-4">
            <div id="search" class="flex gap-2">
                <input @input="searchPurchases(searchInput)" v-model="searchInput" type="text"
                    placeholder="Rechercher un achat" />
                <button v-if="searchInput" @click="clearSearch">❌</button>
            </div>
            <router-link :to="{ name: 'AddPurchase' }" class="bg-white py-2 px-4 rounded-md border shadow">➕ Add
                purchase</router-link>
        </div>

        <div id="purchases-list">
            <ul class="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 xl:gap-8">
                <li v-for="purchase in purchases" :key="purchase.id">
                    <Game :purchase="purchase" />
                </li>
                <li v-if="isLoading" v-for="n in 10" :key="n">
                    <LoadingGame />
                </li>
            </ul>
            <div v-if="purchases.length === 0">
                <p v-if="!isLoading && !isError" class="text-center bg-red-100 text-red-500 p-4 rounded-md">No
                    purchases in stock</p>
                <p v-if="isError" class="text-center bg-red-100 text-red-500 p-4 rounded-md">Can't fetch games</p>
            </div>
        </div>
    </main>
</template>