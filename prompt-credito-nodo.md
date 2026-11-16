# Prompt: crédito Estudio Nodo en footer (variante texto simple)

Reutilizable para cualquier proyecto de cliente. Pegar en la sesión de Claude Code que tiene abierto el repo del sitio destino.

---

Agregá al footer del sitio un crédito de desarrollo que enlace a Estudio Nodo (estudionodo.tech). Es un link de texto simple, sin ícono, integrado a la línea de copyright existente del footer.

Estructura HTML:

```html
<a class="credito" href="https://estudionodo.tech" target="_blank" rel="noopener">
  Sitio desarrollado por <span class="credito__brand">Estudio Nodo</span>
</a>
```

Ubicalo junto al `©` / línea de derechos del footer (mismo bloque, no una sección aparte).

CSS de referencia (adaptá los valores a los tokens/variables de color y tipografía que ya usa este proyecto, no importes fuentes nuevas):

```css
.credito {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--muted-color, #6b6b7a); /* usar el color "muted" del footer actual */
  text-decoration: none;
}
.credito__brand {
  font-weight: 600;
  background: linear-gradient(135deg, #3B5BFD, #8B3FFD);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.credito:hover .credito__brand {
  text-decoration: underline;
  text-decoration-color: #8B3FFD;
}
```

Mantené el tamaño de fuente discreto (no debe competir visualmente con el contenido del cliente) y asegurate de que el gradiente se vea bien tanto en footers claros como oscuros, según el tema del sitio.

**Nota:** `--muted-color` es un placeholder — reemplazalo por la variable real de color secundario que tenga ese footer, o pedile a Claude que la busque en el CSS del proyecto.
