getProducts()

async function getProducts() {
  let url = 'http://localhost:3003/product';

  const res = await fetch(url);

  let response = await res.json();

  // renderProducts(JSON.stringify(response));
  renderProducts(response);
}

async function renderProducts(dados) {
  const produtos = document.querySelector('.produtos');
  let html = '';

  for (let i = 0; i < dados.length; i++){

    const id_product = dados[i].id_product;
    const name       = dados[i].name;
    const price      = dados[i].price;
    const image      = dados[i].image;
    
    html += `
    <div classe="produtos-header">>
          <img src="${image}" alt="">
      </div>
      
      <div classe="produtos-main">>
          <p>${name}</p>
          <span>${price}</span>
      </div>

      <button type="button">+</button>
    </div>
    `;
  }

  produtos.innerHTML = html;
}