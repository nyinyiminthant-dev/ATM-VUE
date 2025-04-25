<template>
    <div class="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#005f85] to-[#004a6e] p-6 relative">
      <!-- Main Card Container -->
      <div class="w-full max-w-3xl bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-8 flex flex-col items-center space-y-6 z-10">
        <!-- Header -->
        <div class="text-center mb-6">
          <h2 class="text-xl font-semibold text-white">Welcome, {{ userName }}</h2>
          <p class="text-lg text-gray-300 mt-1">Balance: ${{ balance }}</p>
        </div>
  
        <!-- Button Grid -->
        <div class="w-full grid grid-cols-2 gap-40">
          <div class="space-y-10">
            <button class="atm-action-button" @click="handleWithdraw">💸 Withdraw</button>
            <button class="atm-action-button" @click="handleDeposit">💰 Deposit</button>
            <button class="atm-action-button" @click="handleMiniStatement">🧾 Mini Statement</button>
          </div>
          <div class="space-y-10">
            <button class="atm-action-button" @click="handleTransfer">🔁 Transfer</button>
            <button class="atm-action-button" @click="handleBalanceInquiry">📊 Balance Inquiry</button>
            <button class="atm-action-button" @click="handleChangePin">🔐 Change PIN</button>
          </div>
        </div>
  
        <!-- Logout -->
        <div class="mt-6">
          <button @click="handleLogout" class="bg-red-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-xl shadow-md transition">
            Exit
          </button>
        </div>
      </div>
  
      <!-- Dialog Box with Blurred Background -->
      <transition name="fade-scale">
        <div v-if="showDialog" class="fixed inset-0 z-30 flex items-center justify-center">
          <!-- Background blur layer -->
          <div class="absolute inset-0 backdrop-blur-sm bg-black/40 transition-opacity"></div>
  
          <!-- Dialog content -->
          <div class="relative z-40 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-6 text-white w-full max-w-md shadow-2xl">
            <h3 class="text-2xl font-bold mb-2">
              <span class="mr-2">{{ dialogIcon }}</span>{{ dialogTitle }}
            </h3>
            <p class="mb-4">{{ dialogMessage }}</p>
            <button @click="closeDialog" class="mt-2 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition">
              OK
            </button>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  const userName = ref('John Doe');
  const balance = ref('4500.00'); // You can replace this with dynamic balance
  const router = useRouter();
  
  const showDialog = ref(false);
  const dialogTitle = ref('');
  const dialogMessage = ref('');
  
  const openDialog = (title: string, message: string) => {
    dialogTitle.value = title;
    dialogMessage.value = message;
    showDialog.value = true;
  };
  
  const closeDialog = () => {
    showDialog.value = false;
  };
  
  const handleWithdraw = () => openDialog('Withdraw', 'You chose to withdraw.');
  const handleDeposit = () => openDialog('Deposit', 'You chose to deposit.');
  const handleTransfer = () => openDialog('Transfer', 'You chose to transfer.');
  const handleBalanceInquiry = () => openDialog('Balance Inquiry', `Your balance is $${balance.value}.`);
  const handleMiniStatement = () => openDialog('Mini Statement', 'Showing recent transactions.');
  const handleChangePin = () => openDialog('Change PIN', 'Proceed to change your PIN.');
  
  const handleLogout = () => {
    router.push({ name: 'login' });
  };
  
  const dialogIcon = computed(() => {
    switch (dialogTitle.value) {
      case 'Withdraw': return '💸';
      case 'Deposit': return '💰';
      case 'Transfer': return '🔁';
      case 'Balance Inquiry': return '📊';
      case 'Mini Statement': return '🧾';
      case 'Change PIN': return '🔐';
      default: return 'ℹ️';
    }
  });
  </script>
  
  <style scoped>
  * {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .atm-action-button {
    background-color: #1e293b;
    color: #fff;
    font-size: 1.125rem;
    padding: 1.25rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    width: 100%;
    text-align: center;
  }
  
  .atm-action-button:hover {
    background-color: #3b4750;
    transform: translateY(-2px);
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
  }
  
  .fade-scale-enter-active,
  .fade-scale-leave-active {
    transition: all 0.3s ease;
  }
  
  .fade-scale-enter-from,
  .fade-scale-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
  </style>
  