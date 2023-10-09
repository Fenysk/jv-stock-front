<script setup lang="ts">
</script>

<template>
    <article class="flex flex-row bg-orange-100 overflow-hidden rounded-xl h-32 shadow-sm border border-orange-200">

        <div class="animate-pulse rounded-md flex w-1/4 h-full"> <!-- Left side -->
            <div class="bg-orange-300 h-full flex items-center justify-center w-full">
                <svg class="text-orange-400 h-1/2 w-1/2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>
        </div>

        <div class="flex animate-pulse flex-row justify-between p-2 w-3/4"> <!-- Right side -->

            <div id="details" class="flex flex-col w-2/3">
                <div class="h-2.5 bg-orange-300 rounded-full w-full my-4"></div>
                <div class="h-2   bg-orange-300 rounded-full w-3/5  my-1"></div>
                <div class="h-2   bg-orange-300 rounded-full w-1/2  my-1"></div>
                <div class="h-2   bg-orange-300 rounded-full w-2/3  my-1"></div>
            </div>

            <div id="prices" class="flex flex-col gap-1 items-end">
                <div class="block bg-orange-300 w-12 h-6 rounded-lg"></div>
                <div class="block bg-orange-300 w-12 h-6 rounded-lg"></div>
                <div class="block bg-orange-300 w-12 h-6 rounded-lg"></div>
            </div>

        </div>
    </article>
</template>