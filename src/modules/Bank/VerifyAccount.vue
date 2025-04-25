<template>
    <div class="bg-white/10 p-6 rounded-xl border border-white/20 mt-6 shadow-lg text-white">
      <div class="flex justify-between mb-4">
        <h2 class="text-xl font-semibold">🔒 Verify Account</h2>
        <button @click="$emit('done')" class="text-sm text-red-300 hover:underline">Close</button>
      </div>
  
      <form @submit.prevent="verify" class="grid grid-cols-1 gap-4">
        <input v-model="accountNumber" placeholder="Account Number" class="form-input" required />
        <input v-model="otp" placeholder="OTP Code" class="form-input" required />
        <button type="submit" class="btn-primary">Verify</button>
      </form>
  
      <p v-if="message" class="mt-2" :class="isSuccess ? 'text-green-400' : 'text-red-400'">{{ message }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  const accountNumber = ref('');
  const otp = ref('');
  const message = ref('');
  const isSuccess = ref(false);
  
  const verify = async () => {
 
      const res = await axios.post(`/api/bank/verify?accountNumber=${accountNumber.value}&otp=${otp.value}`);
      message.value = res.data.message || 'Verification successful!';
      isSuccess.value = true;
  
  };
  </script>
  