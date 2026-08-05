    const stacks = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Vue.js", "Angular", "Svelte", "TypeScript", "Next.js"];

    function mostrarLinguagens() {
      const tabela = document.getElementById("tabela");

      for (let i = 0; i < stacks.length; i++) {
        tabela.innerHTML += `
          <tr>
            <td>${i + 1}</td>
            <td>${stacks[i]}</td>
          </tr>
        `;
      }
    }

    mostrarLinguagens();