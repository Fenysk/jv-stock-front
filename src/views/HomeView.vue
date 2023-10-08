<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { getGamesInStock } from '../services/games';
import Game from '../components/Home/GameCard.vue';
import LoadingGame from '../components/Home/LoadingGameCard.vue';

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
  <main id="Home" class="container mx-auto">
    <h1>Home</h1>

    <section class="sales">
      <h2>Jeux en stock</h2>

      <div id="games-list">
        <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 gap-8">
          <li v-for="game in gamesInStock" :key="game.id">
            <Game :game="game" />
          </li>
          <LoadingGame v-if="gamesInStock.length === 0" v-for="index in 10" :key="index" />
        </ul>
      </div>


    </section>
  </main>
</template>