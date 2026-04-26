# TODO: Corregir botón de horario de atención en móvil

## Estado: ✅ COMPLETADO

## Problema
El bloque de "Horario de atención" dentro de `.contact-buttons-row` no se veía completo en teléfono porque la grilla usaba `repeat(4, 1fr)`, dándole solo el 25% del ancho a cada elemento.

## Cambios aplicados (styles.css)

1. **En `@media (max-width: 768px)`:**
   - `.contact-buttons-row` cambiado a `grid-template-columns: repeat(2, 1fr)`
   - El horario de atención ahora ocupa 50% del ancho en lugar de 25%
   - Ajustados paddings y tamaños de fuente específicamente para `.contact-buttons-row .contact-row`

2. **En `@media (max-width: 480px)`:**
   - `.contact-buttons-row` cambiado a `grid-template-columns: repeat(2, 1fr)`
   - Ajustados paddings reducidos y tamaños de imagen/icono para pantallas muy pequeñas
   - Corregida llave de cierre faltante que generaba error CSS

## Archivo editado
- `styles.css`

