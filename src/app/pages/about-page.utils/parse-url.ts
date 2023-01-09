export const parseURL = function() {
  const url: URL = new URL(window.location.href);
  const id: string = url.hash.split('/')[1];
  return +id;
}