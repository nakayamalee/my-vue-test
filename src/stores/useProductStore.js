import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export const useProductStore = defineStore('products', () => {
  const list = ref([]);

  const getList = () => {
    fetch('http://localhost:3000/productList')
      .then((res) => res.json())
      .then((data) => {
        list.value = data;
        console.log(data);
      })
      .catch(() => {
        Swal.fire('請參閱README');
      });
  };

  getList();

  const activeList = computed(() => list.value.filter((item) => item.state === '1'));

  const searchList = (key = '') => {
    fetch(`http://localhost:3000/productList?title_like=${key}`)
      .then((res) => res.json())
      .then((data) => {
        list.value = data;
        console.log(data);
      })
  };

  function addProduct(item = {}) {
    if (Object.keys(item).length === 0) return;
    fetch(`http://localhost:3000/productList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    })
    .then(() => getList())
    .catch(() => {
      Swal.fire('請參閱README');
    });
  }

  function updateProduct(data = {}) {
    const dataIndex = list.value.findIndex((item) => {
      return item.id === data.id;
    });
    if (dataIndex < 0) return;
    list.value[dataIndex] = { ...data };
    fetch(`http://localhost:3000/productList/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .catch(() => {
      Swal.fire('請參閱README');
    });
  }

  function deleteProduct(id) {
    fetch(`http://localhost:3000/productList/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(() => {
      const index = list.value.findIndex((item) => item.id === id);
      list.value.splice(index, 1)
    })
    .catch(() => {
      Swal.fire('請參閱README');
    });
  }

  return { list, activeList, addProduct, searchList, updateProduct, deleteProduct }
})
