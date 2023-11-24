<script setup>
import { useProductStore } from '@/stores/useProductStore.js';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const modules = [Pagination, Navigation];
const store = useProductStore();
const { activeList } = store;

</script>

<template>
  <section id="homepage">
    <h1>Home</h1>
    <swiper :pagination="{
      type: 'progressbar',
    }" :navigation="true" :modules="modules" class="mySwiper w-full aspect-video">
      <swiper-slide v-for="(item, index) in activeList" :key="index" class="relative">
        <img :src="item.image" :alt="item.title" :title="item.title" class="w-full h-full object-contain">
        <a :href="item.link" class="absolute left-[20%] bottom-[20%] bg-white px-4 py-2 rounded-md">{{ item.title }}</a>
      </swiper-slide>
    </swiper>
  </section>
</template>

<style scoped></style>