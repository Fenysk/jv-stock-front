<script setup lang="ts">
import { defineProps } from 'vue';
import { config } from '../../config';
import { deletePurchase } from '../../services/purchases';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    purchase: {
        type: Object,
        required: true
    }
});

async function handleDelete() {
    if (!confirm('Are you sure you want to delete this purchase?')) {
        return;
    }

    try {
        await deletePurchase(props.purchase.id);
        alert('Purchase deleted');
        location.reload();
    } catch (error: any) {
        alert(error.message)
    }
}

function goToEditing() {
    router.push({ name: 'EditPurchase', params: { id: props.purchase.id } });
}

function goToSelling() {
    router.push({ name: 'AddSale', params: { id: props.purchase.id } });
}
</script>

<template>
    <article class="flex gap-4 p-4 rounded-xl" :class="{
        'bg-green-200': !props.purchase.Sale,
        'bg-gray-200': props.purchase.Sale
    }">

        <div class="rounded-md flex w-1/4 h-full"> <!-- Left side -->
            <img :src="`${config.api.url}/${props.purchase.Game.image_url}`" alt="Game image" class="object-cover w-full">
        </div>

        <div class="w-3/4"> <!-- Right side -->
            <h3>{{ props.purchase.Game.name }}</h3>
            <div>
                <div v-if="!props.purchase.Sale">
                    <p><b>Console</b> : {{ props.purchase.Game.console }}</p>
                    <p><b>Contient</b> : <span v-for="content in props.purchase.content" :key="content"> - {{ content
                    }}</span></p>
                    <p><b>Etat</b> : {{ props.purchase.state }}</p>
                    <p><b>Prix acheté</b> : {{ props.purchase.purchased_price }} €</p>
                    <p><b>Prix estimé</b> : {{ props.purchase.estimated_price }} €</p>
                </div>
                <div v-else>
                    <p><b>Prix vendu</b> : {{ props.purchase.Sale.solded_price }} €</p>
                </div>
            </div>
            <div v-if="!props.purchase.Sale">
                <button class="button" @click="goToSelling">Mark as sold</button>
                <button class="button" @click="handleDelete">Delete</button>
                <button class="button" @click="goToEditing">Edit caracteristics</button>
            </div>
        </div>
    </article>
</template>