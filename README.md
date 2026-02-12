# Ronda 📄 PRIMER ENTREGA — RONDA
Nombre del producto

RONDA
Plataforma de continuidad para talleres presenciales.

Descripción del problema

En la mayoría de los talleres presenciales (clubes de lectura, círculos culturales, espacios de reflexión), la experiencia se vive intensamente durante el encuentro físico, pero se diluye entre una sesión y otra.

Sin embargo, los talleres no se construyen solo en el momento presencial.
Se construyen también en lo que ocurre entre encuentros.

Cuando los encuentros son semanales o mensuales, el intervalo es clave:

Surgen nuevas ideas.

Aparecen reflexiones tardías.

Se recomiendan lecturas.

Se resignifican conceptos trabajados.

Hoy esa continuidad suele dispersarse en WhatsApp, notas personales o recuerdos aislados. No queda registro estructurado ni memoria colectiva.

A la vez, cada vez más personas buscan volver a habitar espacios presenciales y humanos. La continuidad fortalece ese sentido de comunidad y enriquece lo que ocurre cara a cara.

RONDA nace para resolver ese vacío.

No es una app de gestión de eventos.
No es un LMS.
No es una red social.

Es memoria estructurada + continuidad comunitaria.

Permite:

Preparar el próximo encuentro.

Registrar lo trabajado.

Continuar la conversación.

Construir un archivo vivo del grupo.

Dar herramientas de seguimiento a quien facilita.

Usuario objetivo
Participante

Persona que asiste al taller y desea:

Prepararse antes del encuentro.

Confirmar asistencia.

Continuar reflexionando.

Acceder al archivo de encuentros anteriores.

Sentir pertenencia a una comunidad.

Facilitadora

Persona que coordina el taller y necesita:

Crear encuentros.

Registrar bitácoras.

Ver asistencia.

Sostener continuidad.

Construir memoria editorial del proceso del grupo.

Flujo principal (MVP)

Usuario accede a la app.

Selecciona rol (simulado).

Ingresa a Home.

Visualiza próximo encuentro.

Confirma asistencia (si es participante).

Accede a detalle de encuentro.

Publica reflexión.

Estado se mantiene al recargar (persistencia local).

Para la facilitadora:

Login simulado.

Crear nuevo encuentro.

Verlo publicado en Home.

Visualizar asistencia y comentarios.

Features incluidas en esta versión

Login simulado por rol.

Render condicional por estado del encuentro (programado / finalizado).

Confirmación de asistencia (toggle).

Contador de asistentes.

Publicación de comentarios.

Persistencia en localStorage.

Creación de nuevos encuentros.

Estructura editorial estandarizada en encuentros finalizados.

Navegación por rol.

Responsive completo (mobile + desktop).

Menú hamburguesa en mobile.

Deploy público en Vercel.

Stack y herramientas utilizadas
Definición de producto

ChatGPT (definición MVP, reglas, alcance).

Validación conceptual paralela con Claude.

Diseño UI

Generación inicial mediante prompts en Stitch.

Refinamiento visual en Figma (jerarquía, ritmo editorial, estructura).

Iteraciones basadas en referencia estética externa.

Implementación Frontend

Google AI Studio (vibe coding iterativo).

Múltiples refinamientos:

Corrección de bugs de estado.

Persistencia.

Edición post-evento.

Render condicional por estado.

Corrección de duplicaciones.

Responsive mobile.

Navegación diferenciada por rol.

Versionado y Deploy

GitHub (repositorio).

Vercel (deploy público).

Estado actual del MVP

Esta versión corresponde a la Fase 1 del roadmap:

Frontend completamente funcional con persistencia local.

Permite:

Autenticación simulada.

Acción principal operativa.

Persistencia entre sesiones.

Flujo end-to-end funcional.

Pendiente (Fase 2):

Supabase (Auth real).

Base de datos persistente real.

Reglas de negocio en backend.

RLS y permisos reales.

Link al producto

[https://ronda-kjycuhqlp-carolina-andradas-projects.vercel.app](https://ronda-kjycuhqlp-carolina-andradas-projects.vercel.app/#/login)

Link al video demo

https://drive.google.com/drive/folders/1Yx4TneeIH-imbokLW9W1OCQv3ebacute?usp=sharing 
