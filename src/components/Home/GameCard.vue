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
    <router-link :to="{ name: 'EditPurchase', params: { id: props.game.purchase_id } }">
        <article class="flex flex-row bg-orange-100 overflow-hidden rounded-xl h-32 shadow-sm border border-orange-200">

            <div class="rounded-md flex w-1/4 h-full"> <!-- Left side -->
                <img :src="`${config.api.url}/${props.game.image_url}`" alt="Game image" class="object-cover w-full">
            </div>

            <div class="flex flex-row justify-between p-2 w-3/4"> <!-- Right side -->

                <div id="details" class="flex flex-col">
                    <h3 class="text-lg font-semibold">{{ props.game.name }}</h3>

                    <p>Edition {{ props.game.edition }}</p>
                    <p>Etat : {{ props.game.state }}</p>
                    <p>{{ props.game.console }}</p>
                </div>

                <div id="prices" class="flex flex-col gap-1 items-end">
                    <p class="bg-red-400    text-gray-600 px-2 py-1 rounded-lg font-semibold text-sm">- {{
                        props.game.purchased_price }} €</p>
                    <p class="bg-yellow-400 text-gray-600 px-2 py-1 rounded-lg font-semibold text-sm">+ {{
                        props.game.estimated_price }} €</p>
                    <p class="bg-green-400  px-2 py-1 rounded-lg font-semibold text-sm">= {{ props.game.estimated_price -
                        props.game.purchased_price }} €</p>
                </div>

            </div>
        </article>
    </router-link>
</template>