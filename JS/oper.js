/* =====================================================
   oper.js - Funcionalidad del sitio RDR2
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ================================
    // 1. BOTÓN "VER MÁS INFO" (index.html)
    // ================================
    const btnInfo = document.getElementById('btnInfo');
    const infoExtra = document.getElementById('infoExtra');

    if (btnInfo && infoExtra) {
        btnInfo.addEventListener('click', () => {
            infoExtra.classList.toggle('mostrar');

            if (infoExtra.classList.contains('mostrar')) {
                btnInfo.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Ocultar info';
            } else {
                btnInfo.innerHTML = '<i class="fa-solid fa-circle-info"></i> Ver más info';
            }
        });
    }

    // ================================
    // 2. MODAL DE PERSONAJES (personajes.html)
    // ================================
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
                }
            });
        });

        // Cerrar modal con la X
        if (cerrarModal) {
            cerrarModal.addEventListener('click', () => {
                modal.classList.remove('activo');
            });
        }

        // Cerrar modal al hacer clic fuera del contenido
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('activo');
            }
        });
    }

    // ================================
    // 3. LIGHTBOX DE GALERÍA (galeria.html)
    // ================================
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
            });
        });

        // Cerrar con la X
        if (cerrarLightbox) {
            cerrarLightbox.addEventListener('click', () => {
                lightbox.classList.remove('activo');
            });
        }

        // Cerrar al hacer clic fuera de la imagen
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('activo');
            }
        });

        // Cerrar con la tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                lightbox.classList.remove('activo');
                if (modal) modal.classList.remove('activo');
            }
        });
    }

});