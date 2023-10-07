<script setup lang="ts">
import Sale from '../components/Sales/Sale.vue';
import { ref, onBeforeMount } from 'vue';
import { getSales } from '../services/sales';

const sales = ref<any>([]);

async function fetchSales() {
    sales.value = await getSales();
}

onBeforeMount(async () => {
    await fetchSales();
});

</script>

<template>
    <div>
        <h1>Sales</h1>

        <ul v-if="sales.length > 0" class="flex flex-col gap-4">
            <li v-for="sale in sales" :key="sale.id">
                <Sale :sale="sale" />
            </li>
        </ul>
        <p v-else>No sales found.</p>
    </div>
</template>