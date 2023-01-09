import { Component } from "../framework/core/component"

export interface IConfigComponent {
  selector: string,
  template: string,
  el?: Element | null
}

export interface IRoutes {
  path: string
  component: Component
}

export interface IConfigModule {
  components: Array<Component>
  bootstrap: Component
  routes: Array<IRoutes>
}

export interface IProduct {
  id: number
  title: string
  description: string
  price: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  stock: number
}

export interface IProductList {
  products: Array<IProduct>
}