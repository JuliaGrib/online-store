export const viewReload = function(view: string): void {
  if(view) {
    const container = (document.querySelector('.products__main')) as HTMLElement
    if(view == 'block') {
      container.style.display = "grid"
    }
    if(view == 'list') {
      container.style.display = "block"
    }
  }
}