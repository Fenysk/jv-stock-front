<script setup lang="ts">
import { createSale } from '../../services/sales';
import { getPurchaseById } from '../../services/purchases';
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue';

const router = useRouter();
const purchase = ref<any>({});

onBeforeMount(async () => {
    await fetchPurchase();
});

async function fetchPurchase() {
    const id = Number(router.currentRoute.value.params.id);
    purchase.value = await getPurchaseById(id);
}

async function handleSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    let newSale = {
        ...Object.fromEntries(formData),
        purchase_id: purchase.value.id,
        solded_price: Number(formData.get('solded_price')),
    };

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
    <div>
        <h1>Add new sale</h1>

        <form @submit.prevent="handleSubmit">

            <!-- Solded_price -->
            <div class="flex gap-2 mb-4">
                <label for="solded_price">Solded price</label>
                <input required type="number" name="solded_price" id="solded_price" placeholder="Solded price of the game"
                    value="30">
            </div>

            <button type="submit">Save sale</button>
        </form>
    </div>
</template>