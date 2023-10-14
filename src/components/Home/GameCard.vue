<script setup lang="ts">
import { defineProps } from 'vue';
import { api_url } from '../../config';

const props = defineProps({
    game: {
        type: Object,
        required: true
    }
});

props.game.created_at = new Date(props.game.created_at).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
</script>

<template>
    <article class="flex flex-row h-full overflow-hidden bg-orange-100 border border-orange-200 shadow-sm rounded-xl">

        <div class="flex w-1/4 h-full rounded-md"> <!-- Left side -->
            <img :src="`${api_url}/${props.game.image_url}`" alt="Game image" class="object-cover w-full h-full">
        </div>

        <div class="flex flex-col justify-between w-3/4 gap-2 p-2"> <!-- Right side -->
            <div class="flex flex-row justify-between">
                <div id="details" class="flex flex-col max-w-[70%]">
                    <h3 class="text-lg font-semibold truncate">{{ props.game.name }}</h3>

                    <p class="text-sm">
                        <span class="font-semibold">Acheté le {{ props.game.created_at }}</span><br>
                        Edition {{ props.game.edition }}<br>
                        Etat : {{ props.game.state }}<br>
                        Contient {{ props.game.content.length }} éléments<br>
                        {{ props.game.console }}
                    </p>
                </div>

                <div id="prices" class="flex flex-col items-end flex-none gap-1">
                    <p class="px-2 py-1 text-sm font-semibold text-gray-600 bg-red-400 rounded-lg">- {{
                        props.game.purchased_price }} €</p>
                    <p class="px-2 py-1 text-sm font-semibold text-gray-600 bg-yellow-400 rounded-lg">+ {{
                        props.game.estimated_price }} €</p>
                    <p class="px-2 py-1 text-sm font-semibold bg-green-400 rounded-lg">= {{ props.game.estimated_price -
                        props.game.purchased_price }} €</p>
                </div>
            </div>

            <div id="controls" class="flex flex-row justify-end gap-1">
                <router-link :to="{ name: 'AddSale', params: { id: props.game.purchase_id } }"
                    class="px-2 py-1 text-sm font-semibold transition-all bg-white border rounded-lg whitespace-nowrap hover:px-3">Marquer
                    comme vendu</router-link>
            </div>
        </div>
    </article>
</template>