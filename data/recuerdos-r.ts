import type { Memory } from "@/types/memory";

// Fotos de la carpeta R en orden numérico, desde (0) hasta (43).
const photos: Memory[] = [
  {
    id: "album-r-photo-00",
    slug: "el-inicio-de-todo",
    image: "/images/memories/album-r-00.webp",
    alt: "Dos bebidas de frutas sobre una mesa",
    width: 1650,
    height: 2200,
    title: "El inicio de todo",
    note: "Quién diría que esa date sería el comienzo de algo tan especial y único que seguimos contruyendo.",
    favorite: true
  },
  {
    id: "album-r-photo-01",
    slug: "recuerdo-r-01",
    image: "/images/memories/album-r-01.webp",
    alt: "Dos helados morados frente a la barra de una heladería",
    width: 1650,
    height: 2200,
    title: "Los peores y mejores helados",
    note: "El comer ese helado me demostró que realmente me estaba enamorando de ti."
  },
  {
    id: "album-r-photo-02",
    slug: "recuerdo-r-02",
    image: "/images/memories/album-r-02.webp",
    alt: "Un momento al volante durante un paseo juntas",
    width: 1650,
    height: 2200,
    title: "Dándote post it para enamorarte.",
    note: "Gracias por mostrar ese interés con el hecho de venir a verme a mi trabajo."
  },
  {
    id: "album-r-photo-03",
    slug: "recuerdo-r-03",
    image: "/images/memories/album-r-03.webp",
    alt: "Un pequeño corazón sobre una pierna durante un trayecto en auto",
    width: 1650,
    height: 2200,
    title: "¿Predijo el futuro?",
    note: "Él corazón de gomita enchilada que encontramos."
  },
  {
    id: "album-r-photo-04",
    slug: "recuerdo-r-04",
    image: "/images/memories/album-r-04.webp",
    alt: "La calle reflejada en el espejo lateral del auto",
    width: 1650,
    height: 2200,
    title: "Yendo a verme",
    note: "El que fueras a verme me terminó enamorando más de lo que crees."
  },
  {
    id: "album-r-photo-05",
    slug: "recuerdo-r-05",
    image: "/images/memories/album-r-05.webp",
    alt: "Bebidas y flores sobre la mesa durante una salida",
    width: 1650,
    height: 2200,
    title: "El primer ramo que te regalé",
    note: "Te comenté que eran 5 girasoles porque eran las 5 cosas que nunca te faltarían conmigo en nuestra relación y lo cuál sigo teniendo muy presente.",
    favorite: true
  },
  {
    id: "album-r-photo-06",
    slug: "recuerdo-r-06",
    image: "/images/memories/album-r-06.webp",
    alt: "Un abrazo de cerca durante un momento tranquilo",
    width: 1650,
    height: 2200,
    title: "Primera noche juntas.",
    note: "Cuando fuiste a verme en el rojito casi a medianoche. Dije \"está loca, pero deseo más que nunca que de ahora en adelante solo haga estás cosas por mi.\""
  },
  {
    id: "album-r-photo-07",
    slug: "recuerdo-r-07",
    image: "/images/memories/album-r-07.webp",
    alt: "Un vehículo rojo reflejado en el espejo lateral del auto",
    width: 1650,
    height: 2200,
    title: "Mi admiradora."
  },
  {
    id: "album-r-photo-08",
    slug: "recuerdo-r-08",
    image: "/images/memories/album-r-08.webp",
    alt: "Una visita juntas a una tienda llena de objetos y recuerdos",
    width: 1650,
    height: 2200,
    title: "La mujer más hermosa del universo."
  },
  {
    id: "album-r-photo-09",
    slug: "recuerdo-r-09",
    image: "/images/memories/album-r-09.webp",
    alt: "Un retrato frente al espejo durante una salida",
    width: 1650,
    height: 2200,
    title: "Nuestra ida al safari.",
    note: "Amé poder regalarte una date de cumpleaños, anhelo que sea la primera de muchas más."
  },
  {
    id: "album-r-photo-10",
    slug: "recuerdo-r-10",
    image: "/images/memories/album-r-10.webp",
    alt: "Selfie juntas mientras descansamos al aire libre",
    width: 1650,
    height: 2200,
    title: "Nunca dejes de dormir en mi."
  },
  {
    id: "album-r-photo-11",
    slug: "recuerdo-r-11",
    image: "/images/memories/album-r-11.webp",
    alt: "Sentadas juntas a la sombra de un árbol",
    width: 2200,
    height: 1650,
    title: "Disfrutando tú día."
  },
  {
    id: "album-r-photo-12",
    slug: "recuerdo-r-12",
    image: "/images/memories/album-r-12.webp",
    alt: "Selfie juntas bajo los árboles de un jardín",
    width: 1650,
    height: 2200,
    title: "Día de feria",
    note: "Antes de que casi te quedarás sin respiración."
  },
  {
    id: "album-r-photo-13",
    slug: "recuerdo-r-13",
    image: "/images/memories/album-r-13.webp",
    alt: "Un retrato muy de cerca durante un abrazo",
    width: 1650,
    height: 2200,
    title: "Te amo.",
    note: "Que seas tú el lugar donde siempre busque ese hogar."
  },
  {
    id: "album-r-photo-14",
    slug: "recuerdo-r-14",
    image: "/images/memories/album-r-14.webp",
    alt: "Selfie abrazadas durante un momento de descanso",
    width: 2200,
    height: 1650,
    title: "Ignorada.",
    note: "Tú siempre adicta al cel y aún así desde el inicio mi atención era solo para ti."
  },
  {
    id: "album-r-photo-15",
    slug: "recuerdo-r-15",
    image: "/images/memories/album-r-15.webp",
    alt: "Bebidas sobre una manta de picnic en el césped",
    width: 1650,
    height: 2200,
    title: "El mejor cumple",
    note: "Gracias por tomarte el tiempo de darme un momento que siempre guardaré con mucho amor. Mi primer cumple a tú lado."
  },
  {
    id: "album-r-photo-16",
    slug: "recuerdo-r-16",
    image: "/images/memories/album-r-16.webp",
    alt: "Un momento juntas sentadas en el transporte",
    width: 1650,
    height: 2200,
    title: "Fan de tomarte fotos.",
    note: "Mientras tú veías master chef yo te admiraba a ti."
  },
  {
    id: "album-r-photo-17",
    slug: "recuerdo-r-17",
    image: "/images/memories/album-r-17.webp",
    alt: "Un rincón del jardín con árboles y una fuente de piedra",
    width: 1650,
    height: 2200,
    title: "¿Familia católica panista?",
    note: "La primera vez que fuimos a misa, y no tienes idea lo lindo que es adentrarme a lo que te importa."
  },
  {
    id: "album-r-photo-18",
    slug: "recuerdo-r-18",
    image: "/images/memories/album-r-18.webp",
    alt: "Una foto de grupo durante una salida a comer",
    width: 2200,
    height: 1650,
    title: "Quién nos viera, ya todo un team."
  },
  {
    id: "album-r-photo-19",
    slug: "recuerdo-r-19",
    image: "/images/memories/album-r-19.webp",
    alt: "Compartiendo la mesa con amigas durante una salida",
    width: 2200,
    height: 1650,
    title: "Toda una familia.",
    note: "Sí nos veo juntas toda la vida mi amor, compartiendo más momentos con mi persona favorita."
  },
  {
    id: "album-r-photo-20",
    slug: "recuerdo-r-20",
    image: "/images/memories/album-r-20.webp",
    alt: "Dos pizzas preparadas para compartir",
    width: 1650,
    height: 2200,
    title: "JOCHOS",
    note: "Quiero seguir cocinando cualquier antojo a tú lado."
  },
  {
    id: "album-r-photo-21",
    slug: "recuerdo-r-21",
    image: "/images/memories/album-r-21.webp",
    alt: "Una foto juntas bajo las luces de una celebración",
    width: 1650,
    height: 2200,
    title: "La pareja más guapa y hot.",
    favorite: true
  },
  {
    id: "album-r-photo-22",
    slug: "recuerdo-r-22",
    image: "/images/memories/album-r-22.webp",
    alt: "Una mesa compartida entre sonrisas y bebidas",
    width: 2200,
    height: 1650,
    title: "Con el amor de mi vida"
  },
  {
    id: "album-r-photo-23",
    slug: "recuerdo-r-23",
    image: "/images/memories/album-r-23.webp",
    alt: "Una foto juntas junto a las luces de una ventana",
    width: 1650,
    height: 2200,
    title: "Noche un poquito fuera de control.",
    note: "Te amo ante cualquier situación y cada momento que he pasado a tú lado no lo cambió por nada."
  },
  {
    id: "album-r-photo-24",
    slug: "recuerdo-r-24",
    image: "/images/memories/album-r-24.webp",
    alt: "Un abrazo frente al espejo de la cocina",
    width: 1650,
    height: 2200,
    title: "Gym juntas"
  },
  {
    id: "album-r-photo-25",
    slug: "recuerdo-r-25",
    image: "/images/memories/album-r-25.webp",
    alt: "Otro abrazo capturado frente al espejo de la cocina",
    width: 1650,
    height: 2200,
    title: "¿A poco no hacemos una preciosa pareja?",
    note: "Amé ir al gym contigo mi amor, espero podamos hacerlo más seguido."
  },
  {
    id: "album-r-photo-26",
    slug: "recuerdo-r-26",
    image: "/images/memories/album-r-26.webp",
    alt: "Un grupo de amigas juntas durante una celebración",
    width: 1320,
    height: 1192,
    title: "¿Bailando pero a qué costo?",
    note: "Gracias por hacer que podamos volver a sentirnos como niños pequeños mi amor."
  },
  {
    id: "album-r-photo-27",
    slug: "recuerdo-r-27",
    image: "/images/memories/album-r-27.webp",
    alt: "Disfrutando un helado durante una salida",
    width: 1650,
    height: 2200,
    title: "Nunca quiero de cumplir tus gustos.",
    note: "Si supieras que con tal de hacerte siempre sonreír me arrancaría hasta el corazón."
  },
  {
    id: "album-r-photo-28",
    slug: "recuerdo-r-28",
    image: "/images/memories/album-r-28.webp",
    alt: "Una foto juntas frente a un carrusel iluminado",
    width: 2200,
    height: 1650,
    title: "De mis favoritas.",
    favorite: true
  },
  {
    id: "album-r-photo-29",
    slug: "recuerdo-r-29",
    image: "/images/memories/album-r-29.webp",
    alt: "Un beso frente a las luces del carrusel",
    width: 2200,
    height: 1650,
    title: "Me haces sentir en mi propia romcom."
  },
  {
    id: "album-r-photo-30",
    slug: "recuerdo-r-30",
    image: "/images/memories/album-r-30.webp",
    alt: "Selfie abrazadas en una mesa",
    width: 2200,
    height: 1650,
    title: "Se mi compañera de toda la vida."
  },
  {
    id: "album-r-photo-31",
    slug: "recuerdo-r-31",
    image: "/images/memories/album-r-31.webp",
    alt: "Selfie durante un momento de descanso juntas",
    width: 1650,
    height: 2200,
    title: "Una mañana más a tú lado.",
    note: "Lo agradecida que estoy cada que tengo la dicha de decirte un buenos días al despertar."
  },
  {
    id: "album-r-photo-32",
    slug: "recuerdo-r-32",
    image: "/images/memories/album-r-32.webp",
    alt: "Una foto juntas durante una comida",
    width: 2200,
    height: 1650,
    title: "Pijamada con tú cuñis"
  },
  {
    id: "album-r-photo-33",
    slug: "recuerdo-r-33",
    image: "/images/memories/album-r-33.webp",
    alt: "Compartiendo una comida al aire libre",
    width: 2200,
    height: 1650,
    title: "Después de una buena bailada, unos buenos tacos.",
    note: "Que seas con quién siempre coma en lugares aesthetics o en los taquitos de la esquina mi amol."
  },
  {
    id: "album-r-photo-34",
    slug: "recuerdo-r-34",
    image: "/images/memories/album-r-34.webp",
    alt: "Un retrato con una bicicleta y un ramo de flores",
    width: 1650,
    height: 2200,
    title: "Fuck, te amo hasta en estos días"
  },
  {
    id: "album-r-photo-35",
    slug: "recuerdo-r-35",
    image: "/images/memories/album-r-35.webp",
    alt: "Una fotografía frente al espejo",
    width: 2200,
    height: 1650,
    title: "Pose en el espejo."
  },
  {
    id: "album-r-photo-36",
    slug: "recuerdo-r-36",
    image: "/images/memories/album-r-36.webp",
    alt: "Comida y bebidas sobre una mesa",
    width: 1650,
    height: 2200,
    title: "Sushi con mi personita",
    note: "Vayamos a probar todos los sushis que existan"
  },
  {
    id: "album-r-photo-37",
    slug: "recuerdo-r-37",
    image: "/images/memories/album-r-37.webp",
    alt: "Dulces, bebidas y pequeños detalles para compartir",
    width: 1650,
    height: 2200,
    title: "Benditos doriesquites.",
    note: "Gracias por consentir a tú cuñada y a mi amor, prometo que irémos de nuevo por uno más a tu gusto."
  },
  {
    id: "album-r-photo-38",
    slug: "recuerdo-r-38",
    image: "/images/memories/album-r-38.webp",
    alt: "Una foto de grupo alrededor de una mesa",
    width: 2200,
    height: 1650,
    title: "Una loquera más los 4 juntos"
  },
  {
    id: "album-r-photo-39",
    slug: "recuerdo-r-39",
    image: "/images/memories/album-r-39.webp",
    alt: "Un gesto divertido durante un momento de descanso",
    width: 2200,
    height: 1650,
    title: "Amo tus ocurrencias.",
    note: "NUnca dejes de regalarme momentos en donde puedas ser tú misma mi amor, cada parte de ti hace que te ame más."
  },
  {
    id: "album-r-photo-40",
    slug: "recuerdo-r-40",
    image: "/images/memories/album-r-40.webp",
    alt: "Selfie muy de cerca mientras descansamos juntas",
    width: 2200,
    height: 1650,
    title: "Le pido a Dios que seas tú a quién mire cada mañana."
  },
  {
    id: "album-r-photo-41",
    slug: "recuerdo-r-41",
    image: "/images/memories/album-r-41.webp",
    alt: "Disfrutando una bebida durante una salida",
    width: 1650,
    height: 2200,
    title: "Mi bebé para siempre.",
    note: "Nunca imaginé que podría ver a alguien con tantos ojos de amor, que me da miedo hacerte daño, eres a quién quiero cuidar toda la vida, consentir y hacer que nunca te falte nada."
  },
  {
    id: "album-r-photo-42",
    slug: "recuerdo-r-42",
    image: "/images/memories/album-r-42.webp",
    alt: "Bolsitas de dulces y flores sobre el césped",
    width: 1650,
    height: 2200,
    title: "Felices 7 meses amor.",
    note: "Disfrutando de nuestras temporadas favoritas juntas."
  },
  {
    id: "album-r-photo-43",
    slug: "recuerdo-r-43",
    image: "/images/memories/album-r-43.webp",
    alt: "Selfie juntas durante una tarde al aire libre",
    width: 2200,
    height: 1650,
    title: "Eres mi rayo de luz, te amo."
  }
];

