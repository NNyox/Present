function setInRoot(property, value) {
  return document.querySelector(":root").style.setProperty(property, value)
}
const transitionTime = parseInt(getComputedStyle(document.querySelector(":root")).getPropertyValue("--transition").replace("ms", ""));
function wait(funct) {
  setTimeout(funct, transitionTime);
}
let head = window.location.origin + window.location.pathname;
if (!head.endsWith("index.html")) {
  head += "index.html";
};
const queries = new URLSearchParams(window.location.search);
const poem = parseInt(queries.get("p"));
document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("contextmenu", e => e.preventDefault());
});

//#region particles
const stars = {
  "particles": {
    "number": {
      "value": 50,
    },
    "color": {
      "value": "#F9C23C"
    },
    "shape": {
      "type": "star"
    },
    "opacity": {
      "value": 1
    },
    "size": {
      "value": 5,
      "random": true
    },
    "line_linked": {
      "enable": false
    },
    "move": {
      "speed": 15,
      "random": false,
      "direction": "bottom",
      "straight": false,
      "out_mode": "out"
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": false
      },
      "onclick": {
        "enable": true
      }
    },
  },
  "retina_detect": false
}; particlesJS("particle-js", stars);

function centerExplosion() {
  const canvas = document.getElementById("confetti");
  const thisConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true,
  });
  const count = 150;
  function colorRandom() {
    return ("#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"));
  };

  for (let i = 0; i < count; i++) {
    thisConfetti({
      origin: { x: 0.5, y: 0.5 },
      particleCount: 1,
      angle: Math.random() * 360,
      spread: 0,
      startVelocity: 30,
      gravity: 0.5,
      scalar: 1.25,
      ticks: 150,
      shapes: ["square"],
      colors: Array(20).fill().map(() => colorRandom()),
    });
  };
};
//#endregion

window.addEventListener("load", () => {
  wait(() => {
    document.querySelector(".loading-image").style.opacity = "0";
    wait(() => document.querySelector(".loading-image").remove());
  });
});

