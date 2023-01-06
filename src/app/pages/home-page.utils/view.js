export const viewReload = function(view) {
  if(view) {
    const container = document.querySelector('.products__main')
    if(view == 'block') {
      container.style.display = "grid"
    }
    if(view == 'list') {
      container.style.display = "block"
    }
  }
}