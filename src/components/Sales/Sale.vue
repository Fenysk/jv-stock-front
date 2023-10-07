<script setup lang="ts">
import { defineProps } from 'vue';
import { config } from '../../config';
import { deleteSale } from '../../services/sales';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    sale: {
        type: Object,
        required: true
    }
});

async function handleDelete() {
    if (!confirm('Are you sure you want to delete this sale?')) {
        return;
    }

    try {
        await deleteSale(props.sale.id);
        alert('Sale deleted');
        location.reload();
    } catch (error: any) {
        alert(error.message)
    }
}

function goToEditing() {
    router.push({ name: 'EditSale', params: { id: props.sale.id } });
}
</script>

<template>
    <article class="flex gap-4 p-4 rounded-xl bg-gray-200">

        <div class="rounded-md flex w-1/4 h-full"> <!-- Left side -->
            <img :src="`${config.api.url}/${props.sale.Purchase.Game.image_url}`" alt="Game image"
                class="object-cover w-full">
        </div>

        <div class="w-3/4"> <!-- Right side -->
            <h3>{{ props.sale.Purchase.Game.name }}</h3>
            <div>
                <p><b>Console</b> : {{ props.sale.Purchase.Game.console }}</p>
                <p><b>Région</b> : {{ props.sale.Purchase.Game.region }}</p>
                <p><b>Edition</b> : {{ props.sale.Purchase.Game.edition }}</p>
                <p><b>Contient</b> : <span v-for="content in props.sale.Purchase.content" :key="content"> - {{ content }}</span></p>
                <p><b>Etat</b> : {{ props.sale.Purchase.state }}</p>
                <p><b>Prix d'achat</b> : {{ props.sale.Purchase.purchased_price }} €</p>
                <p><b>Prix estimé</b> : {{ props.sale.Purchase.estimated_price }} €</p>
                <p><b>Prix vendu</b> : {{ props.sale.solded_price }} €</p>

            </div>
            <button class="button" @click="handleDelete">Delete</button>
            <button class="button" @click="goToEditing">Edit solded price</button>
        </div>
    </article>
</template>