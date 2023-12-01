import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useProductStore = defineStore('products', () => {
  const list = ref([]);

  const activeList = computed(() => list.value.filter((item) => item.state === '1'));

  const searchList = (key = '') => list.value.filter((item) => {
    if (key.trim() === '') return true;
    return item.title.includes(key);
  });

  function addProduct(item = {}) {
    if (Object.keys(item).length === 0) return;
    list.value.push(item);
  }

  return { list, activeList, addProduct, searchList }
})
