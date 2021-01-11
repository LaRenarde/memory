class Joueur {
  score = 0;
  constructor(pseudo) {
    this.pseudo = pseudo;
  }
}

function shuffle(arrayIn) {
  let array = [...arrayIn];

  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
// Oeuf de paques We love Rémy ;-)
function loveRemy(elm, carte) {
  elm.addEventListener("mouseout", function () {
    carte.nbClic = 0;
  });
  if (carte.nbClic === 5) {
    console.log("We <3 Rémy");
  }
}
function displayAllCard(jeu, cartes) {
  let carte1 = jeu[0];
  let carte2 = jeu[1];
  let cartesCachees = cartes.filter((carte) => carte.statut === "cachée");
  if (carte1 === "image0.jpeg" && carte2 === "image8.jpeg") {
    console.log("JOKER");
    cartesCachees.forEach((carte) => {
      carte.element.src = `images/${carte.src}`;
    });
    setTimeout(function () {
      cartesCachees.forEach((carte) => {
        carte.element.src = `images/greta.jpeg`;
      });
    }, 1000);
    return 1;
  }
  return 0;
}
function cancelTheFirstCards(cartes, imagesTrouvees, jeu) {
  let carte1 = jeu[0];
  let carte2 = jeu[1];
  if (
    carte1 === "image9.jpeg" &&
    carte2 === "image6.jpeg" &&
    imagesTrouvees.length !== 0
  ) {
    console.log("Annule la première paire");
    cartes.forEach((carte) => {
      if (
        carte.element === imagesTrouvees[0].element ||
        carte.element === imagesTrouvees[1].element
      ) {
        carte.statut = "cachée";
      }
    });
    imagesTrouvees[0].element.src = "images/greta.jpeg";
    imagesTrouvees[1].element.src = "images/greta.jpeg";
    imagesTrouvees.shift();
    imagesTrouvees.shift();
  }
  return [cartes, imagesTrouvees];
}
function displayGiraffe(jeu, Allcartes, imagesTrouvees) {
  let carte1 = jeu[0];
  let carte2 = jeu[1];
  let giraffes = Allcartes.filter((carte) => carte.src == "image2.jpeg");
  let giraffesTrouvees = imagesTrouvees.filter(
    (carte) => carte.src === "images/image2.jpeg"
  );

  if (
    carte1 === "image4.jpeg" &&
    carte2 === "image3.jpeg" &&
    giraffesTrouvees.length === 0
  ) {
    console.log("Fait apparaitre une girafe");
    giraffes[1].element.src = "images/image2.jpeg";
    setTimeout(function () {
      giraffes[1].element.src = "images/greta.jpeg";
    }, 1200);
  } else return false;
}
function comparseCards(cartes) {
  const tableComparaison = cartes.filter((carte) => carte.statut === "visible");
  if (tableComparaison.length === 2) {
    if (tableComparaison[0].src === tableComparaison[1].src) {
      return true;
    }
    return false;
  } else {
    return undefined;
  }
}

function update(result, cartes, imagesTrouvees) {
  if (result) {
    cartes.forEach((carte) => {
      if (carte.statut === "visible") {
        carte.statut = "trouvée";
        imagesTrouvees.push(carte);
        setTimeout(1000);
      }
    });
  } else if (result === undefined) {
    console.log("En attente d'une deuxième carte");
  } else {
    cartes.forEach((carte) => {
      if (carte.statut === "visible") {
        setTimeout(function () {
          carte.statut = "cachée";
          carte.element.src = "images/greta.jpeg";
        }, 1000);
      }
    });
  }
  return [cartes, imagesTrouvees];
}
function getClassement(classement, liste) {
  if (localStorage.length !== 0 && localStorage.joueurs !== undefined) {
    classement = JSON.parse(localStorage.getItem("joueurs"));
    classement.sort((a, b) => {
      return b.score - a.score;
    });
    if (classement.length > 4) {
      for (let i = 0; i < 5; i++) {
        let li = document.createElement("li");
        li.innerText = ` ${classement[i].date} à ${classement[i].hours} : ${classement[i].pseudo} a obtenu un score de ${classement[i].score}. `;
        liste.appendChild(li);
      }
    } else {
      for (joueur of classement) {
        let li = document.createElement("li");
        li.innerText = ` ${joueur.date} à ${joueur.hours} : ${joueur.pseudo} a obtenu un score de ${joueur.score}. `;
        liste.appendChild(li);
      }
    }
  } else {
    let li = document.createElement("li");
    li.innerHTML = "<h4> Le classement est vide. A vous de jouer ! </h4>";
    liste.appendChild(li);
  }
  return classement;
}
function end(imagesTrouvees, cartes, timer, classement, user) {
  if (imagesTrouvees.length === cartes.length) {
    console.log("Jeu terminé");
    clearInterval(timer);
    classement.push(user);
    localStorage.setItem("joueurs", JSON.stringify(classement));
    document.location.reload(false);
  }
  return cartes;
}

document.addEventListener("DOMContentLoaded", function () {
  // localStorage.clear()
  const form = document.getElementById("commencer");
  const section = document.querySelector("section");
  let elements = document.querySelectorAll(".carte");
  let plateau = document.getElementById("plateauJeu");
  let header = document.querySelector("header");
  let liste = document.querySelector("ol");

  let classement = [];
  classement = getClassement(classement, liste);
  
  let images = [
    { src: "image0.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image1.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image2.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image3.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image4.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image5.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image6.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image7.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image8.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image9.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image0.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image1.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image2.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image3.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image4.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image5.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image6.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image7.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image8.jpeg", statut: "cachée", nbClic: 0 },
    { src: "image9.jpeg", statut: "cachée", nbClic: 0 },
  ];
  let cartes = shuffle(images);
  let imagesTrouvees = [];
  let cartesJouees = [];
  const user = new Joueur(null);
  let unique = 0;
  let timer = setInterval(() => {
    user.score += 1;
    console.log(user.score);
  }, 1000);

  // Lancement du jeu
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let input = document.getElementById("pseudo");
    let titre = document.createElement("h2");
    let pseudo = input.value;
    if (input.value === "") {
      alert("Merci de renseigner un pseudo");
    } else {
      user.pseudo = pseudo;
      let date = new Date();
      user.date =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
      user.hours = date.getHours() + ":" + date.getMinutes();
      titre.innerText = `Bon jeu ${user.pseudo}`;
      plateau.style.display = "block";
      header.appendChild(titre);
      section.style.display = "none";
      user.score = 0;
    }
  });
  // Ecoute du click de chaque carte.
  for (let i = 0; i < elements.length; i++) {
    cartes[i].element = elements[i];
    let elm = elements[i];
    let carte = cartes[i];

    elm.addEventListener("click", function () {
      carte.nbClic += 1;
      loveRemy(elm, carte);

      // Empêche de retourner une troisième carte.
      if (cartesJouees.length === 0 || cartesJouees.length === 1) {
        carte.statut = "visible";
        elm.setAttribute("src", `images/${carte.src}`);
        if (cartesJouees.length === 0 || carte.src !== cartesJouees[0]) {
          cartesJouees.push(carte.src);
        }
        console.log(cartesJouees);
      }

      displayGiraffe(cartesJouees, cartes, imagesTrouvees);
      [cartes, imagesTrouvees] = cancelTheFirstCards(
        cartes,
        imagesTrouvees,
        cartesJouees
      );
      if (unique === 0) {
        unique = displayAllCard(cartesJouees, cartes, unique);
      }
      let result = comparseCards(cartes);
      [cartes, imagesTrouvees] = update(result, cartes, imagesTrouvees);
      if (result !== undefined) {
        setTimeout(function () {
          cartesJouees = [];
        }, 1000);
      }
      //Jeu terminé
      cartes = end(imagesTrouvees, cartes, timer, classement, user);
    });
  }
});
