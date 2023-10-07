<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { getGamesInStock } from '../services/games';
import Game from '../components/Stock/Game.vue';

const gamesInStock = ref<any>([]);

async function fetchGamesInStock() {
  try {

    gamesInStock.value = await getGamesInStock()

  } catch (error: any) {

    throw error.message;

  }
}

onBeforeMount(async () => {
  await fetchGamesInStock();
});

</script>

<template>
  <div>
    <h1>Home</h1>

    <section class="sales">
      <h2>Jeux en stock</h2>

      <ul v-if="gamesInStock.length" class="flex flex-col gap-4">
        <li v-for="game in gamesInStock" :key="game.id">
          <Game :game="game" />
        </li>
      </ul>

      <p v-else>Aucun jeu en stock</p>

    </section>
  </div>
</template>