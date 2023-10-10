<script setup lang="ts">
import { defineProps } from 'vue';
import { config } from '../../config';

const props = defineProps({
    purchase: {
        type: Object,
        required: true
    }
});

props.purchase.created_at = new Date(props.purchase.created_at).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
</script>

<template>
    <article class="flex flex-row bg-orange-100 overflow-hidden rounded-xl h-full shadow-sm border border-orange-200"
        :class="{ 'opacity-50': props.purchase.Sale }">

        <div class="rounded-md flex w-1/4 h-full"> <!-- Left side -->
            <img :src="`${config.api.url}/${props.purchase.Game.image_url}`" alt="Game image"
                class="object-cover w-full h-full">
        </div>

        <div class="flex flex-col justify-between w-3/4 p-2"> <!-- Right side -->
            <div class="flex flex-row justify-between">
                <div id="details" class="flex flex-col max-w-[70%]">
                    <h3 class="text-lg font-semibold truncate">{{ props.purchase.Game.name }}</h3>

                    <p class="text-sm">
                        <span class="font-semibold">Acheté le {{ props.purchase.created_at }}</span><br>
                        Edition {{ props.purchase.Game.edition }}<br>
                        Etat : {{ props.purchase.state }}<br>
                        Contient : {{ props.purchase.content.length }} éléments<br>
                        {{ props.purchase.Game.console }}
                    </p>
                </div>

                <div id="prices" class="flex flex-col gap-1 items-end flex-none">
                    <p class="bg-red-400    text-gray-600 px-2 py-1 rounded-lg font-semibold text-sm">- {{
                        props.purchase.purchased_price }} €</p>
                    <p class="bg-yellow-400 text-gray-600 px-2 py-1 rounded-lg font-semibold text-sm">+ {{
                        props.purchase.estimated_price }} €</p>
                    <p class="bg-green-400  px-2 py-1 rounded-lg font-semibold text-sm">= {{
                        props.purchase.estimated_price -
                        props.purchase.purchased_price }} €</p>
                </div>
            </div>

            <div id="controls" v-if="!props.purchase.Sale" class="flex flex-row flex-wrap justify-end gap-1">
                <router-link :to="{ name: 'EditPurchase', params: { id: props.purchase.id } }"
                    class="bg-white whitespace-nowrap border px-2 hover:px-3 transition-all py-1 rounded-lg font-semibold text-sm">Edit
                    caracteristics</router-link>
                <router-link :to="{ name: 'AddSale', params: { id: props.purchase.id } }"
                    class="bg-white whitespace-nowrap border px-2 hover:px-3 transition-all py-1 rounded-lg font-semibold text-sm">Mark
                    as sold</router-link>
            </div>
        </div>
    </article>
</template>