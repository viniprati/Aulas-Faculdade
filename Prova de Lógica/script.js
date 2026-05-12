const trechos = [];

document.getElementById("btnTrecho").addEventListener("click", function () {
  const campoDistancia = document.getElementById("distancia");
  const campoTempo = document.getElementById("tempo");
  const saida = document.getElementById("saida");

  const distanciaTexto = campoDistancia.value.trim();
  const tempoTexto = campoTempo.value.trim();

  const distancia = Number(distanciaTexto);
  const tempo = Number(tempoTexto);

  if (distanciaTexto === "") {
    alert("Informe a distância.");
    campoDistancia.focus();
    return;
  }

  if (tempoTexto === "") {
    alert("Informe o tempo.");
    campoTempo.focus();
    return;
  }

  if (distancia <= 0 || isNaN(distancia)) {
    alert("A distância deve ser maior que 0.");
    campoDistancia.focus();
    return;
  }

  if (tempo <= 0 || isNaN(tempo)) {
    alert("O tempo deve ser maior que 0.");
    campoTempo.focus();
    return;
  }
 
  const velocidadeMedia = distancia / tempo;
  trechos.push({ distancia, tempo, velocidadeMedia });

  saida.textContent = `Trecho registrado: ${distancia} km em ${tempo} h. Velocidade média: ${velocidadeMedia.toFixed(2)} km/h.`;
});
document.getElementById("btnEnduro").addEventListener("click", function () {
  const relatorio = document.getElementById("relatorio");

  if (trechos.length === 0) {
    alert("Registre pelo menos um trecho antes de gerar o relatório.");
    return;
  }

  let distanciaTotal = 0;
  let qtdMaisDeDuasHoras = 0;
  let qtdVelocidadeMaior100 = 0;

  for (let i = 0; i < trechos.length; i++) {
    distanciaTotal += trechos[i].distancia;

    if (trechos[i].tempo > 2) {
      qtdMaisDeDuasHoras++;
    }

    if (trechos[i].velocidadeMedia > 100) {
      qtdVelocidadeMaior100++;
    }
  }

  const mediaDistancias = distanciaTotal / trechos.length;

  relatorio.innerHTML =
    `Distância total percorrida: ${distanciaTotal.toFixed(2)} km<br>` +
    `Trechos com mais de duas horas: ${qtdMaisDeDuasHoras}<br>` +
    `Trechos com velocidade média superior a 100 km/h: ${qtdVelocidadeMaior100}<br>` +
    `Média das distâncias dos trechos: ${mediaDistancias.toFixed(2)} km`;
});

