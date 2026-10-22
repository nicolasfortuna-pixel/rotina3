import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const app = initializeApp({
  databaseURL: "https://lista3-78b65-default-rtdb.firebaseio.com/",
});
const db = getDatabase(app);
const coisas = ref(db, "coisas");

const form = document.getElementById("form-coisas");
const titulo = document.getElementById("titulo");
const lista = document.getElementById("lista-coisas");

//criar
form.onsubmit = (e) => {
  e.preventDefault();
  push(coisas, { titulo: titulo.value });
  form.reset();
};

//ler
onValue(coisas, (snap) => {
  lista.innerHTML = "";
  snap.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.val().titulo + " ";

    const editar = document.createElement("button");
    editar.textContent = "Editar";
    editar.onclick = () => {
      const novo = prompt("Novo nome:", item.val().titulo);
      if (novo) update(item.ref, { titulo: novo });
    }; // <- esta chave estava faltando aqui

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";
    excluir.onclick = () => remove(item.ref);

    li.append(editar, excluir);
    lista.append(li);
  });
});
