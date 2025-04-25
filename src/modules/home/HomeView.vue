<template>
  <div class="w-screen h-screen bg-gradient-to-br from-[#004a6e] to-[#002f4b] flex flex-col items-center justify-center p-6">
    <!-- Title -->
    <h1 class="text-white text-4xl md:text-5xl font-bold mb-12 drop-shadow-xl">
      Welcome to Nyi Bank
    </h1>

    <!-- Card Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
      <!-- ATM Card -->
      <div
        @click="goToATM"
        class="bank-card group"
      >
        <div class="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🏧</div>
        <h2 class="text-white text-2xl font-semibold mb-2 group-hover:text-[#ffe400] transition-colors duration-300">ATM</h2>
        <p class="text-white/70 group-hover:text-white transition duration-300">Access your account, withdraw cash and more.</p>
      </div>

      <!-- Bank Card -->
      <div
        @click="goToBank"
        class="bank-card group"
      >
        <div class="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🏦</div>
        <h2 class="text-white text-2xl font-semibold mb-2 group-hover:text-[#ffe400] transition-colors duration-300">Bank</h2>
        <p class="text-white/70 group-hover:text-white transition duration-300">Meet our staff, open accounts, and get support.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const goToATM = () => router.push({ name: 'login' });
const goToBank = () => router.push({ name: 'bank' });
</script>

<style scoped>
.bank-card {
  background: linear-gradient(to bottom right, #0072a0, #003b5c);
  padding: 2.5rem 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: white;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.bank-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}
</style>
