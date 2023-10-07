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
    <div>
        <h1>Add new game</h1>

        <form @submit.prevent="handleSubmit">

            <!-- Image -->
            <div class="flex gap-2 mb-4">
                <label for="image">Image</label>
                <input required type="file" accept="image/png, image/jpg, image/jpeg, image/gif" name="image" id="image"
                    placeholder="Image of the game">
            </div>

            <div class="flex gap-2 mb-4">
                <label for="name">Name</label>
                <input required type="text" name="name" id="name" placeholder="Name of the game" value="Super Mario 64">
            </div>

            <div class="flex gap-2 mb-4">
                <label for="content">Console</label>
                <select name="console" id="console">
                    <option required value="Nintendo Switch">Nintendo Switch</option>
                    <option required value="Nintendo WiiU">Nintendo Wii U</option>
                    <option required value="Nintendo Wii">Nintendo Wii</option>
                    <option required value="Nintendo GameCube">Nintendo GameCube</option>
                    <option required value="Nintendo 64">Nintendo 64</option>
                    <option required value="Nintendo SNES">Nintendo SNES</option>
                    <option required value="Nintendo NES">Nintendo NES</option>
                    <option required value="Nintendo 3DS">Nintendo 3DS</option>
                    <option required value="Nintendo DS">Nintendo DS</option>
                    <option required value="Nintendo GameBoy Advance">Nintendo GameBoy Advance</option>
                    <option required value="Nintendo GameBoy Color">Nintendo GameBoy Color</option>
                    <option required value="Nintendo GameBoy">Nintendo GameBoy</option>
                    <option required value="Sony PlayStation 5">Sony PlayStation 5</option>
                    <option required value="Sony PlayStation 4">Sony PlayStation 4</option>
                    <option required value="Sony PlayStation 3">Sony PlayStation 3</option>
                    <option required value="Sony PlayStation 2">Sony PlayStation 2</option>
                    <option required value="Sony PlayStation 1">Sony PlayStation 1</option>
                    <option required value="Sony PS Vita">Sony PS Vita</option>
                    <option required value="Sony PSP">Sony PSP</option>
                    <option required value="Microsoft Xbox Series X">Microsoft Xbox Series</option>
                    <option required value="Microsoft Xbox One">Microsoft Xbox One</option>
                    <option required value="Microsoft Xbox 360">Microsoft Xbox 360</option>
                    <option required value="Microsoft Xbox">Microsoft Xbox</option>
                </select>
            </div>

            <!-- Edition -->
            <div class="flex gap-2 mb-4">
                <label for="edition">Edition</label>
                <input required type="text" name="edition" id="edition" placeholder="Edition of the game" value="Standard">
            </div>

            <!-- Region -->
            <div class="flex gap-2 mb-4">
                <label for="region">Region</label>
                <select name="region" id="region">
                    <option required value="EUR">Europe</option>
                    <option required value="USA">USA</option>
                    <option required value="JPN">Japan</option>
                    <option required value="INT">International</option>
                </select>
            </div>

            <!-- Released year -->
            <div class="flex gap-2 mb-4">
                <label for="released_year">Released year</label>
                <input required type="number" name="released_year" id="released_year"
                    placeholder="Released year of the game" value="1997">
            </div>

            <!-- Barcode_data -->
            <div class="flex gap-2 mb-4">
                <label for="barcode_data">Barcode data</label>
                <input required type="text" name="barcode_data" id="barcode_data" placeholder="Barcode data of the game"
                    value="NODATA">
            </div>

            <button type="submit">Save game</button>
        </form>
    </div>
</template>