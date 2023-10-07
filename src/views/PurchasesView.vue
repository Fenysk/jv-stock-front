<script setup lang="ts">
import Purchase from '../components/Purchases/Purchase.vue';
import { ref, onBeforeMount } from 'vue';
import { getPurchases } from '../services/purchases';

const purchases = ref<any>([]);

async function fetchPurchases() {
    purchases.value = await getPurchases();
}

onBeforeMount(async () => {
    await fetchPurchases();
});

</script>

<template>
    <div>
        <h1>Purchases</h1>

        <div class="controls">
            <router-link to="/purchases/add" class="button">Add a new purchase</router-link>
        </div>

        <ul v-if="purchases.length > 0" class="flex flex-col gap-4">
            <li v-for="purchase in purchases" :key="purchase.id">
                <Purchase :purchase="purchase" />
            </li>
        </ul>
        <p v-else>No purchases found.</p>
    </div>
</template>