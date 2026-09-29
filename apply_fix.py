import re

path = "productos.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old = """    <div class="gallery-grid product-gallery">
      <div class="gal-item" data-fullsrc="assets/ac-escotilla-04.jpg" aria-label="Galería: Unidad interior equipo A/C escotilla desempacada">
        <img src="assets/ac-escotilla-04.jpg" alt="Unidad interior equipo A/C escotilla desempacada, cableado y conectores" loading="lazy" class="gal-img">
        <div class="gal-overlay"></div>
      </div>
      <div class="gal-item" data-fullsrc="assets/ac-escotilla-05.jpg" aria-label="Galería: Equipo A/C escotilla ACTECmax vista superior">
        <img src="assets/ac-escotilla-05.jpg" alt="Equipo A/C escotilla ACTECmax, vista superior" loading="lazy" class="gal-img">
        <div class="gal-overlay"></div>
      </div>
      <div class="gal-item" data-fullsrc="assets/ac-escotilla-06.jpg" aria-label="Galería: Equipo A/C escotilla ACTECmax vista frontal">
        <img src="assets/ac-escotilla-06.jpg" alt="Equipo A/C escotilla ACTECmax, vista frontal" loading="lazy" class="gal-img">
        <div class="gal-overlay"></div>
      </div>
      <div class="gal-item" data-fullsrc="assets/ac-escotilla-03.jpg" aria-label="Galería: Parámetros técnicos equipo A/C escotilla">
        <img src="assets/ac-escotilla-03.jpg" alt="Parámetros técnicos equipo A/C escotilla" loading="lazy" class="gal-img">
        <div class="gal-overlay"></div>
      </div>
    </div>"""

new = """    <div class="gallery-grid product-gallery">
      <div class="gal-item" data-fullsrc="assets/ac-escotilla-06.jpg" aria-label="Galería: Equipo A/C escotilla ACTECmax vista frontal">
        <img src="assets/ac-escotilla-06.jpg" alt="Equipo A/C escotilla ACTECmax, vista frontal" loading="lazy" class="gal-img">
        <div class="gal-overlay"></div>
      </div>
      <div class="gal-item" data-fullsrc="assets/ac-escotilla-04.jpg" aria-label="Galería: Unidad interior equipo A/C escotilla desempacada">
        <img src="assets/ac-escotilla-04.jpg" alt="Unidad interior equipo A/C escotilla desempacada, cableado y conectores" loading="lazy" class="gal-img">
        <div class="gal-overlay"></div>
      </div>
      <div class="gal-item" data-fullsrc="assets/ac-escotilla-05.jpg" aria-label="Galería: Equipo A/C escotilla ACTECmax vista superior">
        <img src="assets/ac-escotilla-05.jpg" alt="Equipo A/C escotilla ACTECmax, vista superior" loading="lazy" class="gal-img">
        <div class="gal-overlay"></div>
      </div>
      <div class="gal-item" data-fullsrc="assets/ac-escotilla-08.jpg" aria-label="Galería: Accesorios y manual del equipo A/C escotilla">
        <img src="assets/ac-escotilla-08.jpg" alt="Accesorios incluidos: manguera, control remoto, perfiles y manual del equipo A/C escotilla" loading="lazy" class="gal-img">
        <div class="gal-overlay"></div>
      </div>
      <div class="gal-item" data-fullsrc="assets/ac-escotilla-03.jpg" aria-label="Galería: Parámetros técnicos equipo A/C escotilla">
        <img src="assets/ac-escotilla-03.jpg" alt="Parámetros técnicos equipo A/C escotilla" loading="lazy" class="gal-img">
        <div class="gal-overlay"></div>
      </div>
    </div>"""

if old not in content:
    print("AVISO: no se encontro el bloque original. No se modifico nada.")
else:
    content = content.replace(old, new)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Listo: galeria de la escotilla actualizada en productos.html")
