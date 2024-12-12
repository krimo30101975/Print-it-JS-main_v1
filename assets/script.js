/*
const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
]*/

// variables globales
let compteur = 0; // compteur qui permet de connaître l'image sur laquelle on se trouvent
let timer, carousel, slides, slideWidth, speed;

window.onload = () => {
	// On récupère le diporama
	const banner = document.querySelector("#banner");
	// On récupère le data__speed
	//         speed = banner.dataset.speed;
	
	// récupèrer mon carousel
	carousel = document.querySelector("#carousel");
	// console.log(carousel)

	// On clone la premiere image
	let firstImage = carousel.firstElementChild.cloneNode(true);

	// On injecte le clone à la fin du carousel
	carousel.appendChild(firstImage);
	
	// récupèrer les enfants de mon carousel
	slides = Array.from(carousel.children);
	// console.log(slides)

	// On récupère la largeur (rectangle) d'une slide
	slideWidth = banner.getBoundingClientRect().width;

	// On récupère les flèches
	let next = document.querySelector(".arrow_right");
	let prev = document.querySelector(".arrow_left");

	// On gère le clic
	next.addEventListener("click", slideNext);
	prev.addEventListener("click", slidePrev);

	// automatiser le défilement
	//                timer = setInterval(slideNext, speed);
}
/**
 *  Cette fonction fait défiler le diaporama vers la droite
 */
function slideNext() {
	// On incrémente le compteur
	compteur++;

	// temps et forme de la transition des slides
	carousel.style.transition = "0.3s linear";

	// création de la variable decal pour inclure le translate -X du carousel
	let decal = -slideWidth * compteur;
	carousel.style.transform = `translateX(${decal}px)`;

	// On attend la fin de la transition et on "rembobine" de façon cachée
	setTimeout(function() {
		if(compteur >= slides.length - 1) {
			compteur = 0;
			carousel.style.transition = "unset";
			carousel.style.transform = "translateX(0)";
		}
		indicateur();
	}, 300);
}

/**
 *  Cette fonction fait défiler le diaporama vers la gauche
 */
function slidePrev() {
	// On incrémente le compteur
	compteur--;

	// temps et forme de la transition des slides
	carousel.style.transition = "0.3s linear";

	if(compteur < 0) {
		compteur = slides.length - 1;
		// création de la variable decal pour inclure le translate -X du carousel
		let decal = -slideWidth * compteur;
		carousel.style.transition = "unset";
		carousel.style.transform = `translateX(${decal}px)`;
		setTimeout(slidePrev, 1);
	}
	indicateur();
	// création de la variable decal pour inclure le translate -X du carousel
	let decal = -slideWidth * compteur;
	carousel.style.transform = `translateX(${decal}px)`;
}

// boutons indicateur de slide "dots"
let dots = document.querySelectorAll(".dot")
function indicateur() {
	for(i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" dot_selected", "");
	}
	dots[compteur].className += " dot_selected";
}

