<script setup lang="ts">
import { defineProps } from 'vue';
import { config } from '../../config';

const props = defineProps({
    game: {
        type: Object,
        required: true
    }
});

</script>

<template>
    <article class="flex flex-row bg-orange-100 overflow-hidden rounded-xl h-full shadow-sm border border-orange-200">

        <div class="rounded-md flex w-1/4 h-full"> <!-- Left side -->
            <img :src="`${config.api.url}/${props.game.image_url}`" alt="Game image" class="object-cover w-full h-full">
        </div>

        <div class="flex flex-col justify-between w-3/4 p-2"> <!-- Right side -->
            <div class="flex flex-row justify-between">
                <div id="details" class="flex flex-col max-w-[70%]">
                    <h3 class="text-lg font-semibold truncate">{{ props.game.name }}</h3>

                    <p class="text-sm">Edition {{ props.game.edition }}<br>
                        Etat : {{ props.game.state }}<br>
                        {{ props.game.console }}</p>
                </div>

                <div id="prices" class="flex flex-col gap-1 items-end flex-none">
                    <p class="bg-red-400    text-gray-600 px-2 py-1 rounded-lg font-semibold text-sm">- {{
                        props.game.purchased_price }} €</p>
                    <p class="bg-yellow-400 text-gray-600 px-2 py-1 rounded-lg font-semibold text-sm">+ {{
                        props.game.estimated_price }} €</p>
                    <p class="bg-green-400  px-2 py-1 rounded-lg font-semibold text-sm">= {{ props.game.estimated_price -
                        props.game.purchased_price }} €</p>
                </div>
            </div>

            <div id="controls" class="flex flex-row justify-end gap-1">
                <router-link :to="{ name: 'AddSale', params: { id: props.game.purchase_id } }"
                    class="bg-white whitespace-nowrap border px-2 hover:px-3 transition-all py-1 rounded-lg font-semibold text-sm">Marquer
                    comme vendu</router-link>
            </div>
        </div>
    </article>
</template>