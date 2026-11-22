# Carta en línea

Carta / menú digital con pedidos en línea.

## Empezar con el dev container
1. Instala **Docker Desktop** y **VS Code** con la extensión **Dev Containers**.
2. Crea la carpeta `.devcontainer` y copia ahí `docs/devcontainer.json` (mismo nombre).
   En PowerShell, desde esta carpeta:
   `mkdir .devcontainer; copy docs\devcontainer.json .devcontainer\`
3. Abre esta carpeta en VS Code → `Ctrl+Shift+P` → **Dev Containers: Reopen in Container**.
4. En la terminal del contenedor ejecuta `claude` e inicia sesión la primera vez
   (la sesión queda guardada en un volumen, no hay que repetirlo).

## Sin contenedor
Abre una terminal en esta carpeta y ejecuta `claude` (requiere Claude Code instalado).

El contexto del proyecto para Claude está en `CLAUDE.md`.

## Permisos de Claude Code (opcional)
`docs/claude-settings.json` trae permisos sugeridos (npm, git y bloqueo de lectura de `.env`).
Para activarlos: `mkdir .claude; copy docs\claude-settings.json .claude\settings.json`
