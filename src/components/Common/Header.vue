<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
        isMenuOpen.value = false;
    }
});
</script>

<template>
    <header class="w-full bg-orange-400 z-50">
        <nav class="
        flex items-end justify-between p-4 gap-6
        sm:justify-center sm:gap-16
        ">
            <div id="branding">
                <router-link :to="{ name: 'Home' }">
                    <span class="text-2xl font-bold text-center">Video Game Manager</span>
                </router-link>
            </div>
            <div id="burger" class="
            relative z-10 flex items-center justify-center w-8 h-8
            sm:hidden
            ">
                <button @click="toggleMenu" class="w-full h-full focus:outline-none">
                    <svg class="w-full h-full" viewBox="0 0 100 100">
                        <rect x="0" y="0" width="100" height="100" fill="none" stroke="black" stroke-width="10" />
                        <line x1="20" y1="30" x2="80" y2="30" stroke="black" stroke-width="10" />
                        <line x1="20" y1="50" x2="80" y2="50" stroke="black" stroke-width="10" />
                        <line x1="20" y1="70" x2="80" y2="70" stroke="black" stroke-width="10" />
                    </svg>
                </button>
            </div>
            <ul class="
            absolute top-16 left-0 flex flex-col items-start justify-center w-full gap-8 text-2xl bg-orange-400 font-semibold text-center overflow-hidden
            sm:static sm:flex-row sm:top-0 sm:left-auto sm:w-auto sm:px-0 sm:py-0 sm:text-base sm:bg-transparent sm:font-normal sm:justify-end sm:gap-6 sm:h-auto
            " :class="(isMenuOpen) ? 'h-[50vh] p-24' : 'h-0'">
                <li>
                    <router-link @click="toggleMenu" :to="{ name: 'Home' }"
                        class="hover:border-b border-black">Home</router-link>
                </li>
                <li>
                    <router-link @click="toggleMenu" :to="{ name: 'Games' }"
                        class="hover:border-b border-black">Games</router-link>
                </li>
                <li>
                    <router-link @click="toggleMenu" :to="{ name: 'Purchases' }"
                        class="hover:border-b border-black">Purchases</router-link>
                </li>
                <li>
                    <router-link @click="toggleMenu" :to="{ name: 'Sales' }"
                        class="hover:border-b border-black">Sales</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>