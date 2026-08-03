/* Código JavaScript - Gerenciamento de Armazém Usando Vetores
* Prof: Archimedes 
* Variável Global:
*   vetProdutos - vetor de objetos literais que possuem os campos:
*     descricao (descrição do produto),
*     qtEstoque (quantidade em estoque do produto) e 
*     preco (preço do produto).
*/

var vetProdutos = [
  { descricao: "Produto 1", qtEstoque: 58, preco: 17.33 },
  { descricao: "Produto 2", qtEstoque: 65, preco: 16.19 },
  { descricao: "Produto 3", qtEstoque: 11, preco: 88.53 },
  { descricao: "Produto 4", qtEstoque: 31, preco: 59.86 },
  { descricao: "Produto 5", qtEstoque: 10, preco: 92.12 },
  { descricao: "Produto 6", qtEstoque: 16, preco: 48.06 },
  { descricao: "Produto 7", qtEstoque: 3, preco: 84.64 },
  { descricao: "Produto 8", qtEstoque: 49, preco: 66.15 },
  { descricao: "Produto 9", qtEstoque: 60, preco: 11.42 },
  { descricao: "Produto 10", qtEstoque: 45, preco: 16.39 },
  { descricao: "Produto 11", qtEstoque: 37, preco: 16.65 },
  { descricao: "Produto 12", qtEstoque: 15, preco: 90.20 },
  { descricao: "Produto 13", qtEstoque: 9, preco: 54.88 },
  { descricao: "Produto 14", qtEstoque: 0, preco: 93.89 },
  { descricao: "Produto 15", qtEstoque: 51, preco: 88.52 },
  { descricao: "Produto 16", qtEstoque: 84, preco: 62.16 },
  { descricao: "Produto 17", qtEstoque: 34, preco: 80.25 },
  { descricao: "Produto 18", qtEstoque: 18, preco: 4.46 },
  { descricao: "Produto 19", qtEstoque: 0, preco: 79.29 },
  { descricao: "Produto 20", qtEstoque: 10, preco: 81.36 },
  { descricao: "Produto 21", qtEstoque: 39, preco: 78.37 },
  { descricao: "Produto 22", qtEstoque: 69, preco: 72.96 },
  { descricao: "Produto 23", qtEstoque: 29, preco: 25.74 },
  { descricao: "Produto 24", qtEstoque: 1, preco: 25.96 },
  { descricao: "Produto 25", qtEstoque: 5, preco: 8.05 },
  { descricao: "Produto 26", qtEstoque: 27, preco: 4.31 },
  { descricao: "Produto 27", qtEstoque: 25, preco: 25.42 },
  { descricao: "Produto 28", qtEstoque: 90, preco: 36.32 },
  { descricao: "Produto 29", qtEstoque: 26, preco: 66.09 },
  { descricao: "Produto 30", qtEstoque: 27, preco: 5.51 },
  { descricao: "Produto 31", qtEstoque: 20, preco: 93.38 },
  { descricao: "Produto 32", qtEstoque: 72, preco: 31.62 },
  { descricao: "Produto 33", qtEstoque: 41, preco: 53.24 },
  { descricao: "Produto 34", qtEstoque: 55, preco: 18.10 },
  { descricao: "Produto 35", qtEstoque: 17, preco: 99.64 },
  { descricao: "Produto 36", qtEstoque: 33, preco: 84.17 },
  { descricao: "Produto 37", qtEstoque: 12, preco: 73.40 },
  { descricao: "Produto 38", qtEstoque: 8, preco: 82.31 },
  { descricao: "Produto 39", qtEstoque: 6, preco: 16.34 },
  { descricao: "Produto 40", qtEstoque: 17, preco: 90.68 },
  { descricao: "Produto 41", qtEstoque: 49, preco: 25.52 },
  { descricao: "Produto 42", qtEstoque: 62, preco: 52.17 },
  { descricao: "Produto 43", qtEstoque: 28, preco: 91.83 },
  { descricao: "Produto 44", qtEstoque: 20, preco: 68.63 },
  { descricao: "Produto 45", qtEstoque: 32, preco: 52.47 },
  { descricao: "Produto 46", qtEstoque: 39, preco: 48.11 },
  { descricao: "Produto 47", qtEstoque: 20, preco: 36.35 },
  { descricao: "Produto 48", qtEstoque: 89, preco: 1.08 },
  { descricao: "Produto 49", qtEstoque: 77, preco: 1.42 },
  { descricao: "Produto 50", qtEstoque: 45, preco: 42.58 },
  { descricao: "Produto 51", qtEstoque: 1, preco: 41.41 },
  { descricao: "Produto 52", qtEstoque: 3, preco: 76.82 },
  { descricao: "Produto 53", qtEstoque: 42, preco: 89.48 },
  { descricao: "Produto 54", qtEstoque: 68, preco: 10.46 },
  { descricao: "Produto 55", qtEstoque: 33, preco: 81.54 },
  { descricao: "Produto 56", qtEstoque: 73, preco: 49.73 },
  { descricao: "Produto 57", qtEstoque: 77, preco: 23.62 },
  { descricao: "Produto 58", qtEstoque: 16, preco: 39.79 },
  { descricao: "Produto 59", qtEstoque: 23, preco: 24.32 },
  { descricao: "Produto 60", qtEstoque: 18, preco: 67.07 },
  { descricao: "Produto 61", qtEstoque: 62, preco: 19.76 },
  { descricao: "Produto 62", qtEstoque: 990, preco: 79.88 },
  { descricao: "Produto 63", qtEstoque: 641, preco: 34.69 },
  { descricao: "Produto 64", qtEstoque: 490, preco: 23.42 },
  { descricao: "Produto 65", qtEstoque: 213, preco: 29.99 },
  { descricao: "Produto 66", qtEstoque: 981, preco: 46.15 },
  { descricao: "Produto 67", qtEstoque: 642, preco: 76.92 },
  { descricao: "Produto 68", qtEstoque: 300, preco: 75.22 },
  { descricao: "Produto 69", qtEstoque: 664, preco: 62.84 },
  { descricao: "Produto 70", qtEstoque: 179, preco: 96.13 },
  { descricao: "Produto 71", qtEstoque: 452, preco: 97.82 },
  { descricao: "Produto 72", qtEstoque: 379, preco: 10.04 },
  { descricao: "Produto 73", qtEstoque: 335, preco: 95.58 },
  { descricao: "Produto 74", qtEstoque: 163, preco: 99.93 },
  { descricao: "Produto 75", qtEstoque: 998, preco: 5.61 },
  { descricao: "Produto 76", qtEstoque: 159, preco: 41.53 },
  { descricao: "Produto 77", qtEstoque: 719, preco: 56.13 },
  { descricao: "Produto 78", qtEstoque: 991, preco: 95.45 },
  { descricao: "Produto 79", qtEstoque: 271, preco: 10.42 },
  { descricao: "Produto 80", qtEstoque: 91, preco: 52.06 },
  { descricao: "Produto 81", qtEstoque: 570, preco: 92.01 },
  { descricao: "Produto 82", qtEstoque: 493, preco: 90.26 },
  { descricao: "Produto 83", qtEstoque: 419, preco: 47.06 },
  { descricao: "Produto 84", qtEstoque: 208, preco: 37.15 },
  { descricao: "Produto 85", qtEstoque: 874, preco: 83.96 },
  { descricao: "Produto 86", qtEstoque: 0, preco: 15.08 },
  { descricao: "Produto 87", qtEstoque: 306, preco: 14.23 },
  { descricao: "Produto 88", qtEstoque: 715, preco: 39.95 },
  { descricao: "Produto 89", qtEstoque: 436, preco: 25.03 },
  { descricao: "Produto 90", qtEstoque: 302, preco: 76.53 },
  { descricao: "Produto 91", qtEstoque: 190, preco: 12.67 },
  { descricao: "Produto 92", qtEstoque: 553, preco: 62.83 },
  { descricao: "Produto 93", qtEstoque: 991, preco: 1.73 },
  { descricao: "Produto 94", qtEstoque: 801, preco: 74.91 },
  { descricao: "Produto 95", qtEstoque: 963, preco: 41.31 },
  { descricao: "Produto 96", qtEstoque: 412, preco: 36.09 },
  { descricao: "Produto 97", qtEstoque: 340, preco: 4.11 },
  { descricao: "Produto 98", qtEstoque: 389, preco: 26.13 },
  { descricao: "Produto 99", qtEstoque: 596, preco: 38.19 },
  { descricao: "Produto 100", qtEstoque: 833, preco: 59.52 },
  { descricao: "Produto 101", qtEstoque: 899, preco: 24.38 },
  { descricao: "Produto 102", qtEstoque: 58, preco: 2.49 },
  { descricao: "Produto 103", qtEstoque: 955, preco: 49.47 },
  { descricao: "Produto 104", qtEstoque: 877, preco: 18.11 },
  { descricao: "Produto 105", qtEstoque: 69, preco: 88.69 },
  { descricao: "Produto 106", qtEstoque: 434, preco: 41.48 },
  { descricao: "Produto 107", qtEstoque: 993, preco: 88.61 },
  { descricao: "Produto 108", qtEstoque: 35, preco: 95.91 },
  { descricao: "Produto 109", qtEstoque: 409, preco: 89.71 },
  { descricao: "Produto 110", qtEstoque: 843, preco: 32.99 },
  { descricao: "Produto 111", qtEstoque: 833, preco: 43.93 },
  { descricao: "Produto 112", qtEstoque: 570, preco: 0.10 },
  { descricao: "Produto 113", qtEstoque: 65, preco: 17.89 },
  { descricao: "Produto 114", qtEstoque: 39, preco: 80.61 },
  { descricao: "Produto 115", qtEstoque: 210, preco: 28.14 },
  { descricao: "Produto 116", qtEstoque: 706, preco: 97.22 },
  { descricao: "Produto 117", qtEstoque: 397, preco: 34.81 },
  { descricao: "Produto 118", qtEstoque: 753, preco: 29.17 },
  { descricao: "Produto 119", qtEstoque: 589, preco: 92.72 },
  { descricao: "Produto 120", qtEstoque: 57, preco: 21.79 },
  { descricao: "Produto 121", qtEstoque: 618, preco: 85.09 },
  { descricao: "Produto 122", qtEstoque: 350, preco: 10.99 },
  { descricao: "Produto 123", qtEstoque: 652, preco: 43.71 },
  { descricao: "Produto 124", qtEstoque: 532, preco: 1.87 },
  { descricao: "Produto 125", qtEstoque: 829, preco: 50.26 },
  { descricao: "Produto 126", qtEstoque: 586, preco: 30.17 },
  { descricao: "Produto 127", qtEstoque: 507, preco: 27.85 },
  { descricao: "Produto 128", qtEstoque: 76, preco: 99.81 },
  { descricao: "Produto 129", qtEstoque: 781, preco: 69.31 },
  { descricao: "Produto 130", qtEstoque: 689, preco: 92.58 },
  { descricao: "Produto 131", qtEstoque: 591, preco: 50.74 },
  { descricao: "Produto 132", qtEstoque: 833, preco: 68.83 },
  { descricao: "Produto 133", qtEstoque: 180, preco: 76.36 },
  { descricao: "Produto 134", qtEstoque: 944, preco: 94.77 },
  { descricao: "Produto 135", qtEstoque: 325, preco: 61.67 },
  { descricao: "Produto 136", qtEstoque: 456, preco: 40.41 },
  { descricao: "Produto 137", qtEstoque: 856, preco: 54.97 },
  { descricao: "Produto 138", qtEstoque: 56, preco: 8.92 },
  { descricao: "Produto 139", qtEstoque: 93, preco: 40.47 },
  { descricao: "Produto 140", qtEstoque: 257, preco: 88.47 },
  { descricao: "Produto 141", qtEstoque: 219, preco: 78.10 },
  { descricao: "Produto 142", qtEstoque: 206, preco: 18.42 },
  { descricao: "Produto 143", qtEstoque: 837, preco: 85.93 },
  { descricao: "Produto 144", qtEstoque: 376, preco: 83.06 },
  { descricao: "Produto 145", qtEstoque: 150, preco: 10.12 },
  { descricao: "Produto 146", qtEstoque: 809, preco: 70.85 },
  { descricao: "Produto 147", qtEstoque: 371, preco: 78.00 },
  { descricao: "Produto 148", qtEstoque: 130, preco: 28.15 },
  { descricao: "Produto 149", qtEstoque: 711, preco: 34.85 },
  { descricao: "Produto 150", qtEstoque: 194, preco: 94.63 },
  { descricao: "Produto 151", qtEstoque: 131, preco: 96.46 },
  { descricao: "Produto 152", qtEstoque: 818, preco: 33.40 },
  { descricao: "Produto 153", qtEstoque: 628, preco: 91.04 },
  { descricao: "Produto 154", qtEstoque: 49, preco: 26.17 },
  { descricao: "Produto 155", qtEstoque: 527, preco: 55.55 },
  { descricao: "Produto 156", qtEstoque: 137, preco: 16.25 },
  { descricao: "Produto 157", qtEstoque: 223, preco: 21.44 },
  { descricao: "Produto 158", qtEstoque: 330, preco: 14.60 },
  { descricao: "Produto 159", qtEstoque: 592, preco: 40.11 },
  { descricao: "Produto 160", qtEstoque: 74, preco: 23.26 },
  { descricao: "Produto 161", qtEstoque: 855, preco: 78.26 },
  { descricao: "Produto 162", qtEstoque: 908, preco: 22.90 },
  { descricao: "Produto 163", qtEstoque: 194, preco: 45.20 },
  { descricao: "Produto 164", qtEstoque: 346, preco: 43.38 },
  { descricao: "Produto 165", qtEstoque: 877, preco: 47.43 },
  { descricao: "Produto 166", qtEstoque: 809, preco: 38.79 },
  { descricao: "Produto 167", qtEstoque: 98, preco: 31.40 },
  { descricao: "Produto 168", qtEstoque: 753, preco: 4.46 },
  { descricao: "Produto 169", qtEstoque: 563, preco: 45.99 },
  { descricao: "Produto 170", qtEstoque: 354, preco: 41.32 },
  { descricao: "Produto 171", qtEstoque: 189, preco: 76.70 },
  { descricao: "Produto 172", qtEstoque: 297, preco: 64.61 },
  { descricao: "Produto 173", qtEstoque: 389, preco: 63.60 },
  { descricao: "Produto 174", qtEstoque: 200, preco: 77.35 },
  { descricao: "Produto 175", qtEstoque: 279, preco: 94.34 },
  { descricao: "Produto 176", qtEstoque: 781, preco: 16.39 },
  { descricao: "Produto 177", qtEstoque: 554, preco: 26.38 },
  { descricao: "Produto 178", qtEstoque: 402, preco: 63.52 },
  { descricao: "Produto 179", qtEstoque: 424, preco: 78.45 },
  { descricao: "Produto 180", qtEstoque: 90, preco: 38.12 },
  { descricao: "Produto 181", qtEstoque: 746, preco: 5.45 },
  { descricao: "Produto 182", qtEstoque: 732, preco: 30.63 },
  { descricao: "Produto 183", qtEstoque: 21, preco: 51.01 },
  { descricao: "Produto 184", qtEstoque: 289, preco: 44.88 },
  { descricao: "Produto 185", qtEstoque: 889, preco: 17.72 },
  { descricao: "Produto 186", qtEstoque: 584, preco: 45.69 },
  { descricao: "Produto 187", qtEstoque: 446, preco: 62.24 },
  { descricao: "Produto 188", qtEstoque: 278, preco: 16.18 },
  { descricao: "Produto 189", qtEstoque: 52, preco: 54.11 },
  { descricao: "Produto 190", qtEstoque: 928, preco: 60.11 },
  { descricao: "Produto 191", qtEstoque: 687, preco: 67.89 },
  { descricao: "Produto 192", qtEstoque: 82, preco: 31.41 },
  { descricao: "Produto 193", qtEstoque: 544, preco: 18.70 },
  { descricao: "Produto 194", qtEstoque: 904, preco: 9.51 },
  { descricao: "Produto 195", qtEstoque: 379, preco: 97.88 },
  { descricao: "Produto 196", qtEstoque: 420, preco: 85.43 },
  { descricao: "Produto 197", qtEstoque: 358, preco: 9.55 },
  { descricao: "Produto 198", qtEstoque: 0, preco: 32.09 },
  { descricao: "Produto 199", qtEstoque: 318, preco: 40.80 },
  { descricao: "Produto 200", qtEstoque: 610, preco: 8.45 },
  { descricao: "Produto 201", qtEstoque: 353, preco: 34.34 },
  { descricao: "Produto 202", qtEstoque: 455, preco: 51.68 },
  { descricao: "Produto 203", qtEstoque: 98, preco: 75.62 },
  { descricao: "Produto 204", qtEstoque: 526, preco: 98.28 },
  { descricao: "Produto 205", qtEstoque: 71, preco: 74.31 },
  { descricao: "Produto 206", qtEstoque: 27, preco: 32.01 },
  { descricao: "Produto 207", qtEstoque: 746, preco: 33.04 },
  { descricao: "Produto 208", qtEstoque: 701, preco: 82.95 },
  { descricao: "Produto 209", qtEstoque: 943, preco: 2.23 },
  { descricao: "Produto 210", qtEstoque: 762, preco: 69.21 },
  { descricao: "Produto 211", qtEstoque: 802, preco: 80.43 },
  { descricao: "Produto 212", qtEstoque: 788, preco: 52.05 },
  { descricao: "Produto 213", qtEstoque: 187, preco: 15.71 },
  { descricao: "Produto 214", qtEstoque: 868, preco: 31.22 },
  { descricao: "Produto 215", qtEstoque: 165, preco: 19.56 },
  { descricao: "Produto 216", qtEstoque: 515, preco: 32.64 },
  { descricao: "Produto 217", qtEstoque: 496, preco: 94.77 },
  { descricao: "Produto 218", qtEstoque: 367, preco: 18.43 },
  { descricao: "Produto 219", qtEstoque: 549, preco: 53.13 },
  { descricao: "Produto 220", qtEstoque: 671, preco: 15.52 },
  { descricao: "Produto 221", qtEstoque: 141, preco: 70.91 },
  { descricao: "Produto 222", qtEstoque: 488, preco: 68.63 },
  { descricao: "Produto 223", qtEstoque: 840, preco: 92.85 },
  { descricao: "Produto 224", qtEstoque: 976, preco: 86.57 },
  { descricao: "Produto 225", qtEstoque: 424, preco: 64.47 },
  { descricao: "Produto 226", qtEstoque: 499, preco: 76.74 },
  { descricao: "Produto 227", qtEstoque: 209, preco: 8.82 },
  { descricao: "Produto 228", qtEstoque: 295, preco: 66.04 },
  { descricao: "Produto 229", qtEstoque: 531, preco: 8.72 },
  { descricao: "Produto 230", qtEstoque: 978, preco: 23.03 },
  { descricao: "Produto 231", qtEstoque: 597, preco: 81.03 },
  { descricao: "Produto 232", qtEstoque: 953, preco: 13.40 },
  { descricao: "Produto 233", qtEstoque: 311, preco: 59.45 },
  { descricao: "Produto 234", qtEstoque: 536, preco: 18.15 },
  { descricao: "Produto 235", qtEstoque: 968, preco: 0.11 },
  { descricao: "Produto 236", qtEstoque: 448, preco: 64.80 },
  { descricao: "Produto 237", qtEstoque: 455, preco: 51.91 },
  { descricao: "Produto 238", qtEstoque: 175, preco: 47.29 },
  { descricao: "Produto 239", qtEstoque: 527, preco: 37.48 },
  { descricao: "Produto 240", qtEstoque: 774, preco: 53.85 },
  { descricao: "Produto 241", qtEstoque: 688, preco: 62.99 },
  { descricao: "Produto 242", qtEstoque: 838, preco: 15.75 },
  { descricao: "Produto 243", qtEstoque: 707, preco: 61.88 },
  { descricao: "Produto 244", qtEstoque: 139, preco: 43.06 },
  { descricao: "Produto 245", qtEstoque: 645, preco: 31.73 },
  { descricao: "Produto 246", qtEstoque: 896, preco: 13.95 },
  { descricao: "Produto 247", qtEstoque: 802, preco: 97.43 },
  { descricao: "Produto 248", qtEstoque: 352, preco: 62.68 },
  { descricao: "Produto 249", qtEstoque: 382, preco: 30.06 },
  { descricao: "Produto 250", qtEstoque: 447, preco: 62.01 },
  { descricao: "Produto 251", qtEstoque: 31, preco: 39.25 },
  { descricao: "Produto 252", qtEstoque: 911, preco: 87.43 },
  { descricao: "Produto 253", qtEstoque: 121, preco: 60.87 },
  { descricao: "Produto 254", qtEstoque: 206, preco: 86.93 },
  { descricao: "Produto 255", qtEstoque: 703, preco: 15.13 },
  { descricao: "Produto 256", qtEstoque: 829, preco: 50.22 },
  { descricao: "Produto 257", qtEstoque: 894, preco: 22.98 },
  { descricao: "Produto 258", qtEstoque: 579, preco: 72.89 },
  { descricao: "Produto 259", qtEstoque: 179, preco: 27.29 },
  { descricao: "Produto 260", qtEstoque: 310, preco: 0.68 },
  { descricao: "Produto 261", qtEstoque: 0, preco: 90.34 },
  { descricao: "Produto 262", qtEstoque: 791, preco: 54.31 },
  { descricao: "Produto 263", qtEstoque: 511, preco: 88.96 },
  { descricao: "Produto 264", qtEstoque: 999, preco: 0.78 },
  { descricao: "Produto 265", qtEstoque: 257, preco: 17.38 },
  { descricao: "Produto 266", qtEstoque: 966, preco: 1.37 },
  { descricao: "Produto 267", qtEstoque: 328, preco: 11.74 },
  { descricao: "Produto 268", qtEstoque: 172, preco: 38.09 },
  { descricao: "Produto 269", qtEstoque: 640, preco: 76.93 },
  { descricao: "Produto 270", qtEstoque: 835, preco: 42.93 },
  { descricao: "Produto 271", qtEstoque: 897, preco: 28.47 },
  { descricao: "Produto 272", qtEstoque: 496, preco: 10.78 },
  { descricao: "Produto 273", qtEstoque: 58, preco: 4.06 },
  { descricao: "Produto 274", qtEstoque: 795, preco: 45.13 },
  { descricao: "Produto 275", qtEstoque: 974, preco: 9.93 },
  { descricao: "Produto 276", qtEstoque: 750, preco: 98.36 },
  { descricao: "Produto 277", qtEstoque: 317, preco: 0.92 },
  { descricao: "Produto 278", qtEstoque: 314, preco: 29.61 },
  { descricao: "Produto 279", qtEstoque: 551, preco: 24.75 },
  { descricao: "Produto 280", qtEstoque: 268, preco: 66.34 },
  { descricao: "Produto 281", qtEstoque: 527, preco: 66.11 },
  { descricao: "Produto 282", qtEstoque: 185, preco: 28.99 },
  { descricao: "Produto 283", qtEstoque: 919, preco: 60.36 },
  { descricao: "Produto 284", qtEstoque: 585, preco: 12.45 },
  { descricao: "Produto 285", qtEstoque: 859, preco: 79.17 },
  { descricao: "Produto 286", qtEstoque: 0, preco: 90.62 },
  { descricao: "Produto 287", qtEstoque: 891, preco: 82.99 },
  { descricao: "Produto 288", qtEstoque: 879, preco: 77.20 },
  { descricao: "Produto 289", qtEstoque: 217, preco: 88.78 },
  { descricao: "Produto 290", qtEstoque: 597, preco: 92.35 },
  { descricao: "Produto 291", qtEstoque: 473, preco: 55.84 },
  { descricao: "Produto 292", qtEstoque: 401, preco: 13.85 },
  { descricao: "Produto 293", qtEstoque: 962, preco: 69.38 },
  { descricao: "Produto 294", qtEstoque: 191, preco: 2.80 },
  { descricao: "Produto 295", qtEstoque: 756, preco: 43.84 },
  { descricao: "Produto 296", qtEstoque: 192, preco: 10.73 },
  { descricao: "Produto 297", qtEstoque: 391, preco: 31.92 },
  { descricao: "Produto 298", qtEstoque: 939, preco: 77.61 },
  { descricao: "Produto 299", qtEstoque: 0, preco: 48.02 },
  { descricao: "Produto 300", qtEstoque: 593, preco: 59.69 }
];

