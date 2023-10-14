<script setup lang="ts">
import Sale from '../components/Sales/GameCard.vue';
import LoadingGame from '../components/Common/LoadingGameCard.vue';
import { ref, onBeforeMount } from 'vue';
import { getSales } from '../services/sales';

const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);
const sales = ref<any>([]);

async function fetchSales() {
    try {
        isLoading.value = true;
        sales.value = await getSales();
        isLoading.value = false;
        isError.value = false;
    } catch (error: any) {
        isError.value = true;
        isLoading.value = false;
        throw error.message;
    }
}

const searchInput = ref<string>('');

function searchSales(search?: string) {

    if (!search) {
        fetchSales();
        return;
    }

    sales.value = sales.value.filter((sale: any) => {
        return sale.Purchase.Game.name.toLowerCase().includes(search.toLowerCase()) ||
            sale.Purchase.Game.console.toLowerCase().includes(search.toLowerCase())
    });
}

function clearSearch() {
    searchInput.value = '';
    fetchSales();
}

onBeforeMount(async () => {
    await fetchSales();
});

</script>

<template>
    <main id="Sales" class="container p-2 mx-auto">
        <h1>Sales</h1>

        <div id="controls" class="flex flex-row flex-wrap items-center justify-between gap-4">
            <div id="search" class="flex gap-2">
                <input @input="searchSales(searchInput)" v-model="searchInput" type="text"
                    placeholder="Rechercher une vente" />
                <button v-if="searchInput" @click="clearSearch">❌</button>
            </div>
        </div>

        <div id="games-list">
            <ul class="grid grid-cols-1 gap-2 mt-4 md:grid-cols-2 xl:grid-cols-3 md:gap-4 xl:gap-8">
                <li v-for="sale in sales" :key="sale.id">
                    <Sale :sale="sale" />
                </li>
                <li v-if="isLoading" v-for="n in 10" :key="n">
                    <LoadingGame />
                </li>
            </ul>
            <div v-if="sales.length === 0">
                <p v-if="!isLoading && !isError" class="p-4 text-center text-red-500 bg-red-100 rounded-md">No
                    sales in stock</p>
                <p v-if="isError" class="p-4 text-center text-red-500 bg-red-100 rounded-md">Can't fetch games</p>
            </div>
        </div>
    </main>
</template>