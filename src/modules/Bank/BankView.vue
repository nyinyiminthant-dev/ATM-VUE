<template>
    <div class="min-h-screen bg-gradient-to-br from-[#004a6e] to-[#002f4b] p-6 text-white">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold drop-shadow-lg">🏦 UAB Nyi Dashboard</h1>
        <p class="text-gray-200 mt-2">Request user accounts and banking operations</p>
      </div>
  
      <!-- Actions -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <button class="bank-action-btn" @click="openComponent('RegisterUser')">
          🧾 Register
        </button>
        <button class="bank-action-btn" @click="openComponent('UpdateUserForm')">
          📝 Update User
        </button>
        <button class="bank-action-btn" @click="openComponent('VerifyAccount')">
          ✅ Verify Account
        </button>
        <button class="bank-action-btn" @click="openComponent('UnlockAccount')">
          🔓 Unlock Account
        </button>
        <button class="bank-action-btn" @click="openComponent('CreatePIN')">
          🔢 Create PIN
        </button>
      </div>
  
      <!-- Exit Button -->
      <div class="flex justify-center mt-6">
        <button class="exit-btn" @click="exitDashboard">
          ❌ Exit
        </button>
      </div>
  
      <!-- Result Box -->
      <div v-if="responseMessage" class="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-4 shadow-md border border-white/20">
        <h2 class="text-xl font-semibold mb-2">Response</h2>
        <pre class="whitespace-pre-wrap text-gray-200">{{ responseMessage }}</pre>
      </div>
  
      <!-- Dynamic Component -->
      <component
        :is="activeComponent ? components[activeComponent] : null"
        @done="clearComponent"
        @respond="setResponse"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import RegisterUser from './RegisterUser.vue';
  import VerifyAccount from './VerifyAccount.vue';
  import UnlockAccount from './UnlockAccount.vue';
  import CreatePIN from './CreatePIN.vue';
  import UpdateUserForm from './UpdateUserForm.vue';
import router from '@/router';
  
  // Mapping component keys
  const components = {
    RegisterUser,
    VerifyAccount,
    UnlockAccount,
    CreatePIN,
    UpdateUserForm
  } as const;
  
  type ComponentKey = keyof typeof components;
  
  const activeComponent = ref<ComponentKey | null>(null);
  const responseMessage = ref('');
  
  const openComponent = (key: ComponentKey) => {
    activeComponent.value = key;
  };
  
  const clearComponent = () => {
    activeComponent.value = null;
  };
  
  const setResponse = (msg: string) => {
    responseMessage.value = msg;
  };
  
  const exitDashboard = () => {
  const confirmed = window.confirm('Are you sure you want to exit the dashboard?');
  if (confirmed) {
    activeComponent.value = null;
    responseMessage.value = 'You have exited the dashboard.';
    router.push('/');
  }}
  </script>
  
  <style scoped>
  .bank-action-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    font-weight: 600;
    font-size: 1rem;
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
    text-align: center;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .bank-action-btn i {
    margin-right: 8px;
    font-size: 1.2rem;
  }
  
  .bank-action-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  
  /* Exit Button Style */
  .exit-btn {
    background: rgba(255, 0, 0, 0.1);
    border: 1px solid rgba(255, 0, 0, 0.3);
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    font-weight: 600;
    font-size: 1rem;
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
    text-align: center;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .exit-btn:hover {
    background: rgba(255, 0, 0, 0.2);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  </style>
  