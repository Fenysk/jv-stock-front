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
    <article class="flex gap-4 bg-gray-200 p-4 rounded-xl">

        <div class="rounded-md flex w-1/4 h-full"> <!-- Left side -->
            <img :src="`${config.api.url}/${props.game.image_url}`" alt="Game image" class="object-cover w-full">
        </div>

        <div class="w-3/4"> <!-- Right side -->
            <h3>{{ props.game.name }}</h3>
            <div>
                <p><b>Console</b> : {{ props.game.console }}</p>
                <p><b>Région</b> : {{ props.game.region }}</p>
                <p><b>Edition</b> : {{ props.game.edition }}</p>
                <p><b>Contient</b> : <span v-for="content in props.game.content" :key="content"> - {{ content }}</span></p>
                <p><b>Etat</b> : {{ props.game.state }}</p>
                <p><b>Prix acheté</b> : {{ props.game.purchased_price }} €</p>
                <p><b>Prix estimé</b> : {{ props.game.estimated_price }} €</p>
            </div>
        </div>
    </article>
</template>