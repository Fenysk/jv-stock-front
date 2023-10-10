<script setup lang="ts">
import { createGame } from '../../services/games';
import { uploadImage } from '../../services/upload';
import { useRouter } from 'vue-router';

const router = useRouter();

async function handleSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Upload the image
    try {
        const image = formData.get('image') as File;
        const image_url = await uploadImage(image);
        formData.set('image_url', image_url);
        formData.delete('image');
    } catch (error: any) {
        alert(error.message);
    }

    let newGame = {
        ...Object.fromEntries(formData),
        released_year: Number(formData.get('released_year'))
    };

    try {
        // Try to create the game
        const game = await createGame(newGame);

        if (game) {
            router.push({ name: 'Games' });
        }

    } catch (error: any) {
        alert(error.message);
    }

}
</script>

<template>
    <main id="AddGame" class="container mx-auto">
        <h1>Add new game</h1>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 w-fit">

            <!-- Image -->
            <div class="flex flex-col gap-1">
                <label class="font-semibold text-xl" for="image">Game's picture</label>
                <input required type="file" accept="image/png, image/jpg, image/jpeg, image/gif, image/webp" name="image"
                    id="image">
            </div>

            <div class="flex flex-col gap-1">
                <label class="font-semibold text-xl" for="name">Game's name</label>
                <input required type="text" name="name" id="name" placeholder="Name of the game">
            </div>

            <div class="flex flex-col gap-1">
                <label class="font-semibold text-xl" for="content">Console</label>
                <select name="console" id="console" required>
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
                <label class="font-semibold text-xl" for="edition">Edition</label>
                <input required type="text" name="edition" id="edition" placeholder="Edition of the game" value="Standard">
            </div>

            <!-- Region -->
            <div class="flex flex-col gap-1">
                <label class="font-semibold text-xl" for="region">Region</label>
                <select name="region" id="region">
                    <option required value="EUR">Europe</option>
                    <option required value="USA">USA</option>
                    <option required value="JPN">Japan</option>
                    <option required value="FR">France</option>
                    <option required value="INT">International</option>
                    <option required value="OTHER">Other</option>
                </select>
            </div>

            <!-- Released year -->
            <div class="flex flex-col gap-1">
                <label class="font-semibold text-xl" for="released_year">Game's released year</label>
                <input required type="number" name="released_year" id="released_year" placeholder="2005">
            </div>

            <!-- Barcode_data -->
            <div class="flex flex-col gap-1">
                <label class="font-semibold text-xl" for="barcode_data">Barcode data</label>
                <input required type="text" name="barcode_data" id="barcode_data" placeholder="Barcode data of the game"
                    value="NODATA">
            </div>

            <button
                class="font-semibold text-xl py-2 px-4 rounded-lg mt-4 bg-orange-300 hover:bg-orange-400 text-orange-800"
                type="submit">Save this new game</button>
        </form>
    </main>
</template>