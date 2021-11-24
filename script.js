var blocos = document.querySelectorAll("th"), // pega todos os blocos do jogo
  mensagem = document.querySelector("p"), // pega o paragrafo da mensagem
  total = 0, // o total de vezes com o limite de 9
  jogador = 1, // o jogador atual
  fimDoJogo; // para armazenar o fim do jogo

mensagem.innerHTML = "Vez do jogador <b>X</b>."; // configura a mensagem inicial

for (const bloco of blocos) { // intera sobre os blocos
  bloco.addEventListener("click", function () { // adiciona um acionador de eventos de clique
    if (fimDoJogo || total == 9) return; // verifica se é o fim do jogo ou se chegou ao limite de cliques para poder bloquar cliques

    if (!bloco.jogo) { // verifica se o bloco ainda nao foi clicado
      total++; // adiciona um ao total

      bloco.jogo = jogador; // configura o jogador ao bloco

      if (jogador == 1) { // verifica se é o jogador 1
        jogador = 2; // configura o jogador para o 2
        bloco.textContent = "X"; // adiciona o texto X ao bloco
      } else { // caso seja diferente
        jogador = 1; // configura o jogador para 1
        bloco.textContent = "O"; // adiciona o texto O ao bloco
      }

      mensagem.innerHTML = "Vez do jogador <b>" + (jogador == 1 ? "X" : "O") + "</b>.";  // configura o conteudo da mensagem para o texto da string para saber qual sra oo proximo jogador

      fimDoJogo = verificar(); // verifica o jogo e configura a variavel fimDoJogo para o resultado retornado

      if (fimDoJogo) mensagem.innerHTML = "O jogador <b>" + (fimDoJogo == 1 ? "X" : "O") + "</b> ganhou!"; // se o fim do jogo for 1 ou 2, ele configura a mensagem para o jogador que ganhou
      else if (total == 9) mensagem.textContent = "Deu velha."; // caso todos os blocos tenham sido clicados, então ele muda a mensagem para deu velha
    }
  });
}

function verificar(ganhou) { // função para verificar o jogo com o argumento ganhou (para ser usado como variavel local que pode ser alterada)
  // verifica as horizontais
  if (blocos[0].jogo == blocos[1].jogo && blocos[1].jogo == blocos[2].jogo) ganhou = blocos[0];
  else if (blocos[3].jogo == blocos[4].jogo && blocos[4].jogo == blocos[5].jogo) ganhou = blocos[3];
  else if (blocos[6].jogo == blocos[7].jogo && blocos[7].jogo == blocos[8].jogo) ganhou = blocos[6];
  // verifica as verticais
  else if (blocos[0].jogo == blocos[3].jogo && blocos[3].jogo == blocos[6].jogo) ganhou = blocos[0];
  else if (blocos[1].jogo == blocos[4].jogo && blocos[4].jogo == blocos[7].jogo) ganhou = blocos[1];
  else if (blocos[2].jogo == blocos[5].jogo && blocos[5].jogo == blocos[8].jogo) ganhou = blocos[2];
  // verifica as diagonais
  else if (blocos[0].jogo == blocos[4].jogo && blocos[4].jogo == blocos[8].jogo) ganhou = blocos[0];
  else if (blocos[2].jogo == blocos[4].jogo && blocos[4].jogo == blocos[6].jogo) ganhou = blocos[2];
  return ganhou && ganhou.jogo; // caso o ganhou seja diferente de undefined, ele obtem o numero do jogador que ganhou e o retorna
}