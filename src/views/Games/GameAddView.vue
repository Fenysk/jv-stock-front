<script setup lang="ts">
import { ref } from 'vue';
import { createGame } from '../../services/games';
import { uploadImage } from '../../services/upload';
import { useRouter } from 'vue-router';
import { api_url } from '../../config';

const router = useRouter();

const newGame = ref({
    image_url: null,
    name: '',
    console: '',
    edition: 'Standard',
    region: '',
    released_year: null,
    barcode_data: 'NODATA'
})

const isUploading = ref(false);

async function handleUploadImage(event: Event) {
    try {
        const target = event.target as HTMLInputElement;

        if (!target.files) {
            newGame.value.image_url = null;
            return;
        }

        const image = target.files[0];

        if (!image) {
            newGame.value.image_url = null;
            return;
        }

        isUploading.value = true;
        const image_url = await uploadImage(image);
        isUploading.value = false;
        newGame.value.image_url = image_url;
    } catch (error: any) {
        isUploading.value = false;
        alert(error.message);
    }
}

async function handleSubmit() {

    try {
        const game = await createGame(newGame.value);

        if (game) {
            router.push({ name: 'Games' });
        }

    } catch (error: any) {
        alert(error.message);
    }

}
</script>

<template>
    <main id="AddGame" class="container p-2 pb-8 mx-auto">
        <h1>Add new game</h1>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 w-fit">

            <!-- Image -->
            <div class="flex flex-col gap-1">
                <label class="text-xl font-semibold" for="image">Game's picture</label>
                <div class="flex gap-2">
                    <img v-if="newGame.image_url" :src="`${api_url}/${newGame.image_url}`" :alt="newGame.name"
                        class="object-contain max-h-32">
                    <p v-if="isUploading">Uploading...</p>
                    <input required type="file" accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                        name="image" id="image" @change="handleUploadImage">
                </div>
            </div>

            <div class="flex flex-col gap-1">
                <label class="text-xl font-semibold" for="name">Game's name</label>
                <input required type="text" name="name" id="name" placeholder="Name of the game" v-model="newGame.name">
            </div>

            <div class="flex flex-col gap-1">
                <label class="text-xl font-semibold" for="content">Console</label>
                <select name="console" id="console" required v-model="newGame.console">
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
                    v-model="newGame.edition">
            </div>

            <!-- Region -->
            <div class="flex flex-col gap-1">
                <label class="text-xl font-semibold" for="region">Region</label>
                <select name="region" id="region" required v-model="newGame.region">
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
                    :max="new Date().getFullYear()" v-model="newGame.released_year">
            </div>

            <!-- Barcode_data -->
            <div class="flex flex-col gap-1">
                <label class="text-xl font-semibold" for="barcode_data">Barcode data</label>
                <input required type="text" name="barcode_data" id="barcode_data" placeholder="Barcode data of the game"
                    v-model="newGame.barcode_data">
            </div>

            <button
                class="px-4 py-2 mt-4 text-xl font-semibold text-orange-800 bg-orange-300 rounded-lg hover:bg-orange-400"
                type="submit">Save this new game</button>
        </form>
    </main>
</template>