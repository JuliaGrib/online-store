import { productsList } from "../../lists/products";
import { homePageComponent } from "../home-page.component";
import { filterReload } from "./filters"
import { updateSearch } from "./search"
import { viewReload } from "./view"
import { updatePriceRange, updateStockRange } from "./range"
import { updateSort } from "./sort"


export const updatePage = function() {
  homePageComponent.visibleProducts = productsList.products;

  let params = new URLSearchParams(document.location.search);

  let search = params.get("search");
  let sort = params.get("sort");
  let price = params.get("price");
  let stock = params.get("stock");
  let category = params.get("category");
  let brand = params.get("brand")
  let view = params.get("view")

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
