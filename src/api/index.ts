import type LoginView from '@/modules/Login/LoginView.vue';
import * as products from './products';

class API {
	products: typeof LoginView;

	constructor() {
		this.products = products;
	}
}

const api = new API();

export default api;