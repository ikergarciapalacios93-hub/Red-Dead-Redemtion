/* =====================================================
   oper.js - Interactividad y animaciones del sitio RDR2
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. REVELAR ELEMENTOS AL HACER SCROLL (IntersectionObserver)
    // ============================================================
    const elementosRevelar = document.querySelectorAll('.revelar');

    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada, i) => {
            if (entrada.isIntersecting) {
                // Retardo escalonado para efecto cascada
                setTimeout(() => {
                    entrada.target.classList.add('activo');
                }, i * 120);
                observer.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    elementosRevelar.forEach(el => observer.observe(el));

    // ============================================================
    // 2. BOTÓN "VER MÁS INFO" (index.html)
    // ============================================================
    const btnInfo = document.getElementById('btnInfo');
    const infoExtra = document.getElementById('infoExtra');

    if (btnInfo && infoExtra) {
        btnInfo.addEventListener('click', () => {
            infoExtra.classList.toggle('mostrar');

            if (infoExtra.classList.contains('mostrar')) {
                btnInfo.textContent = 'Ocultar info';
                // Scroll suave hacia la info
                setTimeout(() => {
                    infoExtra.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 200);
            } else {
                btnInfo.textContent = 'Ver más info';
            }
        });
    }

    // ============================================================
    // 3. CONTADORES ANIMADOS (index.html)
    // ============================================================
    const contadores = document.querySelectorAll('.numero');

    const animarContador = (el) => {
        const objetivo = parseInt(el.dataset.target);
        const duracion = 2000;
        const inicio = performance.now();

        const paso = (ahora) => {
            const progreso = Math.min((ahora - inicio) / duracion, 1);
            // Easing out cubic para suavizar
            const easeOut = 1 - Math.pow(1 - progreso, 3);
            const valor = Math.floor(easeOut * objetivo);
            el.textContent = valor;

            if (progreso < 1) {
                requestAnimationFrame(paso);
            } else {
                el.textContent = objetivo;
                // Animación de "pop" final
                el.style.transition = 'transform 0.3s ease';
                el.style.transform = 'scale(1.2)';
                setTimeout(() => el.style.transform = 'scale(1)', 300);
            }
        };

        requestAnimationFrame(paso);
    };

    if (contadores.length > 0) {
        const obsContadores = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    animarContador(entrada.target);
                    obsContadores.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.5 });

        contadores.forEach(c => obsContadores.observe(c));
    }

    // ============================================================
    // 4. MODAL DE PERSONAJES (personajes.html)
    // ============================================================
    const datosPersonajes = {
        arthur: {
            titulo: 'Arthur Morgan',
            texto: 'Protagonista de RDR2. Un forajido veterano, leal a Dutch, que comienza a cuestionar el rumbo de la banda. Su historia es un viaje de redención en el ocaso del Salvaje Oeste.'
        },
        dutch: {
            titulo: 'Dutch van der Linde',
            texto: 'El carismático y visionario líder de la banda. Cree en la libertad y en vivir fuera del sistema, pero su idealismo se transforma lentamente en paranoia y violencia.'
        },
        john: {
            titulo: 'John Marston',
            texto: 'Miembro de la banda y protagonista del primer Red Dead Redemption. En RDR2 lo vemos como un hombre joven que intenta ser buen padre y esposo mientras sigue siendo un forajido.'
        },
        sadie: {
            titulo: 'Sadie Adler',
            texto: 'Una viuda que pierde todo a manos de una banda rival y se une al grupo de Dutch. Se convierte en una de las pistoleras más letales y decididas de la historia.'
        }
    };

    const botonesVer = document.querySelectorAll('.btn-ver');
    const modal = document.getElementById('modal');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalTexto = document.getElementById('modalTexto');
    const cerrarModal = document.getElementById('cerrarModal');

    if (botonesVer.length > 0 && modal) {
        botonesVer.forEach(boton => {
            boton.addEventListener('click', () => {
                const card = boton.closest('.personaje');
                const clave = card.dataset.personaje;
                const info = datosPersonajes[clave];

                if (info) {
                    modalTitulo.textContent = info.titulo;
                    modalTexto.textContent = info.texto;
                    modal.classList.add('activo');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const cerrarTodo = () => {
            modal.classList.remove('activo');
            document.body.style.overflow = '';
        };

        if (cerrarModal) cerrarModal.addEventListener('click', cerrarTodo);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarTodo();
        });
    }

    // ============================================================
    // 5. LIGHTBOX DE GALERÍA (galeria.html)
    // ============================================================
    const imagenesGaleria = document.querySelectorAll('.galeria-img');
    const lightbox = document.getElementById('lightbox');
    const imgAmpliada = document.getElementById('imgAmpliada');
    const cerrarLightbox = document.getElementById('cerrarLightbox');

    if (imagenesGaleria.length > 0 && lightbox) {
        imagenesGaleria.forEach(img => {
            img.addEventListener('click', () => {
                imgAmpliada.src = img.src;
                imgAmpliada.alt = img.alt;
                lightbox.classList.add('activo');
                document.body.style.overflow = 'hidden';
            });
        });

        const cerrarLightboxFn = () => {
            lightbox.classList.remove('activo');
            document.body.style.overflow = '';
        };

        if (cerrarLightbox) cerrarLightbox.addEventListener('click', cerrarLightboxFn);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) cerrarLightboxFn();
        });
    }

    // ============================================================
    // 6. CERRAR CON TECLA ESC
    // ============================================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal) modal.classList.remove('activo');
            if (lightbox) lightbox.classList.remove('activo');
            document.body.style.overflow = '';
        }
    });

    // ============================================================
    // 7. PARALLAX SUAVE EN EL HERO
    // ============================================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (y < window.innerHeight) {
                hero.style.backgroundPositionY = `${y * 0.4}px`;
            }
        });
    }

    // ============================================================
    // 8. EFECTO DE ONDA EN TODOS LOS BOTONES
    // ============================================================
    document.querySelectorAll('.btn, .btn-ver').forEach(boton => {
        boton.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const onda = document.createElement('span');
            const tamaño = Math.max(rect.width, rect.height);
            onda.style.width = onda.style.height = tamaño + 'px';
            onda.style.left = (e.clientX - rect.left - tamaño / 2) + 'px';
            onda.style.top = (e.clientY - rect.top - tamaño / 2) + 'px';
            onda.style.position = 'absolute';
            onda.style.borderRadius = '50%';
            onda.style.background = 'rgba(255,255,255,0.4)';
            onda.style.transform = 'scale(0)';
            onda.style.pointerEvents = 'none';
            onda.style.transition = 'transform 0.6s ease, opacity 0.6s ease';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(onda);

            requestAnimationFrame(() => {
                onda.style.transform = 'scale(2.5)';
                onda.style.opacity = '0';
            });

            setTimeout(() => onda.remove(), 650);
        });
    });

});