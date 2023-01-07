import { productsList } from "../../lists/products";
import { homePageComponent } from "../home-page.component";
import { filterReload } from "./filters"
import { updateSearch } from "./search"
import { viewReload } from "./view"
import { updatePriceRange, updateStockRange } from "./range"
import { updateSort } from "./sort"


export const updatePage = function() {
  homePageComponent.visibleProducts = productsList.products;

  const params: URLSearchParams = new URLSearchParams(document.location.search);

  const search: string | null = params.get("search");
  const sort: string | null = params.get("sort");
  const price: string | null = params.get("price");
  const stock: string | null = params.get("stock");
  const category: string | null = params.get("category");
  const brand: string | null = params.get("brand")
  const view: string | null = params.get("view")

  if(search == '') homePageComponent.clearQuery("search")
  if(category == '') homePageComponent.clearQuery("category")
  if(brand == '') homePageComponent.clearQuery("brand")
  if(view == '') homePageComponent.clearQuery("view")

  if(category) filterReload(category)
  if(brand) filterReload(brand)
  if(view) viewReload(view)
  if(stock) updateStockRange(stock)
  if(price) updatePriceRange(price)
  if(search) updateSearch(search)
  if(sort) updateSort(sort);
}
