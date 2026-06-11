// Funções utilitárias de estado de login
function getStatus() {
    const token = localStorage.getItem('token');
    return !!token;
}

async function getStoresProducts() {
  try {
    const res = await fetch(`http://localhost:3003/store/products`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error(`Erro ao buscar produtos: ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log(data);
    renderProducts(data);    
  } catch (error) {
    console.error("Erro ao buscar lojas:", error);
  }
}

async function renderProducts(dados) {
  const produtos = document.querySelector(".home-main");
  if (!produtos) {
      console.warn("Elemento '.produtos-section' não encontrado. Não é possível renderizar os produtos.");
      return;
  }
  let html = "";

  if (!dados || dados.length === 0) {
      produtos.innerHTML = "<p>Nenhum produto encontrado.</p>";
      return;
  }

  for (let i = 0; i < dados.length; i++){
    const id_product  = dados[i].id;
    const name        = dados[i].name;
    const price = dados[i].price;
    const image = dados[i].image;

    html += `
    <div class="produto">
        <div class="produto-header">
            <img src="${image}" alt="${name}">
        </div>

        <div class="produto-main">
            <p>Nova Coleção</p>
            <span>${name}</span>
            <p>R$ ${price}</p>
        </div>

        <button onClick="addToItems(${id_product})">
            <i class="fa-solid fa-plus"></i>
        </button>
    </div>
    `;
  }
  produtos.innerHTML = html;
}

// Funções para renderizar o perfil e lidar com o logout
async function renderPerfil() {
  const btns = document.querySelector(".btns");
  if (!btns) {
      console.warn("Elemento '.btns' não encontrado. Não é possível renderizar o perfil.");
      return;
  }

  if (getStatus()) {
    btns.innerHTML = `
      <button id="carrinho">🛒</button>
      <button id="deslogar">Logout</button>
    `;
  } else {
    btns.innerHTML = `
      <button id="carrinho">🛒</button>
      <button id="logar" onClick="window.location.href='login.html'">Login</button>
    `;
  }
  // Após a renderização, re-anexar os event listeners
  attachHeaderEventListeners();
}

async function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("role");

  // O formulário "fl" só existe na página de login, então verificamos antes de usar.
  const form = document.getElementById("fl");
  if (form) {
      form.reset();
  }

  await renderPerfil(); // Atualiza a UI para mostrar "Login"
  // Opcional: Recarregar a página ou limpar o carrinho na UI
  // window.location.reload();
  renderPurchase([]); // Limpa o carrinho exibido na UI
}

// Event Listeners
function attachHeaderEventListeners() {
    const header = document.querySelector("header");
    if (!header) {
        console.warn("Elemento 'header' não encontrado. Event listeners de header não serão anexados.");
        return;
    }

    // Remove listeners existentes para evitar duplicação após renderPerfil
    header.removeEventListener("click", handleHeaderClick);
    header.addEventListener("click", handleHeaderClick);

    // Event listener para fechar o carrinho
    if (fecharCarrinho) {
        fecharCarrinho.removeEventListener("click", handleFecharCarrinhoClick);
        fecharCarrinho.addEventListener("click", handleFecharCarrinhoClick);
    }
}

function handleHeaderClick(event) {
    if (event.target.id === "logar") { // Mudança para corresponder ao ID no renderPerfil
        window.location.href = "login.html";
    }
    if (event.target.id === "deslogar") {
        logout();
    }
    if (event.target.id === "carrinho") {
        popup2.classList.add("active");
    }
}

function handleFecharCarrinhoClick() {
    popup2.classList.remove("active");
}


// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    getStoresProducts();
    // getPurchase();
    renderPerfil();
    attachHeaderEventListeners(); // Anexa os listeners inicialmente
});
