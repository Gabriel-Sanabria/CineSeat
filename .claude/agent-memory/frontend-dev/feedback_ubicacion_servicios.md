---
name: feedback-ubicacion-servicios
description: Los servicios Angular van en services/, no en core/
metadata:
  type: feedback
---

Los servicios del cliente Angular se ubican en `src/app/services/`, no en `src/app/core/`.

**Why:** La carpeta `core/` mencionada en la skill de convenciones no refleja la estructura real del proyecto; la carpeta de servicios ya existente es `services/`.

**How to apply:** Siempre que se genere un nuevo servicio con el CLI, apuntar a `services/<nombre>` en lugar de `core/<nombre>`.
