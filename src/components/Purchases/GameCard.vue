<script setup lang="ts">
import { defineProps } from 'vue';
import { api_url } from '../../config';

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
    <article class="flex flex-row h-full overflow-hidden bg-orange-100 border border-orange-200 shadow-sm rounded-xl"
        :class="{ 'opacity-50': props.purchase.Sale }">

        <div class="flex w-1/4 h-full rounded-md"> <!-- Left side -->
            <img :src="`${api_url}/${props.purchase.Game.image_url}`" alt="Game image"
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
                        Contient {{ props.purchase.content.length }} éléments<br>
                        {{ props.purchase.Game.console }}
                    </p>
                </div>

                <div id="prices" class="flex flex-col items-end flex-none gap-1">
                    <p class="px-2 py-1 text-sm font-semibold text-gray-600 bg-red-400 rounded-lg">- {{
                        props.purchase.purchased_price }} €</p>
                    <p class="px-2 py-1 text-sm font-semibold text-gray-600 bg-yellow-400 rounded-lg">+ {{
                        props.purchase.estimated_price }} €</p>
                    <p class="px-2 py-1 text-sm font-semibold bg-green-400 rounded-lg">= {{
                        props.purchase.estimated_price -
                        props.purchase.purchased_price }} €</p>
                </div>
            </div>

            <div id="controls" v-if="!props.purchase.Sale" class="flex flex-row flex-wrap justify-end gap-1">
                <router-link :to="{ name: 'EditPurchase', params: { id: props.purchase.id } }"
                    class="px-2 py-1 text-sm font-semibold transition-all bg-white border rounded-lg whitespace-nowrap hover:px-3">Edit
                    caracteristics</router-link>
                <router-link :to="{ name: 'AddSale', params: { id: props.purchase.id } }"
                    class="px-2 py-1 text-sm font-semibold transition-all bg-white border rounded-lg whitespace-nowrap hover:px-3">Mark
                    as sold</router-link>
            </div>
        </div>
    </article>
</template>