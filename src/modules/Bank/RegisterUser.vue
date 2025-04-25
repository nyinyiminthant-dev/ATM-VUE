<template>
    <div class="bg-white/10 p-6 rounded-xl border border-white/20 mt-6 shadow-lg text-white">
      <div class="flex justify-between mb-4">
        <h2 class="text-xl font-semibold">🧾 Register New User</h2>
        <button @click="$emit('done')" class="text-sm text-red-300 hover:underline">Close</button>
      </div>
  
      <form @submit.prevent="registerUser" class="grid grid-cols-1 gap-4">
        <input v-model="form.fullName" placeholder="Full Name" class="form-input" required />
        <input v-model="form.email" placeholder="Email" class="form-input" required />
        <input v-model="form.wallet" placeholder="Wallet" class="form-input" required />
        <input v-model="form.password" type="password" placeholder="Password" class="form-input" required />
        <button type="submit" class="btn-primary">Register</button>
      </form>
  
      <p v-if="error" class="text-red-400 mt-2">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  // Reactive form data
  const form = ref({
    fullName: '',
    email: '',
    wallet: '',
    password: ''
  });
  
  // Error message display
  const error = ref('');
  
  // Function to handle registration
  const registerUser = async () => {
   
      const res = await axios.post('/api/bank/create', form.value);
  
      if (res.data.IsSuccess) {
        error.value = '';
        // Reset form on success
        form.value = { fullName: '', email: '', wallet: '', password: '' };
      } else {
        error.value = res.data.Message || 'Something went wrong.';
      }
  
    };
  </script>
  
  <style scoped>
  .form-input {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid #ffffff30;
    padding: 0.75rem;
    border-radius: 0.75rem;
    color: white;
  }
  .btn-primary {
    background-color: #00a6dc;
    padding: 0.75rem;
    font-weight: bold;
    border-radius: 0.75rem;
    color: white;
    transition: all 0.2s;
  }
  .btn-primary:hover {
    background-color: #008ac2;
  }
  </style>
  