//#region poetry
let defaultPoetry = [
  ["<span>Esta es la aurora de un suspiro eterno</span><span>un amor fulgoroso en medio de una penumbra</span><span>algo intangible e inefable...</span><span>una historia de amor onírica,</span><span>un relato de amor perenne</span><span>que perdurara en nuestros corazones...</span><span>como un nácar resplandeciente...</span><span>surgiendo en nuestras almas fundidas,</span><span>como algo imperecedero...</span><span>que flota tan tranquilamente</span><span>en la laguna de nuestra esencia inmortal.</span>", false],

  ["<span>Te quiero tanto... tanto, tanto...</span><span>como jamás imaginé querer...</span><span>llegaste como un desvelo a ese sueño gris,</span><span>y sin pedir permiso, pintaste...</span><span>en el lienzo tenue de mi espíritu...</span><span>porque enderezaste mi sombrío camino,</span><span>aquel destino penumbra que me atormentaba,</span><span>pero que tú, con tu voz arrulladora,</span><span>me mostraste el alba de mis días incoloros,</span><span>y manchaste, en el centro de mi ser,</span><span>tu efímera huella y un beso implacable.</span>", false],

  ["<span>Cada momento a tu lado...</span><span>es... tan inmanente, tan divino,</span><span>tan hermoso y ancestral,</span><span>porque a tu lado he descubierto</span><span>un melifluo y perfecto eco</span><span>que me susurra tu nombre...</span><span>ese nombre que no sabía que anhelaba,</span><span>ese nombre que alimenta la llama eterna</span><span>de las fraguas sagradas de mi alma,</span><span>que sellan las heridas abismales</span><span>del añejo silencio guardado en mi ser.</span>", false],

  ["<span>Eres... muchísimo más...</span><span>de lo que pedía... que ni en mil vidas podía...</span><span>esperar que el inmenso infinito me otorgara,</span><span>pero fue algo tan efímero y perfecto</span><span>que no pude contener mis trémulos sentimientos</span><span>que aguardaban en mi umbral secreto,</span><span>olvidados... por aquel niño que...</span><span>vivía atrapado en una fragua de emociones,</span><span>donde todas se fundían...</span><span>hasta formar misterios que hacían tensiones</span><span>en su saudade corazón.</span>", false],

  ["<span>Tu cara... lienzo divino de los pintores...</span><span>aquellos enamorados de la vida eterna,</span><span>que al retratarla, sin querer...</span><span>dieron lugar a tu perfecto visaje...</span><span>como descrito por los poetas más sensibles...</span><span>los que escribieron la belleza mítica del cosmos</span><span>y compararon a Venus con tu sagrado rostro</span><span>aquel que antes yo percibía como borroso</span><span>y que hoy, más que nunca...</span><span>es más claro que la luz primigenia,</span><span>nacida del absoluto silencio del universo.</span>", false],

  ["<span>Tus labios de manjar divino,</span><span>que con sus vibraciones sutiles</span><span>abrigan mi temblorosa alma,</span><span>como un manto eterno y trascendental,</span><span>y que con un arrullador beso</span><span>detienes el curso del tiempo,</span><span>me transportas a un limbo ancestral,</span><span>donde solo somos tú y yo,</span><span>perdidos en la aurora de un espacio liminal,</span><span>donde el cosmos desvanece la materia,</span><span>y donde todo lo demás... se disuelve.</span>", false],

  ["<span>Tus ojos... celestiales estrellas,</span><span>etéreos, fulgorosos, majestuosos...</span><span>que con una mirada imponente y efímera</span><span>me arrastran a un limbo,</span><span>un trance del que no quiero salir...</span><span>Tus ojos que leen lo que no escribo,</span><span>son el intersticio entre el miedo y el amor...</span><span>y, aún así, me disuelvo en su lumbre serena,</span><span>porque son el umbral de lo que nunca sentí,</span><span>el momento suspendido, fugaz y vagante...</span><span>en el infinito de un silencio sagrado del alma.</span>", false],

  ["<span>Veniste a cambiarme indeleblemente...</span><span>me desconstruiste... y me reconstruiste,</span><span>con tus íntimas reglas, suaves y absolutas,</span><span>que adopté como mi lumbre...</span><span>hiciste vibrar un sentimiento en mi alma,</span><span>un melifluo eco que iluminó mi camino...</span><span>el camino de las tierras fértiles,</span><span>donde crecen lirios de amor solemne...</span><span>aquellos perfuman mis paredes de soledad,</span><span>esos que crecen en lo más recóndito</span><span>de mi silencioso ser...</span>", false],

  ["<span>Yo cambié... no para que me quisieras...</span><span>sino para mostrarte cuánto te quiero...</span><span>la magnitud de lo que tu fulgor enciende en mí,</span><span>una llama inagotable... serena y voraz...</span><span>muéstrame tus celestiales cuchillas...</span><span>y verás mis temblorosas manos abiertas,</span><span>dispuestas a drenar esa esencia mortal,</span><span>por una gota de tu oro espiritual,</span><span>por un soplo del elixir que exhalas al amar,</span><span>por fundirme con la chispa filosofal...</span><span>que yace en el centro de tu inmortal corazón.</span>", false]
];
let poetry = JSON.parse(localStorage.getItem("poetry") ?? "null");
function savePoetry() {
  localStorage.setItem("poetry", JSON.stringify(poetry));
};
if (poetry == null) {
  poetry = defaultPoetry;
  savePoetry();
} else if (poetry.length < defaultPoetry.length) {
  for (let i = poetry.length; i < defaultPoetry.length; i++) {
    poetry.push(defaultPoetry[i]);
  };
  savePoetry();
};
//#endregion

//#region font
cursive = true;
document.querySelector(".font").addEventListener("click", () => {
  if (cursive) {
    setInRoot("--font", "arial");
    setInRoot("--fontSize", "0.7rem");
  } else {
    setInRoot("--font", "great vibes");
    setInRoot("--fontSize", "larger");
  };
  cursive = !cursive;
});
//#endregion

//#region gallery
const gallery = document.querySelector(".gallery");
const letters = gallery.querySelector(".letters");
document.querySelector(".show-gallery").addEventListener("click", () => {
  gallery.style.opacity = "1";
  gallery.style.pointerEvents = "all";
});

gallery.querySelector(".fa-x").addEventListener("click", () => {
  gallery.style.opacity = "0";
  wait(() => gallery.style.pointerEvents = "none");
});
//#endregion

//#region theme
themeWhite = true;
document.querySelector(".theme").addEventListener("click", () => {
  if (themeWhite) {
    setInRoot("--color1", "black");
    setInRoot("--color2", "white");
  } else {
    setInRoot("--color1", "white");
    setInRoot("--color2", "black");
  };
  themeWhite = !themeWhite;
});
//#endregion

