<script setup lang="ts">
import { getSaleById, updateSaleSoldedPrice, deleteSale } from '../../services/sales';
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue';

const router = useRouter();
const sale = ref<any>({});

onBeforeMount(async () => {
    await fetchSale();
});

async function fetchSale() {
    const id = Number(router.currentRoute.value.params.id);
    sale.value = await getSaleById(id);
}

async function handleSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const sale_id = sale.value.id;
    const solded_price = Number(formData.get('solded_price'));

    try {
        const sale = await updateSaleSoldedPrice(sale_id, solded_price);

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
    <div>
        <h1>Add new sale</h1>

        <form @submit.prevent="handleSubmit">

            <!-- Solded_price -->
            <div class="flex gap-2 mb-4">
                <label for="solded_price">Solded price</label>
                <input required type="number" name="solded_price" id="solded_price" placeholder="Solded price of the game"
                    :value="sale.solded_price">
            </div>

            <button type="submit">Save sale</button>
            <button type="button" @click.prevent="handleDelete">Delete sale</button>
        </form>
    </div>
</template>