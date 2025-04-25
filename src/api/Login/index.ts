// src/store/login/index.ts
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginApi } from '@/api';  // Adjust the path to match your API file

// Reactive references
const accountNumber = ref('');
const password = ref('');
const rememberMe = ref(false);
const errorMessage = ref<string | null>(null);

// Router instance
const router = useRouter();

// Login API hook (using Vue Query or custom hook)
const { mutate: login, data, isPending, isSuccess, isError, error } = loginApi.useLogin();

// Handle Login function
const handleLogin = async () => {
  if (!accountNumber.value || !password.value) {
    errorMessage.value = 'Please enter both Account Number and Password.';
    return;
  }

  try {
    await login({ accountNumber: accountNumber.value, password: password.value });
  } catch (err) {
    errorMessage.value = 'Login failed, please try again later.';
    console.error(err);
  }
};

// Watch for successful login response
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

  // Store token based on rememberMe
  if (res.Token) {
    const storage = rememberMe.value ? localStorage : sessionStorage;
    storage.setItem('token', res.Token);
  }

  // Redirect to ATM after successful login
  router.push({ name: 'atm' });
}

// Watch for error
if (isError.value && error.value) {
  const errMsg = error.value instanceof Error ? error.value.message : 'Login failed. Please try again later.';
  errorMessage.value = errMsg;
  console.error('Login error:', error.value);
}

export { accountNumber, password, rememberMe, errorMessage, handleLogin, isPending };
