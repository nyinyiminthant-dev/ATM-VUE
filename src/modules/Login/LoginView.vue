<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);

const router = useRouter();

const handleLogin = () => {
  console.log('Login info:', email.value, password.value, rememberMe.value);
  // Redirect to home page upon successful login
  router.push({ name: 'home' });
};
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#005f85] to-[#004a6e] p-6">
    <div class="w-full max-w-md bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg p-8 flex flex-col items-center space-y-6">
      <div class="text-center mb-6">
        <div class="bg-blue-700 p-4 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a4 4 0 00-4 4v4H7a3 3 0 00-3 3v8a3 3 0 003 3h14a3 3 0 003-3v-8a3 3 0 00-3-3h-1V6a4 4 0 00-4-4zM10 6a2 2 0 114 0v4H10V6z" />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-white">Sign In</h2>
      </div>

      <div class="space-y-4 w-full">
        <div>
          <label class="block text-sm text-gray-700">Email</label>
          <div class="flex items-center bg-white/70 border border-blue-500/80 rounded-md px-3 py-2 transition duration-200 ease-in-out hover:bg-blue-100/50">
            <svg class="h-5 w-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 10a4 4 0 100-8 4 4 0 000 8zM3 17a7 7 0 0114 0H3z" />
            </svg>
            <input type="email" v-model="email" placeholder="Email" class="bg-transparent outline-none text-sm w-full text-gray-800 placeholder-gray-500 transition duration-200 ease-in-out hover:bg-blue-100/30" />
          </div>
        </div>

        <div>
          <label class="block text-sm text-gray-700">Password</label>
          <div class="flex items-center bg-white/70 border border-blue-500/80 rounded-md px-3 py-2 transition duration-200 ease-in-out hover:bg-blue-100/50">
            <svg class="h-5 w-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 1110 0v2h1a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1v-8a1 1 0 011-1h1zm2-2a3 3 0 116 0v2H7V7z" clip-rule="evenodd" />
            </svg>
            <input type="password" v-model="password" placeholder="Password" class="bg-transparent outline-none text-sm w-full text-gray-800 placeholder-gray-500 transition duration-200 ease-in-out hover:bg-blue-100/30" />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-start mt-4 text-sm text-gray-700">
        <label class="flex items-center space-x-2">
          <input type="checkbox" v-model="rememberMe" class="accent-blue-600 transition duration-200 ease-in-out hover:bg-blue-700" />
          <span>Remember me</span>
        </label>
      </div>

      <button @click="handleLogin" class="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-all ease-in-out duration-200">
        Login
      </button>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #005f85;
}

input:focus, button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}
</style>
