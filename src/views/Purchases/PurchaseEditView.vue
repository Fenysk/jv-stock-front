<script setup lang="ts">
import { updatePurchase, getPurchaseById, deletePurchase } from '../../services/purchases';
import { getAllGames } from '../../services/games';
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue';
import { api_url } from '../../config';

const search = ref<string>('');
const games = ref<any>([]);
const router = useRouter();

const inputContent = ref<string>('');

const purchase = ref<any>({});
const editedPurchase = ref<any>({});

const contentsExample = ref([
    'Cartouche',
    'CD',
    'Boîte',
    'Notice',
    'Safety sheet',
    'Pub',
    'Sticker',
    'Map',
    'Poster'
]);

onBeforeMount(async () => {
    const id = Number(router.currentRoute.value.params.id);
    await fetchPurchase(id);
    await fetchGames();
});

async function fetchGames() {
    games.value = await getAllGames();
}

async function fetchPurchase(id: number) {
    purchase.value = await getPurchaseById(id);
    editedPurchase.value = {
        id: purchase.value.id,
        game_id: purchase.value.game_id,
        purchased_price: purchase.value.purchased_price,
        estimated_price: purchase.value.estimated_price,
        origin: purchase.value.origin,
        state: purchase.value.state,
        content: purchase.value.content
    };
    contentsExample.value = contentsExample.value.filter((content: string) => {
        return !editedPurchase.value.content.includes(content);
    });
}

async function searchGames() {

    games.value = games.value.filter((game: any) => {
        return game.name
            .toLowerCase()
            .includes(search.value.toLowerCase());
    });

    if (search.value === '') {
        await fetchGames();
        return;
    }

    editedPurchase.value.game_id = games.value[0].id;
}

function addContent(content: string) {
    if (content !== '') {
        editedPurchase.value.content.push(content);
        inputContent.value = '';
        contentsExample.value.splice(contentsExample.value.indexOf(content), 1);
    }
}

function removeContent(content: string) {
    if (content !== '') {
        editedPurchase.value.content.splice(editedPurchase.value.content.indexOf(content), 1);
        contentsExample.value.push(content);
    }
}

async function handleSubmit() {

    try {
        const purchase = await updatePurchase(editedPurchase.value);

        if (purchase) {
            router.push({ name: 'Purchases' });
        }

    } catch (error: any) {
        alert(error.message);
    }
}

async function handleDelete() {
    if (!confirm('Are you sure you want to delete this purchase ?')) {
        return;
    }

    try {
        await deletePurchase(purchase.value.id);
        alert('Purchase deleted');
        router.push({ name: 'Purchases' });
    } catch (error: any) {
        alert(error.message)
    }
}
</script>

<template>
    <main id="EditPurchase">
        <img v-if="editedPurchase.game_id"
            :src="`${api_url}/${games.find((game: any) => game.id === editedPurchase.game_id).image_url}`"
            class="object-cover w-full max-h-32 md:max-h-64">

        <div class="container p-2 pb-8 mx-auto">

            <h1>Edit purchase</h1>

            <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 w-fit">

                <!-- Search game -->
                <div class="flex flex-col items-start gap-1">
                    <label class="text-xl font-semibold" for="game">Game</label>
                    <div class="flex flex-wrap gap-2">
                        <input @input="searchGames" v-model="search" type="text" placeholder="Search for a game">
                        <select v-if="games.length" name="game_id" id="game_id" v-model="editedPurchase.game_id" required>
                            <option :selected="game.id" v-for="game in games" :key="game.id" :value="game.id">{{ game.name
                            }}
                            </option>
                        </select>
                    </div>
                </div>


                <!-- Purchased_price -->
                <div class="flex flex-col items-start gap-1">
                    <label class="text-xl font-semibold" for="purchased_price">Purchased price</label>
                    <input required type="number" name="purchased_price" id="purchased_price"
                        placeholder="Purchased price of the game" v-model="editedPurchase.purchased_price">
                </div>

                <!-- Estimated price -->
                <div class="flex flex-col items-start gap-1">
                    <label class="text-xl font-semibold" for="estimated_price">Estimated price</label>
                    <input required type="number" name="estimated_price" id="estimated_price"
                        placeholder="Estimated price of the game" v-model="editedPurchase.estimated_price">
                </div>

                <!-- Origin -->
                <div class="flex flex-col items-start gap-1">
                    <label class="text-xl font-semibold" for="origin">Origin</label>
                    <input required type="text" name="origin" id="origin" placeholder="Origin of the game"
                        v-model="editedPurchase.origin">
                </div>

                <!-- State -->
                <div class="flex flex-col items-start gap-1">
                    <label class="text-xl font-semibold" for="state">State</label>
                    <select required name="state" id="state" v-model="editedPurchase.state">
                        <option value="Mint">Mint</option>
                        <option value="Very Good">Very good</option>
                        <option value="Good" selected>Good</option>
                        <option value="Average">Average</option>
                        <option value="Bad">Bad</option>
                        <option value="For parts">For parts</option>
                    </select>
                </div>

                <!-- Contents -->
                <div class="flex flex-col items-start gap-1">
                    <label class="text-xl font-semibold" for="content">Contents</label>
                    <!-- all example contents are displayed. When one is clicked, it is added to the list of contents -->
                    <div class="flex flex-wrap gap-2">
                        <span v-for="content in contentsExample" :key="content"
                            class="px-2 py-1 text-sm font-semibold text-gray-500 bg-gray-300 rounded-lg cursor-pointer hover:bg-blue-600 hover:text-white"
                            @click.prevent="addContent(content)">{{ content }}</span>
                    </div>
                    <!-- input and button -->
                    <div class="flex flex-wrap gap-2 mt-2">
                        <input v-model="inputContent" type="text" placeholder="Add a content">
                        <button
                            class="px-2 py-1 text-sm font-semibold text-white bg-orange-800 rounded-lg hover:bg-orange-700"
                            @click.prevent="addContent(inputContent)">Add content</button>
                    </div>
                    <!-- the list of contents is displayed -->
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span v-for="content in editedPurchase.content" :key="content"
                            class="px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-red-600"
                            @click.prevent="removeContent(content)">{{ content }}</span>
                    </div>
                </div>

                <div class="flex justify-between">
                    <button
                        class="px-4 py-2 mt-4 text-xl font-semibold text-orange-800 bg-orange-300 rounded-lg hover:bg-orange-400"
                        type="submit">Save</button>
                    <button class="px-4 py-2 mt-4 text-xl font-semibold text-red-800 bg-red-300 rounded-lg hover:bg-red-400"
                        type="button" @click="handleDelete">Delete</button>
                </div>
            </form>
        </div>
    </main>
</template>