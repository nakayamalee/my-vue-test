import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useProductStore = defineStore('products', () => {
  const id = ref(1);
  const list = ref([]);
  fetch('http://localhost:3000/productList')
    .then((res) => res.json())
    .then((data) => {
      list.value = data;
    });

  const activeList = computed(() => list.value.filter((item) => item.state === '1'));

  const searchList = (key = '') => list.value.filter((item) => {
    if (key.trim() === '') return true;
    return item.title.includes(key);
  });

  function addProduct(item = {}) {
    if (Object.keys(item).length === 0) return;
    list.value.push({ id: id.value, ...item });
    id.value++;
    fetch(`http://localhost:3000/productList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id.value, ...item }),
    })
  }

  function updateProduct(data = {}) {
    const dataIndex = list.value.findIndex((item) => {
      return item.id === data.id;
    });
    if (dataIndex < 0) return;
    list.value[dataIndex] = { ...data };
  }

  return { list, activeList, addProduct, searchList, updateProduct }
})
