<script setup lang="ts">
import { defineProps } from 'vue';
import { config } from '../../config';
import { deleteGame } from '../../services/games';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    game: {
        type: Object,
        required: true
    }
});

async function handleDelete() {
    if (!confirm('Are you sure you want to delete this game?')) {
        return;
    }

    try {
        await deleteGame(props.game.id);
        alert('Game deleted');
        location.reload();
    } catch (error: any) {
        alert(error.message)
    }
}

function goToEditing() {
    router.push({ name: 'EditGame', params: { id: props.game.id } });
}

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
                <p><b>Quantité</b> : {{ props.game.quantity }}</p>
            </div>
            <button class="button" @click="handleDelete">Delete</button>
            <button class="button" @click="goToEditing">Edit game</button>
        </div>
    </article>
</template>