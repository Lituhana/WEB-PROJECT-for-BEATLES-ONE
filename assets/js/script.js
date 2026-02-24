document.addEventListener("DOMContentLoaded", () => {

    // Traemos las fechas de los shows desde Google Sheets

    const SHEET_ID = "1kXIlcUHinT3hFVhNkGWnevTdXQsVr4iGHd-AAgf-xd4";
    const SHEET_NAME = "Hoja 1";
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

    let shows = [];

    // Traducciones

    const translations = {
        es: {
            "inicio": "Inicio",
            "nosotros": "¿Quiénes somos?",
            "galeria": "Galería",
            "shows": "Próximos Shows",
            "contacto": "Contacto",
            "btn-proximo-show": "Próximo Show",
            "btn-ver-todos": "Ver todos los shows",
            "logo-sub": "El tributo definitivo a los 4 de Liverpool",
            "video-sub": "Beatles One en Bs As (2025) - Long Tall Sally",
            "youtube-titulo": "Nuestro canal de YouTube",
            "youtube-btn": "Ver canal",
            "youtube-desc": "Videos de nuestros shows y ensayos",
            "instagram-titulo": "Seguinos en Instagram",
            "instagram-desc": "Fotos, historias y novedades de la banda",
            "instagram-btn": "@beatles.one",
            "nosotros-titulo_1": "Beatles One",
            "nosotros-titulo_2": "El tributo a The Beatles de Uruguay",
            "nosotros-piedefoto": "Beatles One participando de la 25° Beatleweek en The Cavern Club de Bs As - 2025",
            "shows-titulo": "Próximos Shows",
            "shows-pasados-titulo": "Shows Anteriores",
            "no-shows-message": "Aún no hay shows programados.",
            "contacto-titulo": "Ponete en contacto",
            "label-reason": "Motivo:",
            "opt-contrataciones": "Contrataciones",
            "opt-consultas": "Consultas",
            "opt-otros": "Otros",
            "label-name": "Nombre:",
            "label-email": "Correo:",
            "label-msg": "Mensaje:",
            "btn-send": "Enviar",
            "confirmacion-msg": "¡Mensaje enviado! Te responderemos a la brevedad.",
            "piedepagina": "© 2026 - Beatles One - Tributo Beatle",
            "galeria-banda": "La Banda",
            "galeria-instrumentos": "Instrumentos y Equipamiento",
            "caption-foto1": "Beatles One en Inmigrantes MVD",
            "caption-foto2": "Beatles One en La Vaca Azul",
            "caption-foto3": "Beatles One representando a 🇺🇾 en Buenos Aires",
            "caption-foto4": "Beatles One",
            "caption-foto5": "Beatles One en Brickel",
            "caption-foto6": "Beatles One en The Shannon Irish Pub",
            "caption-foto7": "John y Ringo en La Piqué House",
            "caption-foto8": "Ringo con su Batería Ludwig",
            "caption-foto9": "Paul y John",
            "caption-foto10": "George y John en The Shannon Irish Pub",
            "caption-foto11": "Beatles One en el podcast \"Y la cosa fue así\"",
            "caption-instrumentos-1": "Paperback Writer set",
            "caption-instrumentos-2": "Equipamiento en Inmigrantes MVD",
            "caption-instrumentos-3": "Batería Ludwig en Q'Atrevido",
            "caption-instrumentos-4": "Full set en The Shannon Irish Pub",
            "caption-instrumentos-5": "Las Casinos de John",
            "caption-instrumentos-6": "Las Rickenbacker de John",
            "caption-instrumentos-7": "Los bajos de Paul",
            "caption-instrumentos-8": "Las guitarras de George",
            "galeria-eventos-privados": "Eventos Privados",
            "caption-evento1": "Cumpleaños n°80 de Jesús",
        },

        en: {
            "inicio": "Home",
            "nosotros": "About Us",
            "galeria": "Gallery",
            "shows": "Upcoming Gigs",
            "contacto": "Contact",
            "btn-proximo-show": "Next Show",
            "btn-ver-todos": "See all shows",
            "logo-sub": "The ultimate tribute to the Fab Four",
            "video-sub": "Beatles One at Bs As (2025) - Long Tall Sally",
            "youtube-titulo": "Our YouTube channel",
            "youtube-btn": "Visit channel",
            "youtube-desc": "Videos from our shows and rehearsals",
            "instagram-titulo": "Follow us on Instagram",
            "instagram-desc": "Photos, stories and band updates",
            "instagram-btn": "@beatles.one",
            "nosotros-titulo_1": "Beatles One",
            "nosotros-titulo_2": "A Beatles Tribute from Uruguay",
            "nosotros-piedefoto": "Beatles One performing at the 25th Beatleweek at The Cavern Club in Buenos Aires - 2025",
            "shows-titulo": "Upcoming Gigs",
            "shows-pasados-titulo": "Past Gigs",
            "no-shows-message": "No upcoming shows scheduled.",
            "contacto-titulo": "Get in touch",
            "label-reason": "Reason:",
            "opt-contrataciones": "Booking",
            "opt-consultas": "Inquiries",
            "opt-otros": "Other",
            "label-name": "Name:",
            "label-email": "Email:",
            "label-msg": "Message:",
            "btn-send": "Send",
            "confirmacion-msg": "Message sent successfully! We'll get back to you soon.",
            "piedepagina": "© 2026 - Beatles One - Beatles Tribute",
            "galeria-banda": "The Band",
            "galeria-instrumentos": "Instruments & Equipment",
            "caption-foto1": "Beatles One at Inmigrantes MVS",
            "caption-foto2": "Beatles One at La Vaca Azul",
            "caption-foto3": "Beatles One representing 🇺🇾 in Buenos Aires",
            "caption-foto4": "Beatles One",
            "caption-foto5": "Beatles One at Brickel",
            "caption-foto6": "Beatles One at The Shannon Irish Pub",
            "caption-foto7": "John and Ringo at La Piqué House",
            "caption-foto8": "Ringo with his Ludwig drum kit",
            "caption-foto9": "Paul and John",
            "caption-foto10": "George and John at The Shannon Irish Pub",
            "caption-foto11": "Beatles One at \"Y la cosa fue así\" podcast",
            "caption-instrumentos-1": "Paperback Writer set",
            "caption-instrumentos-2": "Backline at Inmigrantes MVD",
            "caption-instrumentos-3": "Ludwig drum kit at Q'Atrevido",
            "caption-instrumentos-4": "Full setup at The Shannon Irish Pub",
            "caption-instrumentos-5": "John's Casino guitars",
            "caption-instrumentos-6": "John's Rickenbacker guitars",
            "caption-instrumentos-7": "Paul's basses",
            "caption-instrumentos-8": "George's guitars",
            "galeria-eventos-privados": "Private Events",
            "caption-evento1": "Jesús' 80th Birthday",
        }
    };

    // Menú Hamburguesa

    const btnHamburguesa = document.getElementById("hamburger-btn");
    const menuNav = document.querySelector("nav");

    const cerrarHamburguesa = () => {
        btnHamburguesa.classList.remove("open");
        menuNav.classList.remove("open");
    };

    if (btnHamburguesa) {
        btnHamburguesa.addEventListener("click", () => {
            btnHamburguesa.classList.toggle("open");
            menuNav.classList.toggle("open");
        });
    }

    // Cerrar menú al hacer click fuera

    document.addEventListener("click", (e) => {
        if (!btnHamburguesa.contains(e.target) && !menuNav.contains(e.target)) {
            cerrarHamburguesa();
        }
    });

    // Lógica de Pestañas

    const enlacesNav = document.querySelectorAll("nav a");
    const secciones = document.querySelectorAll("main section");

    const irASeccion = (idDestino) => {
        secciones.forEach(s => s.classList.remove("active"));
        enlacesNav.forEach(l => l.classList.remove("active-link"));
        document.getElementById(idDestino).classList.add("active");
        const enlaceActivo = document.querySelector(`nav a[href="#${idDestino}"]`);
        if (enlaceActivo) enlaceActivo.classList.add("active-link");
    };

    enlacesNav.forEach(enlace => {
        enlace.addEventListener("click", (e) => {
            e.preventDefault();
            const idDestino = enlace.getAttribute("href").substring(1);
            irASeccion(idDestino);
            cerrarHamburguesa();
        });
    });

    // Lógica de Idiomas

    const cambiarIdioma = (idioma) => {
        document.querySelectorAll("[data-section]").forEach(el => {
            const clave = el.getAttribute("data-section");
            if (translations[idioma][clave]) {
                el.innerHTML = translations[idioma][clave];
            }
        });

        // Traducir placeholder del mensaje

        const mensajeTextarea = document.getElementById("mensaje");
        if (mensajeTextarea) {
            mensajeTextarea.placeholder = idioma === "es" ? "Dejanos tu mensaje" : "Leave us your message";
        }

        document.documentElement.lang = idioma;
        renderShows();
        actualizarFotoNosotros();
    };

    document.getElementById("btn-es").addEventListener("click", () => cambiarIdioma("es"));
    document.getElementById("btn-en").addEventListener("click", () => cambiarIdioma("en"));

    // Cargar shows desde Google Sheets

    const cargarShowsDesdeHoja = async () => {
        try {
            const respuesta = await fetch(SHEET_URL);
            const texto = await respuesta.text();

            const json = JSON.parse(texto.substring(47).slice(0, -2));
            const filas = json.table.rows;

            shows = filas.map(fila => {
                const celdas = fila.c;
                if (!celdas || !celdas[0] || !celdas[6] || celdas[6].v.toUpperCase() !== "SI") {
                    return null;
                }

                let fechaCruda = celdas[0].v;
                let fechaFinal;

                if (typeof fechaCruda === "string" && fechaCruda.includes("Date")) {
                    const d = fechaCruda.match(/\d+/g);
                    fechaFinal = new Date(d[0], d[1], d[2]);
                } else {
                    fechaFinal = new Date(fechaCruda);
                }

                return {
                    fechaObjeto: fechaFinal,
                    lugar: {
                        es: celdas[3] ? celdas[3].v : "",
                        en: celdas[4] ? celdas[4].v : ""
                    },
                    ciudad: celdas[5] ? celdas[5].v : ""
                };
            }).filter(show => show !== null);

            renderShows();

        } catch (error) {
            console.error("Error al cargar shows:", error);
        }
    };

    // Renderizar Shows

    const renderShows = () => {
        const listaProximos = document.querySelector("#lista-shows-proximos");
        const listaPasados = document.querySelector("#lista-shows-pasados");

        if (!listaProximos || !listaPasados) return;

        listaProximos.innerHTML = "";
        listaPasados.innerHTML = "";

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const idiomaActual = document.documentElement.lang || "es";

        const proximos = shows.filter(s => s.fechaObjeto >= hoy);
        const pasados = shows.filter(s => s.fechaObjeto < hoy);

        proximos.sort((a, b) => a.fechaObjeto - b.fechaObjeto);
        pasados.sort((a, b) => b.fechaObjeto - a.fechaObjeto);

        const crearLi = (show, esPasado) => {
            const li = document.createElement("li");

            const nombreDia = new Intl.DateTimeFormat(idiomaActual, { weekday: 'short' }).format(show.fechaObjeto);
            const numeroDia = new Intl.DateTimeFormat(idiomaActual, { day: '2-digit' }).format(show.fechaObjeto);
            const nombreMes = new Intl.DateTimeFormat(idiomaActual, { month: 'long' }).format(show.fechaObjeto);

            const lugarActual = show.lugar[idiomaActual] || show.lugar.es;
            const esEventoPrivado = lugarActual.toUpperCase().includes("PRIVADO") || lugarActual.toUpperCase().includes("PRIVATE");

            li.classList.add("show-card");
            if (esPasado) li.classList.add("pasado");

            // Mensaje de WhatsApp personalizado

            const mensajeWhatsApp = idiomaActual === "es"
                ? `Hola! Me interesa reservar para el show del ${numeroDia} de ${nombreMes} en ${lugarActual}`
                : `Hi! I'm interested in booking for the show on ${nombreMes} ${numeroDia} at ${lugarActual}`;

            const enlaceWhatsApp = `https://wa.me/59892660276?text=${encodeURIComponent(mensajeWhatsApp)}`;

            li.innerHTML = `
                <div class="show-date-box">
                    <span>${nombreDia.replace('.', '').toUpperCase()}</span>
                    <span class="date-day-num">${numeroDia}</span>
                    <span>${nombreMes.replace('.', '').toUpperCase()}</span>
                </div>

                <div class="show-content">
                    <div class="show-venue">${lugarActual}</div>
                    <div class="show-city">${show.ciudad}</div>
                </div>

                <div class="show-actions">
                    ${esPasado
                        ? ``
                        : (esEventoPrivado
                            ? ""
                            : `<a href="${enlaceWhatsApp}" target="_blank" class="btn-ticket btn-ticket-wpp-link" title="${idiomaActual === "es" ? "Reservar por WhatsApp" : "Book via WhatsApp"}"><i class="fab fa-whatsapp"></i></a>`
                          )
                    }
                </div>
            `;

            return li;
        };

        if (proximos.length === 0) {
            listaProximos.innerHTML = `<li>${translations[idiomaActual]["no-shows-message"]}</li>`;
        } else {
            proximos.forEach(s => listaProximos.appendChild(crearLi(s, false)));
        }

        pasados.forEach(s => listaPasados.appendChild(crearLi(s, true)));
    };

    // Click en logo: en mobile abre/cierra el menú, en desktop va a Inicio

const enlaceLogo = document.getElementById("logo-link");
if (enlaceLogo) {
    enlaceLogo.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        if (window.innerWidth <= 768) {
            btnHamburguesa.classList.toggle("open");
            menuNav.classList.toggle("open");
        } else {
            irASeccion("inicio");
        }
    });
}

    // Botón "Ver todos los shows" redirige a #shows

    const btnVerTodos = document.getElementById("btn-ver-todos");
    if (btnVerTodos) {
        btnVerTodos.addEventListener("click", (e) => {
            e.preventDefault();
            irASeccion("shows");
        });
    }

    // Carrusel de Fotos - Sección Nosotros

    const fotosNosotros = [
        {
            src: "assets/img/Beatles_One_Beatleweek.png",
            piedefoto: {
                es: "Beatles One participando de la 25ª Beatleweek en The Cavern Club de Bs As - 2025",
                en: "Beatles One performing at the 25th Beatleweek at The Cavern Club in Bs As - 2025"
            },
            sobre: {
                es: "Sobre Beatles One",
                en: "About Beatles One"
            },
            descripcion: {
                es: "Beatles One nace en Montevideo, fundada por Camilo Celi, ex integrante de Danger Four. El proyecto reúne talento nacional, músicos apasionados por estos clásicos atemporales que los interpretan con fidelidad en escenarios de todo Montevideo. Esa combinación de experiencia y compromiso artístico llevó a la banda a ser finalista de la 25ª edición de la BeatleWeek en The Cavern Club de Buenos Aires en 2025.",
                en: "Beatles One was founded in Montevideo by Camilo Celi, former member of Danger Four. The project brings together national talent, musicians passionate about these timeless classics who perform them faithfully on stages throughout Montevideo. This combination of experience and artistic commitment led the band to become finalists at the 25th edition of BeatleWeek at The Cavern Club Buenos Aires in 2025."
            }
        },
        {
            src: "assets/img/Camilo.jpg",
            piedefoto: {
                es: "Camilo Celi, fundador & líder de Beatles One",
                en: "Camilo Celi, founder and leader of Beatles One"
            },
            sobre: {
                es: "Sobre Camilo Celi",
                en: "About Camilo Celi"
            },
            descripcion: {
                es: "Camilo, fundador de Beatles One, con más de 20 años de trayectoria interpretando la obra de The Beatles, tiene como objetivo honrar a los cuatro de Liverpool con fidelidad, calidad musical y una puesta en escena a la altura de su legado.",
                en: "Camilo, founder of Beatles One, with over 20 years of experience performing the work of The Beatles, aims to honor the Fab Four with fidelity, musical quality, and a stage presence worthy of their legacy."
            },
        },
        {
            src: "assets/img/Coco&Camilo2.png",
            piedefoto: {
                es: "Krikor \"Coco\" Boudakian & Camilo Celi",
                en: "Krikor \"Coco\" Boudakian & Camilo Celi"
            },
            sobre: {
                es: "Siguiendo el Legado",
                en: "Following the Legacy"
            },
            descripcion: {
                es: "Camilo formó parte de Danger Four entre 2009 y 2017, trabajando codo a codo con Coco Boudakian, esta experiencia marcó su carrera, y hoy, Beatles One representa la continuación de ese aprendizaje, honrando el legado de Coco en su tierra natal, con el mismo compromiso y pasión por The Beatles.",
                en: "Camilo was part of Danger Four from 2009 to 2017, working closely with Coco Boudakian. This experience marked his career and today, Beatles One represents the continuation of that learning, honoring Coco's legacy in his homeland, with the same commitment and passion for The Beatles."
            }
        },
        {
            src: "assets/img/Rod_&_Tony.jpeg",
            piedefoto: {
                es: "Camilo con Rod Davis y Tony Bramwell, leyendas del la historia Beatle",
                en: "Camilo with Rod Davis and Tony Bramwell, legends of Beatle history"
            },
            sobre: {
                es: "Junto a Rod Davis & Tony Bramwell",
                en: "With Rod Davis & Tony Bramwell"
            },
            descripcion: {
                es: "En el 2018, Camilo tuvo el privilegio de conocer a Tony Bramwell, ex ejecutivo de Apple Corps y amigo de la infancia de los Beatles, en el Festival de Leyendas en Estepona, España. Luego en el 2019, también tuvo el honor de compartir escenario con Rod Davis, en Lost Lane, Dublin, Irlanda, quien fue miembro original de The Quarrymen, primer grupo formado por John Lennon.",
                en: "In 2018, Camilo had the privilege of meeting Tony Bramwell, former Apple Corps executive and childhood friend of the Beatles, at the Festival of Legends in Estepona, Spain. Then in 2019, Camilo had the honor of sharing the stage with Rod Davis, at Lost Lane in Dublin, Ireland, who was an original member of The Quarrymen, the first group formed by John Lennon."
            }
        },
    ];

    let indiceNosotros = 0;

    const fotoNosotros = document.getElementById("nosotros-foto");
    const piedeNosotros = document.getElementById("nosotros-piedefoto");
    const sobreNosotros = document.querySelector("[data-section='nosotros-sobre']");
    const descripcionNosotros = document.querySelector("[data-section='nosotros-descripcion']");

    const actualizarFotoNosotros = () => {
        const idioma = document.documentElement.lang || "es";
        const foto = fotosNosotros[indiceNosotros];
        fotoNosotros.src = foto.src;
        fotoNosotros.alt = foto.piedefoto.es;
        piedeNosotros.textContent = foto.piedefoto[idioma];
        if (sobreNosotros) sobreNosotros.textContent = foto.sobre[idioma];
        if (descripcionNosotros) descripcionNosotros.textContent = foto.descripcion[idioma];
    };

    document.getElementById("nosotros-prev").addEventListener("click", () => {
        indiceNosotros = (indiceNosotros - 1 + fotosNosotros.length) % fotosNosotros.length;
        actualizarFotoNosotros();
    });

    document.getElementById("nosotros-next").addEventListener("click", () => {
        indiceNosotros = (indiceNosotros + 1) % fotosNosotros.length;
        actualizarFotoNosotros();
    });

    // Carrusel de Videos

    const videoList = [
        { 
            id: "Y8B3lvZbFNI", 
            caption: { 
                es: "Beatles One en Bs As (2025) - Long Tall Sally", 
                en: "Beatles One at Bs As (2025) - Long Tall Sally" 
            } 
        },
        { 
            id: "VFZUN_kkXN4", 
            caption: { 
                es: "Beatles One en Bs As (2025) - Hey Jude", 
                en: "Beatles One at Bs As (2025) - Hey Jude" 
            } 
        },
        { 
            id: "a6QXL1KX8AA", 
            caption: { 
                es: "Beatles One en La Vaca Azul - I Wanna Be Your Man", 
                en: "Beatles One at La Vaca Azul - I Wanna Be Your Man" 
            } 
        }
    ];

    let currentVideoIndex = 0;
    const videoPlayer = document.getElementById("videoPlayer");
    const videoCaption = document.getElementById("videoCaption");

    const updateVideo = () => {
        const idiomaActual = document.documentElement.lang || "es";

        // Cambiamos el src del iframe con el ID de YouTube

        videoPlayer.src = `https://www.youtube.com/embed/${videoList[currentVideoIndex].id}?rel=0`;
        videoCaption.textContent = videoList[currentVideoIndex].caption[idiomaActual];
    };

    document.getElementById("nextBtn").addEventListener("click", () => {
        currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
        updateVideo();
    });

    document.getElementById("prevBtn").addEventListener("click", () => {
        currentVideoIndex = (currentVideoIndex - 1 + videoList.length) % videoList.length;
        updateVideo();
    });

    // Actualizar texto del video cuando se cambia el idioma

    document.getElementById("btn-es").addEventListener("click", updateVideo);
    document.getElementById("btn-en").addEventListener("click", updateVideo);

    // Formulario de Contacto

    const formulario = document.getElementById("contacto-formulario");
    const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");

    if (formulario) {
        formulario.addEventListener("submit", async (e) => {
            e.preventDefault();

            const datosFormulario = new FormData(formulario);

            try {
                const respuesta = await fetch(formulario.action, {
                    method: "POST",
                    body: datosFormulario,
                    headers: { 'Accept': 'application/json' }
                });

                if (respuesta.ok) {
                    formulario.reset();

                    if (mensajeConfirmacion) {
                        mensajeConfirmacion.style.display = "block";
                        mensajeConfirmacion.scrollIntoView({ behavior: "smooth" });

                        setTimeout(() => {
                            mensajeConfirmacion.style.display = "none";
                        }, 4000);
                    }

                    irASeccion("contacto");
                }

            } catch (error) {
                console.error("Error enviando formulario:", error);
            }
        });
    }

    // Lightbox de Galería

    const lightbox = document.getElementById("lightbox");
    const imagenLightbox = document.getElementById("lightbox-img");
    const epigrafeLightbox = document.getElementById("lightbox-caption");
    const cerrarLightbox_btn = document.getElementById("lightbox-close");
    const anteriorLightbox = document.getElementById("lightbox-prev");
    const siguienteLightbox = document.getElementById("lightbox-next");

    let galeriaImagenes = [];
    window._galeriaImagenes = galeriaImagenes;
    let indiceLightbox = 0;
    window._lightboxIndex = 0;

    const obtenerEpigrafeLightbox = (indice) => {
        const img = galeriaImagenes[indice];
        const idioma = document.documentElement.lang || "es";
        if (img.captionKey && translations[idioma][img.captionKey]) {
            return translations[idioma][img.captionKey];
        }
        return img.caption;
    };

    const abrirLightbox = (indice) => {
        indiceLightbox = indice;
        window._lightboxIndex = indice;
        imagenLightbox.src = galeriaImagenes[indice].src;
        imagenLightbox.alt = galeriaImagenes[indice].alt;
        epigrafeLightbox.textContent = obtenerEpigrafeLightbox(indice);
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const cerrarLightbox = () => {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    };

    const mostrarAnterior = () => {
        indiceLightbox = (indiceLightbox - 1 + galeriaImagenes.length) % galeriaImagenes.length;
        window._lightboxIndex = indiceLightbox;
        imagenLightbox.src = galeriaImagenes[indiceLightbox].src;
        epigrafeLightbox.textContent = obtenerEpigrafeLightbox(indiceLightbox);
    };

    const mostrarSiguiente = () => {
        indiceLightbox = (indiceLightbox + 1) % galeriaImagenes.length;
        window._lightboxIndex = indiceLightbox;
        imagenLightbox.src = galeriaImagenes[indiceLightbox].src;
        epigrafeLightbox.textContent = obtenerEpigrafeLightbox(indiceLightbox);
    };

    // Recolectamos todas las imágenes de la galería

    document.querySelectorAll(".galeria-grid img").forEach((img, i) => {
        galeriaImagenes.push({
            src: img.src,
            alt: img.alt,
            captionKey: img.getAttribute("data-caption-key") || null,
            caption: img.getAttribute("data-caption") || img.alt
        });

        img.addEventListener("click", () => abrirLightbox(i));
    });
    window._galeriaImagenes = galeriaImagenes;

    cerrarLightbox_btn.addEventListener("click", cerrarLightbox);
    anteriorLightbox.addEventListener("click", mostrarAnterior);
    siguienteLightbox.addEventListener("click", mostrarSiguiente);

    // Cerrar lightbox al hacer click fuera de la imagen

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) cerrarLightbox();
    });

    // Navegación con teclado en el lightbox

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape") cerrarLightbox();
        if (e.key === "ArrowLeft") mostrarAnterior();
        if (e.key === "ArrowRight") mostrarSiguiente();
    });

    // Inicialización

    cargarShowsDesdeHoja();
    actualizarFotoNosotros();

    const enlaceInicio = document.querySelector('nav a[href="#inicio"]');
    if (enlaceInicio) enlaceInicio.classList.add("active-link");

});