const videos: Memory[] = [
  {
    id: "album-r-video-00",
    slug: "video-r-00",
    image: "/images/memories/album-r-video-00.webp",
    video: "/videos/memories/album-r-video-00.mp4",
    alt: "Un paseo por una plaza con escaleras eléctricas",
    width: 720,
    height: 1280,
    title: "Desde entonces nunca quiero dejar de grabarte."
  },
  {
    id: "album-r-video-01",
    slug: "video-r-01",
    image: "/images/memories/album-r-video-01.webp",
    video: "/videos/memories/album-r-video-01.mp4",
    alt: "Un momento de la salida con bebidas y botanas",
    width: 720,
    height: 1280,
    title: "Gracias por ser mi date cinefila."
  },
  {
    id: "album-r-video-02",
    slug: "video-r-02",
    image: "/images/memories/album-r-video-02.webp",
    video: "/videos/memories/album-r-video-02.mp4",
    alt: "Una visita a una tienda durante una salida juntas",
    width: 720,
    height: 1280,
    title: "Bendita mi mujer.",
    note: "Quedo atónita cada que te veo mi amor, para mi eres la mujer más hermosa del universo, caigo redondita a tus pies, gracias por ser la mujer que me acompaña a mi día a día, gracias por enamorarme cada vez más y por nunca dejar de hacerme feliz."
  },
  {
    id: "album-r-video-03",
    slug: "video-r-03",
    image: "/images/memories/album-r-video-03.webp",
    video: "/videos/memories/album-r-video-03.mp4",
    alt: "Una conversación alrededor de la mesa durante una salida",
    width: 1280,
    height: 720,
    title: "Karaoki Doki",
    note: "LLevándonos al camino del mal a mi a tus cuñis. No te creas te amamos, gracias por darnos momentos inolvidables."
  },
  {
    id: "album-r-video-04",
    slug: "video-r-04",
    image: "/images/memories/album-r-video-04.webp",
    video: "/videos/memories/album-r-video-04.mp4",
    alt: "Un momento juntas durante una celebración",
    width: 1280,
    height: 720,
    title: "Mi videoclip fav.",
    note: "Cada indiferencia jamás le hará competencia a lo precioso que me haces sentir cada día con tú amor."
  },
  {
    id: "album-r-video-05",
    slug: "video-r-05",
    image: "/images/memories/album-r-video-05.webp",
    video: "/videos/memories/album-r-video-05.mp4",
    alt: "Un video juntas durante un paseo al aire libre",
    width: 720,
    height: 1280,
    title: "Amo estar a tú lado mi amor"
  }
];

// Repartimos los seis videos entre las fotos sin alterar el orden de estas.
const videoAfterPhoto = new Map<number, Memory>([
  [5, videos[3]],
  [12, videos[0]],
  [18, videos[5]],
  [24, videos[1]],
  [31, videos[4]],
  [38, videos[2]],
]);

export const folderMemories: Memory[] = photos.flatMap((photo, index) => {
  const video = videoAfterPhoto.get(index);
  return video ? [photo, video] : [photo];
});
