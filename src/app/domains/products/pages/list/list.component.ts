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

  private readonly validCategoryIds = [1, 2, 3, 4, 5];

  private getCategories() {
    this.categoryService.getAll()
      .subscribe({
        next: (data) => {
          this.categories.set(
            data
              .filter(c => this.validCategoryIds.includes(c.id))
              .map(c => {
                if (c.name === 'Clothes' || c.id === 1) return { ...c, name: 'Clothes' };
                if (c.name === 'Electronics' || c.id === 2) return { ...c, name: 'Electronics' };
                if (c.name === 'Furniture' || c.id === 3) return { ...c, name: 'Furniture' };
                if (c.name === 'Shoes' || c.id === 4) return { ...c, name: 'Shoes' };
                if (c.name === 'Miscellaneous' || c.id === 5) return { ...c, name: 'Miscellaneous' };
                return c;
              })
          );
        },
        error: () => {}
      });
    }
}
