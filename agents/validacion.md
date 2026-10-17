# Validación

**TLDR:** Escapa nombre y mensaje, acepta solo color `#RRGGBB`, y no conviertas un script en imagen ni video.

`libs/unalib.js` es el límite de seguridad. `is_valid_url_image` e `is_valid_yt_video` prueban el argumento URL, no `phone`, y la expresión debe cubrir la cadena completa.

`validateMessage` escapa `nombre` y `mensaje`. `color` solo puede ser `#RRGGBB`; si no lo es, usa `#000000`. Un payload con `<script>`, `javascript:`, `onerror` u otra marca HTML no se convierte en `<img>` ni `<iframe>`.

No cambies el evento `Evento-Mensaje-Server` ni la forma del JSON `{ nombre, mensaje, color }`.
