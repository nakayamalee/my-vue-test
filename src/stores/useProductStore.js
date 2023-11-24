import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useProductStore = defineStore('products', () => {
  const list = ref([]);

  const activeList = computed(() => list.value.filter((item) => item.state === '1'));

  function addProduct(item = {}) {
    if (Object.keys(item).length === 0) return;
    list.value.push(item);
  }

  return { list, activeList, addProduct }
})
