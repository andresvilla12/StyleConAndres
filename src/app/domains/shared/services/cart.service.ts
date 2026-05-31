import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([]);
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total + product.price, 0);
  })

  constructor() { }

  addToCart(product: Product){
    this.cart.update(state => [...state, product]);
  }

  removeFromCart(product: Product){
    const index = this.cart().findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.cart.update(cart => cart.filter((_, i) => i !== index));
    }
  }

  clearCart(){
    this.cart.set([]);
  }
}
