<script setup>
  import { ref, computed } from 'vue';
  import productModel from '@/components/Modal/CreateProductModal.vue';
  import { useProductStore } from '@/stores/useProductStore.js';

  const keyInput = ref([]);
  const key = ref('');
  const openModal = ref('');

  const addItem = () => {
    openModal.value = 'creareProdcut';
  }
  const store = useProductStore();
  const { list, searchList } = store;

  const search = () => {
    key.value = keyInput.value.value;
  };

  const showList = computed(() => {
    if (key.value.trim() === '') return list;
    return searchList(key.value);
  });
</script>

<template>
  <section id="product-list">
    <h1 class="text-[36px] text-bold mb-10">Product</h1>
    <div class="search">
      <div>查詢產品</div>
      <label>
        標題<input ref="keyInput" type="text" placeholder="輸入標題關鍵字" @keydown.enter="search()">
      </label>
      <div class="btns">
        <button type="button" @click="search()">查詢</button>
        <button type="button" @click="addItem()">新增</button>
      </div>
    </div>
    <table class="w-full">
      <thead>
        <tr>
          <th class="text-left px-4 w-[300px]">圖片</th>
          <th class="text-left px-4">標題</th>
          <th>功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in showList" :key="index">
          <td class="px-4">
            <img v-if="item.image" :src="item.image" :alt="item.title" class="w-full aspect-video object-contain">
            <span v-else>無設置圖片</span>
          </td>
          <td class="px-4">{{ item.title }}</td>
          <td class="text-center">
            <button type="button">按鈕</button>
          </td>
        </tr>
      </tbody>
    </table>
    <productModel v-if="openModal === 'creareProdcut'" @close-modal="openModal = ''"></productModel>
  </section>
</template>

<style lang="scss" scoped>
#product-list {
  .search {
    @apply flex flex-col gap-4 mb-8;
    .btns {
      @apply flex justify-end gap-4;
    }
    button {
      @apply border border-black rounded-md px-4 py-2 hover:bg-[#48b380] hover:text-white;
    }
  }
  label {
    @apply flex items-center gap-4;
  }
  table, th, td {
    @apply border border-gray-500;
  }
}

</style>