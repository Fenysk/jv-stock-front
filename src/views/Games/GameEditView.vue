<script setup lang="ts">
import { updateGame, getGameById } from '../../services/games';
import { uploadImage } from '../../services/upload';
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue';

const router = useRouter();
const game = ref<any>({});

onBeforeMount(async () => {
    const id = Number(router.currentRoute.value.params.id);
    await fetchGame(id);
});

async function fetchGame(id: number) {
    game.value = await getGameById(id);
}

async function handleSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData: any = new FormData(form);

    if (formData.get('image').size > 0) {
        try {
            const image = formData.get('image') as File;
            const image_url = await uploadImage(image);
            formData.set('image_url', image_url);
        } catch (error: any) {
            alert(error.message);
        }
    }

    formData.delete('image');

    let editedGame = {
        ...Object.fromEntries(formData),
        id: Number(game.value.id),
        released_year: Number(formData.get('released_year'))
    };

    try {
        // Try to update the game
        const game = await updateGame(editedGame);

        if (game) {
            router.push({ name: 'Games' });
        }

    } catch (error: any) {
        alert(error.message);
    }

}
</script>

<template>
    <div>
        <h1>Edit game</h1>

        <form @submit.prevent="handleSubmit">

            <!-- Image -->
            <div class="flex gap-2 mb-4">
                <label for="image">Image</label>
                <input type="file" accept="image/png, image/jpg, image/jpeg, image/gif" name="image" id="image"
                    placeholder="Image of the game">
            </div>

            <!-- Image url -->
            <div class="flex gap-2 mb-4">
                <label for="image_url">Image url</label>
                <input required type="text" name="image_url" id="image_url" placeholder="Image url of the game"
                    :value="game.image_url">
            </div>

            <div class="flex gap-2 mb-4">
                <label for="name">Name</label>
                <input required type="text" name="name" id="name" placeholder="Name of the game" :value="game.name">
            </div>

            <div class="flex gap-2 mb-4">
                <label for="content">Console</label>
                <input required type="text" name="console" id="console" placeholder="Console of the game"
                    :value="game.console">
            </div>

            <!-- Edition -->
            <div class="flex gap-2 mb-4">
                <label for="edition">Edition</label>
                <input required type="text" name="edition" id="edition" placeholder="Edition of the game"
                    :value="game.edition">
            </div>

            <!-- Region -->
            <div class="flex gap-2 mb-4">
                <label for="region">Region</label>
                <select name="region" id="region">
                    <option :selected="game.region === 'EUR'" required value="EUR">Europe</option>
                    <option :selected="game.region === 'USA'" required value="USA">USA</option>
                    <option :selected="game.region === 'JPN'" required value="JPN">Japan</option>
                    <option :selected="game.region === 'INT'" required value="INT">International</option>
                </select>
            </div>

            <!-- Released year -->
            <div class="flex gap-2 mb-4">
                <label for="released_year">Released year</label>
                <input required type="number" name="released_year" id="released_year"
                    placeholder="Released year of the game" :value="game.released_year">
            </div>

            <!-- Barcode_data -->
            <div class="flex gap-2 mb-4">
                <label for="barcode_data">Barcode data</label>
                <input required type="text" name="barcode_data" id="barcode_data" placeholder="Barcode data of the game"
                    :value="game.barcode_data">
            </div>

            <button type="submit">Save game</button>
        </form>
    </div>
</template>