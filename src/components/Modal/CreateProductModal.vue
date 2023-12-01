<script setup>
  import { ref, reactive, computed } from 'vue';
  import { useProductStore } from '@/stores/useProductStore.js';
  import { twMerge } from 'tailwind-merge';

  const vFocus = {
    mounted: (el) => el.focus(),
  };
  const emit = defineEmits(['closeModal']);

  const formData = reactive({
    title: '',
    state: '',
    link: '',
    image: '',
  });

  const myForm = ref([]);
  const isPending = ref(false);

  const store = useProductStore();

  const { addProduct } = store;

  async function submitData() {
    await addProduct(formData);
    closeModal();
  }

  function getImage(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      formData.image = reader.result;
    }
  }

  function closeModal() {
    emit('closeModal');
  }
</script>

<template>
  <div id="custom-modal">
    <div class="modal-body">
      <h1 class="mb-6">新增資訊</h1>
      <form :class="{ 'pending': isPending }" class="grid grid-cols-2 gap-6" @submit.prevent="submitData()">
        <label>
          <p class="required">廣告標題</p>
          <input v-model="formData.title" v-focus name="title" class="border border-black" type="text" required>
          <p class="text-[red] hidden">請輸入廣告標題</p>
        </label>
        <label>
          <p class="required">廣告狀態</p>
          <select v-model="formData.state" name="state" class="border border-black" required>
            <option value="" selected disabled>請選擇廣告狀態</option>
            <option value="1">啟用</option>
            <option value="2">關閉</option>
          </select>
          <p class="text-[red] hidden">請選擇廣告狀態</p>
        </label>
        <label class="col-span-2">
          廣告連結
          <input v-model="formData.link" class="border border-black" type="text">
        </label>
        <div id="image" class="col-span-2">
          廣告圖片
          <label class="w-1/2 aspect-[4/3] border border-black flex justify-center items-center cursor-pointer rounded-md" :class="twMerge('border-dashed', formData.image ? 'border-solid' : '')">
            <span v-if="!formData.image" class="text-[72px] text-bold text-[grey]">+</span>
            <img v-else :src="formData.image" class="w-full h-full object-contain" alt="廣告圖片">
            <input class="hidden" type="file" @change="getImage">
          </label>
        </div>
        <div class="btns col-span-2">
          <button type="submit" @click="isPending = true">儲存</button>
          <button type="button" @click="closeModal()">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #custom-modal {
    @apply fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 flex justify-center items-center;
    .modal-body {
      @apply w-full max-w-[800px] rounded-md bg-white p-6;
      h1 {
        @apply text-3xl font-bold;
      }
      label, #image {
        @apply flex flex-col gap-1;
        input, select {
          @apply h-[35px] pl-3;
        }
      }
      .required {
        @apply after:content-['*'] after:text-[red];
      }
      .pending :invalid {
        @apply border-[red] outline-[red];

        & + p {
          @apply block;
        }
      }
      .btns {
        @apply flex justify-end gap-4;
        button {
          @apply border border-black rounded-md px-4 py-2 hover:bg-[#48b380] hover:text-white;
        }
      }
    }
  }
</style>
