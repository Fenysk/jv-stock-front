<script setup lang="ts">
import { createSale } from '../../services/sales';
import { getPurchaseById } from '../../services/purchases';
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue';
import { api_url } from '../../config';

const router = useRouter();
const purchase = ref<any>({});

const newSale = ref({
    purchase_id: null,
    solded_price: null,
});

onBeforeMount(async () => {
    await fetchPurchase();
    newSale.value.purchase_id = purchase.value.id;
});

async function fetchPurchase() {
    const id = Number(router.currentRoute.value.params.id);
    purchase.value = await getPurchaseById(id);
}

async function handleSubmit() {

    try {
        const sale = await createSale(newSale);

        if (sale) {
            router.push({ name: 'Sales' });
        }

    } catch (error: any) {
        alert(error.message);
    }
}
</script>

<template>
    <main id="AddSale">
        <img v-if="purchase" :src="`${api_url}/${purchase.Game.image_url}`"
            class="object-cover w-full max-h-32 md:max-h-64">

        <div class="container p-2 pb-8 mx-auto">
            <h1>Add new sale</h1>

            <form @submit.prevent="handleSubmit">

                <!-- Solded_price -->
                <div class="flex flex-col items-start gap-1">
                    <label class="text-xl font-semibold" for="solded_price">Solded price</label>
                    <input required type="number" name="solded_price" id="solded_price"
                        placeholder="Solded price of the game" v-model="newSale.solded_price">
                </div>

                <button
                    class="px-4 py-2 mt-4 text-xl font-semibold text-orange-800 bg-orange-300 rounded-lg hover:bg-orange-400"
                    type="submit">Mark as sold</button>
            </form>
        </div>
    </main>
</template>