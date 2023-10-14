<script setup lang="ts">
import { createPurchase } from '../../services/purchases';
import { getAllGames } from '../../services/games';
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue';

const search = ref<string>('');
const games = ref<any>([]);
const router = useRouter();

const inputContent = ref<string>('');
const contents = ref<string[]>([]);

const game_id = ref<number | null>(null);

onBeforeMount(async () => {
    await fetchGames();
    game_id.value = Number(router.currentRoute.value.params.id)
});

async function fetchGames() {
    games.value = await getAllGames();
}

function searchGames() {
    if (search.value.length > 0) {
        games.value = games.value.filter((game: any) => {
            return game.name
                .toLowerCase()
                .includes(search.value.toLowerCase());
        });
    } else {
        fetchGames();
    }
}

function addContent(content: string) {
    contents.value.push(content);
    inputContent.value = '';
}

async function handleSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    let newPurchase = {
        ...Object.fromEntries(formData),
        game_id: Number(formData.get('game_id')),
        purchased_price: Number(formData.get('purchased_price')),
        estimated_price: Number(formData.get('estimated_price')),
        content: contents.value
    };

    try {
        // Try to create the purchase
        const purchase = await createPurchase(newPurchase);

        if (purchase) {
            router.push({ name: 'Purchases' });
        }
        
    } catch (error: any) {
        alert(error.message);
    }
}
</script>

<template>
    <main id="AddPurchase" class="container mx-auto">
        <h1>Add new purchase</h1>
        
        <form @submit.prevent="handleSubmit">
            <!-- Search game -->
            <div class="flex gap-2 mb-4">
                <label for="game">Game</label>
                <input @input="searchGames" v-model="search" type="text" placeholder="Search for a game">
                <select v-if="games.length" name="game_id" id="game_id" required>
                    <option :selected="game.id === game_id"
                    v-for="game in games" :key="game.id" :value="game.id">{{ game.name }}</option>
                </select>
                <span v-else>No game found</span>
            </div>

            <!-- Purchased_price -->
            <div class="flex gap-2 mb-4">
                <label for="purchased_price">Purchased price</label>
                <input required type="number" name="purchased_price" id="purchased_price"
                    placeholder="Purchased price of the game" value="10">
            </div>

            <!-- Estimated price -->
            <div class="flex gap-2 mb-4">
                <label for="estimated_price">Estimated price</label>
                <input required type="number" name="estimated_price" id="estimated_price"
                    placeholder="Estimated price of the game" value="20">
            </div>

            <!-- Origin -->
            <div class="flex gap-2 mb-4">
                <label for="origin">Origin</label>
                <input required type="text" name="origin" id="origin" placeholder="Origin of the game" value="Stock">
            </div>

            <!-- State -->
            <div class="flex gap-2 mb-4">
                <label for="state">State</label>
                <select required name="state" id="state">
                    <option value="Mint">Mint</option>
                    <option value="Very Good">Very good</option>
                    <option value="Good" selected>Good</option>
                    <option value="Average">Average</option>
                    <option value="Bad">Bad</option>
                    <option value="For parts">For parts</option>
                </select>
            </div>

            <!-- Contents -->
            <div class="flex gap-2 mb-4">
                <label for="content">Content</label>
                <input type="text" placeholder="Contents of the game" v-model="inputContent">
                <button type="button" @click="addContent(inputContent)">Add</button>
                <span v-for="content in contents" :key="content">{{ content }}</span>
            </div>

            <button type="submit">Save purchase</button>
        </form>
    </main>
</template>