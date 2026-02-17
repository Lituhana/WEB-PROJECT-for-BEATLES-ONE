document.addEventListener("DOMContentLoaded", () => {

    // Traemos las fechas de los shows desde Google Sheets

    const SHEET_ID = "1kXIlcUHinT3hFVhNkGWnevTdXQsVr4iGHd-AAgf-xd4";
    const SHEET_NAME = "Hoja 1";
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

    let shows = [];

    // Traducciones al inglés

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
            "youtube-titulo": "Miranos en YouTube",
            "youtube-btn": "Ver canal",
            "youtube-desc": "Videos de nuestros shows y ensayos",
            "instagram-titulo": "Seguinos en Instagram",
            "instagram-desc": "Fotos, historias y novedades de la banda",
            "instagram-btn": "@beatles.one",
            "nosotros-titulo_1": "Beatles One",
            "nosotros-titulo_2": "El tributo a The Beatles de origen Uruguayo",
            "nosotros-piedefoto": "Beatles One participando de la 25° Beatleweek en The Cavern Club de Bs As - 2025",
            "nosotros-sobre": "Sobre Beatles One",
            "nosotros-subtitulo": "Beatles One nace en Montevideo, fundada por Camilo Celi, ex integrante de Danger Four, con más de 20 años de trayectoria interpretando la obra de The Beatles. Como creador y líder del proyecto, Camilo impulsa la banda con una visión clara: rendir homenaje al legado de Liverpool con respeto, calidad musical y una puesta en escena sólida.",
            "nosotros-descripcion": "El proyecto reúne talento nacional, músicos apasionados por estos clásicos atemporales que los interpretan con fidelidad en escenarios de todo Montevideo. Esa combinación de experiencia y compromiso artístico llevó a la banda a ser finalista de la 25ª edición de la BeatleWeek en The Cavern Club Buenos Aires en 2025.",
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
            "caption-foto2": "Beatles One La Vaca Azul",
            "caption-foto3": "Beatles One representando a 🇺🇾 en Buenos Aires",
            "caption-foto4": "Beatles One",
            "caption-foto5": "Beatles One en Brickel",
            "caption-foto6": "Beatles One en The Shannon Irish Pub",
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
            "youtube-titulo": "Watch us on YouTube",
            "youtube-btn": "Visit channel",
            "youtube-desc": "Videos from our shows and rehearsals",
            "instagram-titulo": "Follow us on Instagram",
            "instagram-desc": "Photos, stories and band updates",
            "instagram-btn": "@beatles.one",
            "nosotros-titulo_1": "Beatles One",
            "nosotros-titulo_2": "The Uruguayan Beatles Tribute Band",
            "nosotros-piedefoto": "Beatles One performing at the 25th Beatleweek at The Cavern Club in Buenos Aires - 2025",
            "nosotros-sobre": "About Beatles One",
            "nosotros-subtitulo": "Beatles One was founded in Montevideo by Camilo Celi, former member of Danger Four, with over 20 years of experience performing the music of The Beatles. As the creator and leader of the project, Camilo drives the band with a clear vision: to honor Liverpool's legacy with respect, musical excellence and a strong stage presence.",
            "nosotros-descripcion": "The project brings together national talent, musicians passionate about these timeless classics who perform them faithfully on stages throughout Montevideo. This combination of experience and artistic commitment led the band to become finalists at the 25th edition of BeatleWeek at The Cavern Club Buenos Aires in 2025.",
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
            "caption-foto1": "Beatles One at Inmigrantes MVD",
            "caption-foto2": "Beatles One at La Vaca Azul",
            "caption-foto3": "Beatles One representing 🇺🇾 in Buenos Aires",
            "caption-foto4": "Beatles One",
            "caption-foto5": "Beatles One at Brickel",
            "caption-foto6": "Beatles One at The Shannon Irish Pub",
        }
    };

    // Lógica de Pestañas

    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("main section");

    const goToSection = (targetId) => {
        sections.forEach(s => s.classList.remove("active"));
        navLinks.forEach(l => l.classList.remove("active-link"));
        document.getElementById(targetId).classList.add("active");
        const activeLink = document.querySelector(`nav a[href="#${targetId}"]`);
        if (activeLink) activeLink.classList.add("active-link");
    };

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            goToSection(targetId);
            // Cierra el menú hamburguesa al navegar en mobile
            closeHamburger();
        });
    });

    // Lógica de Idiomas

    const changeLanguage = (lang) => {
        document.querySelectorAll("[data-section]").forEach(el => {
            const key = el.getAttribute("data-section");
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Traducir placeholder del mensaje
        const mensajeTextarea = document.getElementById("mensaje");
        if (mensajeTextarea) {
            mensajeTextarea.placeholder = lang === "es" ? "Dejanos tu mensaje" : "Leave us your message";
        }

        document.documentElement.lang = lang;
        renderShows();
    };

    document.getElementById("btn-es").addEventListener("click", () => changeLanguage("es"));
    document.getElementById("btn-en").addEventListener("click", () => changeLanguage("en"));

    // Cargar shows desde Google Sheets

    const loadShowsFromSheet = async () => {
        try {
            const response = await fetch(SHEET_URL);
            const text = await response.text();

            const json = JSON.parse(text.substring(47).slice(0, -2));
            const rows = json.table.rows;

            shows = rows.map(row => {
                const cells = row.c;
                if (!cells || !cells[0] || !cells[6] || cells[6].v.toUpperCase() !== "SI") {
                    return null;
                }

                let rawDate = cells[0].v;
                let fechaFinal;

                if (typeof rawDate === "string" && rawDate.includes("Date")) {
                    const d = rawDate.match(/\d+/g);
                    fechaFinal = new Date(d[0], d[1], d[2]);
                } else {
                    fechaFinal = new Date(rawDate);
                }

                return {
                    fechaObjeto: fechaFinal,
                    lugar: {
                        es: cells[3] ? cells[3].v : "",
                        en: cells[4] ? cells[4].v : ""
                    },
                    ciudad: cells[5] ? cells[5].v : ""
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

            const dayName = new Intl.DateTimeFormat(idiomaActual, { weekday: 'short' }).format(show.fechaObjeto);
            const dayNum = new Intl.DateTimeFormat(idiomaActual, { day: '2-digit' }).format(show.fechaObjeto);
            const monthName = new Intl.DateTimeFormat(idiomaActual, { month: 'long' }).format(show.fechaObjeto);

            const lugarActual = show.lugar[idiomaActual] || show.lugar.es;
            const esEventoPrivado = lugarActual.toUpperCase().includes("PRIVADO") || lugarActual.toUpperCase().includes("PRIVATE");

            li.classList.add("show-card");
            if (esPasado) li.classList.add("pasado");

            // Mensaje de WhatsApp personalizado
            const mensajeWhatsApp = idiomaActual === "es"
                ? `Hola! Me interesa reservar para el show del ${dayNum} de ${monthName} en ${lugarActual}`
                : `Hi! I'm interested in booking for the show on ${monthName} ${dayNum} at ${lugarActual}`;

            const whatsappLink = `https://wa.me/59892660276?text=${encodeURIComponent(mensajeWhatsApp)}`;

            li.innerHTML = `
                <div class="show-date-box">
                    <span>${dayName.replace('.', '').toUpperCase()}</span>
                    <span class="date-day-num">${dayNum}</span>
                    <span>${monthName.replace('.', '').toUpperCase()}</span>
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
                            : `<a href="${whatsappLink}" target="_blank" class="btn-ticket">${idiomaActual === "es" ? "RESERVAR" : "TICKETS"}</a>`
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

    // Click en logo vuelve a Inicio

    const logoLink = document.getElementById("logo-link");
    if (logoLink) {
        logoLink.addEventListener("click", (e) => {
            e.preventDefault();
            goToSection("inicio");
        });
    }

    // Botón "Ver todos los shows" redirige a #shows

    const btnVerTodos = document.getElementById("btn-ver-todos");
    if (btnVerTodos) {
        btnVerTodos.addEventListener("click", (e) => {
            e.preventDefault();
            goToSection("shows");
        });
    }

    // Carrusel de Videos

    const videos = [
        {
            src: "assets/VIDEOS/Video_1.mp4",
            caption: {
                es: "Beatles One en Bs As (2025) - Long Tall Sally",
                en: "Beatles One at Bs As (2025) - Long Tall Sally"
            }
        },
        {
            src: "assets/VIDEOS/Video_2.mp4",
            caption: {
                es: "Beatles One en Bs As (2025) - Hey Jude",
                en: "Beatles One at Bs As (2025) - Hey Jude"
            }
        },
        {
            src: "assets/VIDEOS/Video_3.mp4",
            caption: {
                es: "Beatles One en La Vaca Azul (2025) - I wanna be your man",
                en: "Beatles One at La Vaca Azul (2025) - I wanna be your man"
            }
        }
    ];

    let currentVideoIndex = 0;

    const updateVideo = () => {
        const videoPlayer = document.getElementById("videoPlayer");
        const videoCaption = document.getElementById("videoCaption");
        const idiomaActual = document.documentElement.lang || "es";

        videoPlayer.src = videos[currentVideoIndex].src;
        videoCaption.textContent = videos[currentVideoIndex].caption[idiomaActual];
        videoPlayer.load();
    };

    document.getElementById("prevBtn").addEventListener("click", () => {
        currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
        updateVideo();
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        updateVideo();
    });

    // Formulario de Contacto

    const form = document.getElementById("contacto-formulario");
    const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.reset();

                    if (mensajeConfirmacion) {
                        mensajeConfirmacion.style.display = "block";
                        mensajeConfirmacion.scrollIntoView({ behavior: "smooth" });

                        setTimeout(() => {
                            mensajeConfirmacion.style.display = "none";
                        }, 4000);
                    }

                    // Nos aseguramos de que quede en la sección contacto
                    goToSection("contacto");
                }

            } catch (error) {
                console.error("Error enviando formulario:", error);
            }
        });
    }

    // Hamburger Menu

    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.querySelector("nav");

    const closeHamburger = () => {
        hamburgerBtn.classList.remove("open");
        navMenu.classList.remove("open");
    };

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", () => {
            hamburgerBtn.classList.toggle("open");
            navMenu.classList.toggle("open");
        });
    }

    // Cerrar menú al hacer click fuera
    document.addEventListener("click", (e) => {
        if (!hamburgerBtn.contains(e.target) && !navMenu.contains(e.target)) {
            closeHamburger();
        }
    });

    // Lightbox de Galería

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    let galeriaImagenes = [];
    window._galeriaImagenes = galeriaImagenes;
    let lightboxIndex = 0;
    window._lightboxIndex = 0;

    const getLightboxCaption = (index) => {
        const img = galeriaImagenes[index];
        const lang = document.documentElement.lang || "es";
        if (img.captionKey && translations[lang][img.captionKey]) {
            return translations[lang][img.captionKey];
        }
        return img.caption;
    };

    const openLightbox = (index) => {
        lightboxIndex = index;
        window._lightboxIndex = index;
        lightboxImg.src = galeriaImagenes[index].src;
        lightboxImg.alt = galeriaImagenes[index].alt;
        lightboxCaption.textContent = getLightboxCaption(index);
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    };

    const showPrev = () => {
        lightboxIndex = (lightboxIndex - 1 + galeriaImagenes.length) % galeriaImagenes.length;
        window._lightboxIndex = lightboxIndex;
        lightboxImg.src = galeriaImagenes[lightboxIndex].src;
        lightboxCaption.textContent = getLightboxCaption(lightboxIndex);
    };

    const showNext = () => {
        lightboxIndex = (lightboxIndex + 1) % galeriaImagenes.length;
        window._lightboxIndex = lightboxIndex;
        lightboxImg.src = galeriaImagenes[lightboxIndex].src;
        lightboxCaption.textContent = getLightboxCaption(lightboxIndex);
    };

    // Recolectamos todas las imágenes de la galería
    document.querySelectorAll(".galeria-grid img").forEach((img, i) => {
        galeriaImagenes.push({
            src: img.src,
            alt: img.alt,
            captionKey: img.getAttribute("data-caption-key") || null,
            caption: img.getAttribute("data-caption") || img.alt
        });

        img.addEventListener("click", () => openLightbox(i));
    });
    window._galeriaImagenes = galeriaImagenes;

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", showPrev);
    lightboxNext.addEventListener("click", showNext);

    // Cerrar lightbox al hacer click fuera de la imagen
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Navegación con teclado en el lightbox
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
    });

    // Inicialización

    loadShowsFromSheet();

    const homeLink = document.querySelector('nav a[href="#inicio"]');
    if (homeLink) homeLink.classList.add("active-link");

});