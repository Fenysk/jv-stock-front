<script setup lang="ts">
import { getSaleById, updateSaleSoldedPrice, deleteSale } from '../../services/sales';
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue';

const router = useRouter();

const sale = ref<any>({});
const editedSale = ref<any>({});

onBeforeMount(async () => {
    const id = Number(router.currentRoute.value.params.id);
    await fetchSale(id);
});

async function fetchSale(id: number) {
    sale.value = await getSaleById(id);
    editedSale.value = {
        id: sale.value.id,
        solded_price: sale.value.solded_price,
    };
}

async function handleSubmit() {

    try {
        const sale = await updateSaleSoldedPrice(editedSale.value);

        if (sale) {
            router.push({ name: 'Sales' });
        }

    } catch (error: any) {
        alert(error.message);
    }
}

async function handleDelete() {
    if (!confirm('Are you sure you want to delete this sale ?')) {
        return;
    }

    try {
        await deleteSale(sale.value.id);
        alert('Sale deleted');
        router.push({ name: 'Sales' });
    } catch (error: any) {
        alert(error.message)
    }
}
</script>

<template>
    <main id="AddSale">

        <div class="container p-2 pb-8 mx-auto">
            <h1>Add new sale</h1>

            <form @submit.prevent="handleSubmit">

                <!-- Solded_price -->
                <div class="flex flex-col items-start gap-1">
                    <label class="text-xl font-semibold" for="solded_price">Solded price</label>
                    <input required type="number" name="solded_price" id="solded_price"
                        placeholder="Solded price of the game" v-model="editedSale.solded_price">
                </div>

                <div class="flex">
                    <button
                        class="px-4 py-2 mt-4 text-xl font-semibold text-orange-800 bg-orange-300 rounded-lg hover:bg-orange-400"
                        type="submit">Mark as sold</button>
                    <button
                        class="px-4 py-2 mt-4 ml-4 text-xl font-semibold text-red-800 bg-red-300 rounded-lg hover:bg-red-400"
                        type="button" @click="handleDelete">Delete</button>

                </div>
            </form>
        </div>
    </main>
</template>