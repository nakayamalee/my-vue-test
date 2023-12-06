<script setup>
  import { ref, computed } from 'vue';
  import productModel from '@/components/Modal/CreateProductModal.vue';
  import editProductModel from '@/components/Modal/EditProductModal.vue';
  import { useProductStore } from '@/stores/useProductStore.js';
  import Swal from 'sweetalert2'

  const openModal = ref('');
  const addItem = () => {
    openModal.value = 'creareProdcut';
  }

  const productData = ref({});
  const editProduct = (item) => {
    openModal.value = 'editProdcut';
    productData.value = { ...item };
  };

  
  const store = useProductStore();
  const { list, searchList, deleteProduct } = store;
  
  const removeItem = (id) => {
    Swal.fire({
      title: "確認刪除?",
      showDenyButton: true,
      confirmButtonText: "刪除",
      denyButtonText: `取消`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("已刪除", "", "success");
        deleteProduct(id);
      } else if (result.isDenied) {
        Swal.fire("未刪除");
      }
    });
    // deleteProduct(id);
  };

  const key = ref('');
  const keyInput = ref([]);
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
          <th class="w-[100px]">功能</th>
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
            <button type="button" class="border border-black rounded-md px-4 py-2 hover:bg-[#48b380] hover:text-white" @click="editProduct(item)">編輯</button>
            <button type="button" class="border border-black rounded-md px-4 py-2 hover:bg-[red] hover:text-white" @click="removeItem(item.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <productModel v-if="openModal === 'creareProdcut'" @close-modal="openModal = ''"></productModel>
    <editProductModel v-if="openModal === 'editProdcut'" :form-data="productData" @close-modal="openModal = ''"></editProductModel>
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