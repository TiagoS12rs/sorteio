const nomes = new Set();

function adicionar(){
      const nome = document.getElementById("nome");
      const list = document.getElementsByTagName("ul")[0];
      const item = document.createElement("li");
      const nomeUpper = nome.value.trim().toUpperCase();

      if (nomes.has(nomeUpper)) {
        nome.value = "";
        return;
        
       }
      item.textContent =nomeUpper;
      nomes.add(nomeUpper);
      console.log(nomes)
      list.appendChild(item);
      nome.value="";



}
function sortear(){
    const listaNome = Array.from(nomes);
    const sorteado = listaNome[Math.floor(Math.random()*listaNome.length)]
    const listaSorteados = document.getElementsByTagName("ul")[1];
    const itemSorteado = document.createElement("li");
    itemSorteado.textContent = sorteado;
    listaSorteados.appendChild(itemSorteado);     
}