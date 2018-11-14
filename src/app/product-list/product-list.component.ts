import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService} from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  constructor(private productsService: ProductsService) { 
  }

  getProducts(): void {
    this.products = this.productsService.getProducts();
  
  }

  ngOnInit() {
    this.getProducts();
  }
}
