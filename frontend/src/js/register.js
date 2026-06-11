function getStatus() {
    const token = localStorage.getItem('token');
    return !!token;
}

async function register() {
  const form = document.getElementById("fr");
  if (!form) {
    console.error("Formulário de registro 'fr' não encontrado.");
    return;
  }
  const dados = new FormData(form);
  const valores = Object.fromEntries(dados.entries());

  try {
    const res = await fetch(`http://localhost:3003/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valores),
    });

    const resultado = await res.json();

    if (res.status === 200) {
      window.location.href = 'login.html';
    } else {
      const registerError = document.querySelector('.register-error');
      registerError.innerHTML = `E`;
      return;
    }
    
  } catch (error) {
    console.error("Erro na requisição de registro:", error);
    alert("Ocorreu um erro ao tentar registrar. Tente novamente mais tarde.");
  }
}