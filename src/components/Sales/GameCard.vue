<script setup lang="ts">
import { defineProps } from 'vue';
import { api_url } from '../../config';

const props = defineProps({
    sale: {
        type: Object,
        required: true
    }
});

props.sale.Purchase.created_at = new Date(props.sale.Purchase.created_at).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

props.sale.created_at = new Date(props.sale.created_at).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
</script>

<template>
    <article class="flex flex-row bg-orange-100 overflow-hidden rounded-xl h-full shadow-sm border border-orange-200">

        <div class="rounded-md flex w-1/4 h-full"> <!-- Left side -->
            <img :src="`${api_url}/${props.sale.Purchase.Game.image_url}`" alt="Game image"
                class="object-cover w-full h-full">
        </div>

        <div class="flex flex-col justify-between w-3/4 p-2"> <!-- Right side -->
            <div class="flex flex-row justify-between">
                <div id="details" class="flex flex-col max-w-[70%]">
                    <h3 class="text-lg font-semibold truncate">{{ props.sale.Purchase.Game.name }}</h3>

                    <p class="text-sm">
                        Acheté le {{ props.sale.Purchase.created_at }}<br>
                        <span class="font-semibold">Vendu le {{ props.sale.created_at }}</span><br>
                        Edition {{ props.sale.Purchase.Game.edition }}<br>
                        Etat : {{ props.sale.Purchase.state }}<br>
                        Contient : {{ props.sale.Purchase.content.length }} éléments<br>
                        {{ props.sale.Purchase.Game.console }}
                    </p>
                </div>

                <div id="prices" class="flex flex-col gap-1 items-end flex-none">
                    <p class="bg-green-400  px-2 py-1 rounded-lg font-semibold text-sm">+ {{
                        props.sale.solded_price }} €</p>
                </div>
            </div>

            <div id="controls" class="flex flex-row flex-wrap justify-end gap-1">
                <router-link :to="{ name: 'EditSale', params: { id: props.sale.id } }"
                    class="bg-white whitespace-nowrap border px-2 hover:px-3 transition-all py-1 rounded-lg font-semibold text-sm">Edit
                    this sale</router-link>
            </div>
        </div>
    </article>
</template>