const button = document.querySelector('#hello');
button.addEventListener('click', () => {
  const h1 = document.createElement('h1');
  h1.textContent = 'Hello World!';
  document.body.appendChild(h1);
});
