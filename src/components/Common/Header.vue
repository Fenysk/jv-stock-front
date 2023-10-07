<script setup lang="ts">
</script>

<template>
    <header class="w-full bg-gray-200">
        <nav>
            <ul class="flex justify-center gap-16">
                <li>
                    <router-link :to="{ name: 'Home' }">Home</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'Games' }">Games</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'Purchases' }">Purchases</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'Sales' }">Sales</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>