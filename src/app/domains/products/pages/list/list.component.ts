import { Component, Input, SimpleChange, SimpleChanges, inject, signal } from '@angular/core';

import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges){
    this.getProducts()
    }

  addToCart(product: Product) {
    this.cartService.addToCart(product)
  }

  private getProducts() {
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {
      }
    })

  }

  private getCategories() {
    this.categoryService.getAll()
    .subscribe({
      next: (data) => {
        this.categories.set(
          data
            .map(c => {
              if (c.id === 1) return { ...c, name: 'Clothes' };
              return c;
          })
          .filter(c => 
            c.name.length < 20 && 
            c.name !== 'string' && 
            c.name !== 'HAIYA' &&
            c.name !== 'sss' &&
            c.name !== 'New Ctg' &&
            c.name !== 'category_B' &&
            !c.name.includes('Updated') &&
            !c.name.toLowerCase().includes('kategori') &&
            !c.name.toLowerCase().includes('new') &&
            !Number(c.name)
          )
        );
      },
      error: () => {
      }
    })

  }
}
