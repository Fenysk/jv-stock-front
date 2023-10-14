<script setup lang="ts">
import { defineProps } from 'vue';
import { api_url } from '../../config';

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
            <img :src="`${api_url}/${props.game.image_url}`" alt="Game image" class="object-cover w-full h-full">
        </div>

        <div class="flex flex-col justify-between p-2 w-3/4"> <!-- Right side -->
            <div class="flex flex-row justify-between">
                <div id="details" class="flex flex-col max-w-[70%]">
                    <h3 class="text-lg font-semibold truncate">{{ props.game.name }}</h3>

                    <p class="text-sm">Région : {{ props.game.region }}<br>
                        Edition {{ props.game.edition }}<br>
                        {{ props.game.console }}</p>
                </div>

                <div id="quatity" class="flex flex-col gap-1 items-end flex-none">
                    <p :class="props.game.quantity > 0 ? 'bg-green-300' : 'bg-orange-300'"
                        class="px-2 py-1 rounded-lg text-sm">En stock : <strong>{{ props.game.quantity
                        }}</strong></p>
                </div>
            </div>

            <div id="controls" class="flex flex-row justify-end gap-1">
                <router-link :to="{ name: 'EditGame', params: { id: props.game.id } }"
                    class="bg-white whitespace-nowrap border px-2 hover:px-3 transition-all py-1 rounded-lg font-semibold text-sm">Modifier</router-link>
                <router-link :to="{ name: 'AddPurchase', params: { id: props.game.id } }"
                    class="bg-white whitespace-nowrap border px-2 hover:px-3 transition-all py-1 rounded-lg font-semibold text-sm">Acheter</router-link>
            </div>


        </div>
    </article>
</template>