//#region retry
document.querySelector(".retry").addEventListener("click", () => {
  window.location.href = `${head}`;
});
//#endregion

//#region open envelope
function setNewEnvelope() {
  const envelope = document.querySelector(".envelope");
  const paragraph = document.querySelector(".paragraph");
  const lastEnvelope = localStorage.getItem("lastEnvelope");
  const now = Date.now();
  let poemSelected;
  let rotateToRight = true;
  let clicksRemains = 10;

  function closeEnvelope(text) {
    envelope.style.pointerEvents = "none";
    envelope.style.filter = "contrast(15%)";
    document.querySelector(".text").textContent = text;
  }

  if (!isNaN(poem) && poetry[poem][1] == true) {
    poemSelected = poem;
  } else if (!isNaN(poem) && poetry[poem][1] == false) {
    poemSelected = null;
    closeEnvelope("Poema Bloqueado.");
    return;
  } else if (isNaN(poem)) {
    poemSelected = poetry.findIndex(p => p[1] == false);
    if (poemSelected == -1) { closeEnvelope("Ya no hay mas poemas."); return; }
  };
  if (poemSelected !== null) {
    paragraph.innerHTML = poetry[poemSelected][0];
  };

  if (lastEnvelope && isNaN(poem)) {
    const elapsedTime = now - parseInt(lastEnvelope);
    const hoursDay = 24 * 60 * 60 * 1000;
    if (elapsedTime < hoursDay) {
      const remainingMs = hoursDay - elapsedTime;
      const remainingHours = remainingMs / (1000 * 60 * 60);

      if (remainingHours >= 1) {
        closeEnvelope(`Tienes que esperar ${remainingHours.toFixed()} horas.`);
      } else {
        closeEnvelope(`Tienes que esperar ${Math.round(remainingHours * 60)} minutos.`);
      }
      return;
    };
  };
  //#region envelope active
  explosionDone = false;
  envelope.addEventListener("click", detectClicks);
  function detectClicks() {
    if (clicksRemains > 0) {
      clicksRemains--;
      function rotate(deg) {
        if (rotateToRight) {
          envelope.style.transform = `translate(-50%, -50%) rotateZ(${deg}deg)`;
        } else {
          envelope.style.transform = `translate(-50%, -50%) rotateZ(-${deg}deg)`;
        };
        rotateToRight = !rotateToRight;
      };
      rotate(5);
    } else {
      envelope.style.opacity = "0";
      setInRoot("--initialLetterScale", "1");
      setInRoot("--opacity", "1");
      if (!explosionDone) {centerExplosion(); explosionDone = true};
      wait(() => envelope.remove());
      if (isNaN(poem)) {
        localStorage.setItem("lastEnvelope", now.toString());
        poetry[poemSelected][1] = true; localStorage.setItem("lastPoem", poemSelected + 1);
        savePoetry();
        setGallery();
      };
    };
  };
}; setNewEnvelope();
//#endregion
//#endregion

//#region letter style
const letter = document.querySelector(".letter");
const axis = ['X', 'Y', 'Z'];
for (i in axis) {
  torf = Math.round(Math.random()) == 1 ? true : false;
  if (torf) { letter.style.transform += `rotate${axis[i]}(180deg)` };
};
//#endregion

//#region gallery styles
function setGallery() {
  gallery.querySelector(".letters").innerHTML = "";
  for (let i = 0; i < poetry.length; i++) {
    const poemPreview = document.createElement("div");
    poemPreview.className = `letter${i}`;
    poemPreview.style.backgroundSize = "contain";
    poemPreview.style.backgroundRepeat = "no-repeat";
    poemPreview.style.backgroundPosition = "center";
    const poemIndex = document.createElement("h1");
    poemIndex.className = "center";
    poemIndex.style.margin = "0";
    poemPreview.appendChild(poemIndex)
    poemPreview.style.backgroundImage = `url(assets/images/old-paper.png)`;
    poemIndex.textContent = i + 1;
    if (poetry[i][1] == true) {
      // poemPreview.style.backgroundImage = `url(${head}/assets/images/thumbnails/poem(1).png)`;
      poemPreview.addEventListener("click", () => {
        window.location.href = `${head}?p=${i}`;
      });
    } else {
      poemPreview.style.filter = "contrast(15%)";
    };
    gallery.querySelector(".letters").appendChild(poemPreview);
  };
}; setGallery();
//#endregion
