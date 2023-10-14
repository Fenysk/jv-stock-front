<script setup lang="ts">
import { updateGame, getGameById, deleteGame } from '../../services/games';
import { uploadImage } from '../../services/upload';
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue';
import { api_url } from '../../config';

const router = useRouter();

const game = ref<any>({});
const editedGame = ref<any>({});

const isUploading = ref(false);

onBeforeMount(async () => {
    const id = Number(router.currentRoute.value.params.id);
    await fetchGame(id);
});

async function fetchGame(id: number) {
    game.value = await getGameById(id);
    editedGame.value = {
        id: game.value.id,
        name: game.value.name,
        console: game.value.console,
        edition: game.value.edition,
        region: game.value.region,
        released_year: game.value.released_year,
        barcode_data: game.value.barcode_data,
        image_url: game.value.image_url,
    };
}

async function handleUploadImage(event: Event) {
    try {
        console.log('handleUploadImage');
        const target = event.target as HTMLInputElement;

        if (!target.files) {
            game.value.image_url = null;
            return;
        }

        console.log('target.files', target.files);
        const image = target.files[0];

        if (!image) {
            game.value.image_url = null;
            return;
        }

        isUploading.value = true;
        const image_url = await uploadImage(image);
        console.log('image_url', image_url);
        isUploading.value = false;
        editedGame.value.image_url = image_url;
    } catch (error: any) {
        isUploading.value = false;
        alert(error.message);
    }
}

async function handleSubmit() {

    try {
        const game = await updateGame(editedGame.value);

        if (game) {
            router.push({ name: 'Games' });
        }

    } catch (error: any) {
        alert(error.message);
    }

}

async function handleDelete() {
    if (!confirm('Are you sure you want to delete this game?')) {
        return;
    }

    try {
        await deleteGame(game.value.id);
        alert('Game deleted');
        router.push({ name: 'Games' });
    } catch (error: any) {
        alert(error.message)
    }
}
</script>

<template>
    <main id="EditGame" class="container p-2 pb-8 mx-auto">
        <h1>Edit game</h1>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 w-fit">

            <!-- Image -->
            <div class="flex flex-col gap-1">
                <label class="text-xl font-semibold" for="image">Game's picture</label>
                <div class="flex gap-2">
                    <img v-if="editedGame.image_url" :src="`${api_url}/${editedGame.image_url}`" :alt="editedGame.name"
                        class="object-contain max-h-32">
                    <p v-if="isUploading">Uploading...</p>
                    <input type="file" accept="image/png, image/jpg, image/jpeg, image/gif, image/webp" name="image"
                        id="image" @change="handleUploadImage">
                </div>
            </div>

            <div class="flex flex-col gap-1">
                <label class="text-xl font-semibold" for="name">Game's name</label>
                <input required type="text" name="name" id="name" placeholder="Name of the game" v-model="editedGame.name">
            </div>

            <div class="flex flex-col gap-1">
                <label class="text-xl font-semibold" for="content">Console</label>
                <select name="console" id="console" required v-model="editedGame.console">
                    <option value="Nintendo Switch">Nintendo Switch</option>
                    <option value="Nintendo WiiU">Nintendo Wii U</option>
                    <option value="Nintendo Wii">Nintendo Wii</option>
                    <option value="Nintendo GameCube">Nintendo GameCube</option>
                    <option value="Nintendo 64">Nintendo 64</option>
                    <option value="Nintendo SNES">Nintendo SNES</option>
                    <option value="Nintendo NES">Nintendo NES</option>
                    <option value="Nintendo 3DS">Nintendo 3DS</option>
                    <option value="Nintendo DS">Nintendo DS</option>
                    <option value="Nintendo GameBoy Advance">Nintendo GameBoy Advance</option>
                    <option value="Nintendo GameBoy Color">Nintendo GameBoy Color</option>
                    <option value="Nintendo GameBoy">Nintendo GameBoy</option>
                    <option value="Sony PlayStation 5">Sony PlayStation 5</option>
                    <option value="Sony PlayStation 4">Sony PlayStation 4</option>
                    <option value="Sony PlayStation 3">Sony PlayStation 3</option>
                    <option value="Sony PlayStation 2">Sony PlayStation 2</option>
                    <option value="Sony PlayStation 1">Sony PlayStation 1</option>
                    <option value="Sony PS Vita">Sony PS Vita</option>
                    <option value="Sony PSP">Sony PSP</option>
                    <option value="Microsoft Xbox Series X">Microsoft Xbox Series</option>
                    <option value="Microsoft Xbox One">Microsoft Xbox One</option>
                    <option value="Microsoft Xbox 360">Microsoft Xbox 360</option>
                    <option value="Microsoft Xbox">Microsoft Xbox</option>
                </select>
            </div>

            <!-- Edition -->
            <div class="flex flex-col gap-1">
                <label class="text-xl font-semibold" for="edition">Edition</label>
                <input required type="text" name="edition" id="edition" placeholder="Edition of the game"
                    v-model="editedGame.edition">
            </div>

            <!-- Region -->
            <div class="flex flex-col gap-1">
                <label class="text-xl font-semibold" for="region">Region</label>
                <select name="region" id="region" required v-model="editedGame.region">
                    <option value="EUR">Europe</option>
                    <option value="USA">USA</option>
                    <option value="JPN">Japan</option>
                    <option value="FR">France</option>
                    <option value="INT">International</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>

            <!-- Released year -->
            <div class="flex flex-col gap-1">
                <label class="text-xl font-semibold" for="released_year">Game's released year</label>
                <input required type="number" name="released_year" id="released_year" placeholder="2005" min="1958"
                    :max="new Date().getFullYear()" v-model="editedGame.released_year">
            </div>

            <!-- Barcode_data -->
            <div class="flex flex-col gap-1">
                <label class="text-xl font-semibold" for="barcode_data">Barcode data</label>
                <input required type="text" name="barcode_data" id="barcode_data" placeholder="Barcode data of the game"
                    v-model="editedGame.barcode_data">
            </div>

            <div class="flex justify-between">
                <button
                    class="px-4 py-2 mt-4 text-xl font-semibold text-orange-800 bg-orange-300 rounded-lg hover:bg-orange-400"
                    type="submit">Save</button>
                <button class="px-4 py-2 mt-4 text-xl font-semibold text-red-800 bg-red-300 rounded-lg hover:bg-red-400"
                    type="button" @click="handleDelete">Delete</button>
            </div>

        </form>
    </main>
</template>