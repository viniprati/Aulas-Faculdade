const mat1 = [
[39,1,4,8,19,92],
[10,18,19,14,156,64,747],
[65,9876,9877,643,8,654,32,1]
];

const mat2 = [
  [12, 47, 83, 5, 29, 61],
  [91, 24, 7, 132, 58, 406, 73],
  [44, 820, 315, 76, 9, 652, 18, 3]
];

var matSoma = [];

const outMatriz = document.getElementById("outMatriz");

for (let lin = 0; lin < mat1.length; lin++){
  let linhaSoma = [];

  for (let col = 0; col < mat1[lin].length; col++){
    linhaSoma.push(mat1[lin][col] + mat2[lin][col]);
  }

  matSoma.push(linhaSoma);
}

function matrizToString(matriz){
  let texto = "";

  for (let lin = 0; lin < matriz.length; lin++){
    texto += matriz[lin].join(" | ") + "<br>";
  }

  return texto;
}

outMatriz.innerHTML += matrizToString(matSoma);
