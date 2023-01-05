export const parseURL = function() {
  let url = new URL(window.location);
  let id = url.hash.split('/')[1];
  return +id;
}