<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginApi } from '@/api'; // Adjust path to your API file

// Reactive references
const accountNumber = ref('');
const password = ref('');
const rememberMe = ref(false);
const errorMessage = ref<string | null>(null);

// Router instance
const router = useRouter();

// Login API hook
const { mutate: login, data, isPending, isSuccess, isError, error } = loginApi.useLogin();

// Handle login function
const handleLogin = async () => {
  if (!accountNumber.value || !password.value) {
    errorMessage.value = 'Please enter both Account Number and Password.';
    return;
  }

  try {
    await login({ accountNumber: accountNumber.value, password: password.value });
  } catch (err) {
    errorMessage.value = 'Login failed, please try again later.';
  }
};

// Watch mutation result for success and errors
if (isSuccess.value && data.value) {
  const res = data.value;

  if (!res.AccountStatus) {
    errorMessage.value = 'Account not found or inactive.';
    return;
  }

  if (!res.PasswordStatus) {
    errorMessage.value = 'Incorrect password.';
    return;
  }

  // Store token
  if (res.Token) {
    const storage = rememberMe.value ? localStorage : sessionStorage;
    storage.setItem('token', res.Token);
  }

  // Redirect
  router.push({ name: 'atm' });
}

if (isError.value && error.value) {
  errorMessage.value = error.value instanceof Error ? error.value.message : 'Login failed, please try again later.';
}
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#005f85] to-[#004a6e] p-6">
    <div class="w-full max-w-md bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg p-8 flex flex-col items-center space-y-6">
      <h1 class="text-3xl font-bold text-blue-900">Welcome to ATM</h1>

      <div class="text-center mb-6">
        <div class="bg-blue-700 p-4 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 2a4 4 0 00-4 4v4H7a3 3 0 00-3 3v8a3 3 0 003 3h14a3 3 0 003-3v-8a3 3 0 00-3-3h-1V6a4 4 0 00-4-4zM10 6a2 2 0 114 0v4H10V6z" />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-white">Sign In</h2>
      </div>

      <div class="space-y-4 w-full">
        <div>
          <label class="block text-sm text-gray-700">Account Number</label>
          <input
            v-model="accountNumber"
            type="text"
            placeholder="Account Number"
            class="bg-transparent border border-blue-500 rounded-md px-4 py-2 text-gray-800 w-full"
            @keyup.enter="handleLogin"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="bg-transparent border border-blue-500 rounded-md px-4 py-2 text-gray-800 w-full"
            @keyup.enter="handleLogin"
          />
        </div>
      </div>

      <div v-if="errorMessage" class="text-red-500 text-sm mt-4 text-center">{{ errorMessage }}</div>

      <div class="flex items-center justify-start mt-4 text-sm text-gray-700 w-full">
        <label class="flex items-center space-x-2">
          <input type="checkbox" v-model="rememberMe" class="accent-blue-600" />
          <span>Remember me</span>
        </label>
      </div>

      <button
        @click="handleLogin"
        :disabled="isPending"
        class="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-all ease-in-out duration-200 disabled:opacity-60"
      >
        {{ isPending ? 'Logging in...' : 'Login' }}
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

input:focus,
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}
</style>
