# Configurando el MCP Server 

## Instrucciones de instalacion 

**Response**

This instruction is asking you to set up Cursor → MCP → a tool so the AI can fetch/project files through a standard “tool” interface (MCP). The simplest option is filesystem, because it needs no GitHub token.

Step-by-step: install a filesystem MCP server (Cursor)
Ensure prerequisites

You need Node.js installed (so npx works). You already have it (you’re using node/npx in the project).
Create a project MCP config

Create this file in your repo:
.cursor/mcp.json

I added it for you here already:
.cursor/mcp.json

It configures the MCP server named filesystem using:

npx -y @modelcontextprotocol/server-filesystem C:\Palestra\taskflow-project

Restart Cursor

Close and reopen Cursor so it picks up the new MCP configuration.
Verify MCP is connected in Cursor

In Cursor: open Tools & MCP (sidebar) and confirm you see filesystem enabled.
If needed, toggle it on.
“At least five distinct queries” to test MCP
In Cursor, run queries that explicitly rely on MCP tool/file reading (for example by using the tool picker, or by selecting MCP filesystem tools if your UI has a tool list).

**Use these 5 prompts (each reads different parts of the app)**:

“Usando el servidor MCP filesystem, muestra el contenido de index.html y enumera los <script src=...> que conectan la app.”

“Usando MCP filesystem, lee src/js/storage.js y explica qué pasa cuando localStorage está bloqueado (try/catch).”

“Usando MCP filesystem, lee src/js/dom.js y lista todos los id que el código espera encontrar en el HTML.”

“Usando MCP filesystem, lee src/js/tasks_classic.js y resume las validaciones de createTask (mínimo de caracteres y regla de trabajo).”

“Usando MCP filesystem, lee src/js/main.js y explica cómo se conectan los eventos: botones de filtros, modal open/close y formulario quick-add.”

Documentation note (what to write in your report)

Mention that you configured .cursor/mcp.json

Mention you restarted Cursor

Mention you verified the filesystem MCP tool in Tools & MCP

Paste the 5 prompts + short outputs (or screenshots) from Cursor


## Instalado del FileSystem MCP Server dentro de la estrcutura del proyecto.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Palestra\\taskflow-project"
      ]
    }
  }
}
```
## Consulta sobre conocimiento del contexto del proyecto

**Query 1**

Prompt:
“Use the MCP filesystem to read index.html and tell me which scripts it loads at the end.”

Result:
The scripts from src/js were listed, along with the initialisation of window.TaskFlow.

**Query 2**
Prompt:
“Use the MCP filesystem to read src/js/storage.js and summarise the save/load logic.”

Result:
saveTasks() and loadTasks() were explained using localStorage, including error handling for storage lockouts.

**Query 3**
Prompt:
“Using the MCP filesystem, list the IDs expected by src/js/dom.js and verify that they exist in index.html.”

Result:
The required DOM elements (form, modal, stats, buttons, etc.) and their corresponding HTML elements were identified.

**Query 4**
Prompt:
“Using the MCP filesystem, review src/js/tasks_classic.js and list the validations for createTask.”

Result:
Validations for title length, job category with mandatory date, and duplicate checks were identified.

**Query 5**
Prompt:
“Use MCP filesystem to read src/js/main.js and explain the initialisation flow.”

Result:
window.TaskFlow.init(), event handling (filters, modal, quick form, dark mode) and initial task loading were described.