function listarProdutos() {
  var produtosOrdenados = vetProdutos.slice();
  var auxiliar;
  var listagem = "Descrição\t- Qt. Estoq.\t- Preço\n\n";

  for (var i = 0; i < produtosOrdenados.length - 1; i++) {
    for (var j = i + 1; j < produtosOrdenados.length; j++) {
      if (produtosOrdenados[i].preco > produtosOrdenados[j].preco) {
        auxiliar = produtosOrdenados[i];
        produtosOrdenados[i] = produtosOrdenados[j];
        produtosOrdenados[j] = auxiliar;
      }
    }
  }

  for (var k = 0; k < produtosOrdenados.length; k++) {
    listagem += produtosOrdenados[k].descricao + "\t- ";
    listagem += produtosOrdenados[k].qtEstoque + "\t\t- ";
    listagem += "R$" + produtosOrdenados[k].preco.toFixed(2) + "\n";
  }

  document.getElementById("outListagem").textContent = listagem;
  document.getElementById("outTotal").textContent = "";
}

function filtrarProdutos() {
  var inFiltro = document.getElementById("inFiltro");
  var valorFiltro = Number(inFiltro.value);
  var produtosOrdenados = vetProdutos.slice();
  var auxiliar;
  var listagem = "Descrição\t- Qt. Estoq.\t- Preço\n\n";
  var valorTotal = 0;

  if (inFiltro.value === "") {
    alert("Informe um valor para filtrar os produtos.");
    document.getElementById("outListagem").textContent = "";
    document.getElementById("outTotal").textContent = "";
    inFiltro.focus();
  } else if (isNaN(valorFiltro) || valorFiltro <= 0) {
    alert("Informe um valor maior que zero para filtrar os produtos.");
    document.getElementById("outListagem").textContent = "";
    document.getElementById("outTotal").textContent = "";
    inFiltro.focus();
  } else {
    for (var i = 0; i < produtosOrdenados.length - 1; i++) {
      for (var j = i + 1; j < produtosOrdenados.length; j++) {
        if (produtosOrdenados[i].preco > produtosOrdenados[j].preco) {
          auxiliar = produtosOrdenados[i];
          produtosOrdenados[i] = produtosOrdenados[j];
          produtosOrdenados[j] = auxiliar;
        }
      }
    }

    for (var k = 0; k < produtosOrdenados.length; k++) {
      if (produtosOrdenados[k].preco <= valorFiltro) {
        listagem += produtosOrdenados[k].descricao + "\t- ";
        listagem += produtosOrdenados[k].qtEstoque + "\t\t- ";
        listagem += "R$" + produtosOrdenados[k].preco.toFixed(2) + "\n";
        valorTotal += produtosOrdenados[k].qtEstoque * produtosOrdenados[k].preco;
      }
    }

    document.getElementById("outListagem").textContent = listagem;
    document.getElementById("outTotal").textContent = "Valor Total Produtos Filtrados: R$" + valorTotal.toFixed(2);
  }
}

var btListar = document.getElementById("btListar");
btListar.addEventListener("click", listarProdutos);

var btFiltro = document.getElementById("btFiltro");
btFiltro.addEventListener("click", filtrarProdutos);
