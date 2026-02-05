# 💰 CobraYa - Sistema de Recordatorios de Cobro WhatsApp

Una aplicación web moderna para gestionar recordatorios de cobro y enviarlos directamente por WhatsApp.

![CobraYa](https://img.shields.io/badge/React-18.2-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## 🚀 Características

- ✅ **Gestión de clientes** con datos de contacto y cobros pendientes
- 📲 **Envío directo a WhatsApp** con un solo clic
- 📝 **Plantillas predefinidas** de mensajes (cortés, recordatorio, urgente)
- 🔄 **Variables personalizables** que se reemplazan automáticamente
- 📊 **Historial de envíos** para hacer seguimiento
- ✅ **Marcar como pagado** cuando el cliente cancele
- 💾 **Persistencia local** con localStorage
- 📱 **Diseño responsive** para móvil y escritorio

## 📦 Instalación

### Prerrequisitos
- Node.js 16+ instalado
- npm o yarn

### Pasos

1. **Clonar o descargar** el proyecto

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Estructura del Proyecto

```
cobraya-app/
├── public/              # Archivos estáticos
├── src/
│   ├── App.jsx         # Componente principal
│   ├── App.css         # Estilos globales
│   └── main.jsx        # Punto de entrada
├── index.html          # HTML principal
├── package.json        # Dependencias
├── vite.config.js      # Configuración de Vite
└── README.md          # Este archivo
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea la versión de producción
- `npm run preview` - Vista previa de la build de producción

## 🌐 Desplegar en Producción

### Vercel (Recomendado)

1. Crea una cuenta en [vercel.com](https://vercel.com)
2. Instala Vercel CLI:
```bash
npm i -g vercel
```
3. Desde la carpeta del proyecto:
```bash
npm run build
vercel --prod
```

### Netlify

1. Crea una cuenta en [netlify.com](https://netlify.com)
2. Arrastra la carpeta `dist` después de hacer `npm run build`
3. O conecta tu repositorio de GitHub

### GitHub Pages

1. Instala gh-pages:
```bash
npm install gh-pages --save-dev
```

2. Agrega en `package.json`:
```json
"homepage": "https://tuusuario.github.io/cobraya-app",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Despliega:
```bash
npm run deploy
```

## 💡 Uso

1. **Agregar Cliente:**
   - Completa el formulario con los datos del cliente
   - Selecciona una plantilla de mensaje
   - El teléfono debe incluir código de país (ej: 573001234567)
   - Click en "Agregar Cliente"

2. **Enviar Recordatorio:**
   - Click en "📲 Enviar Recordatorio" en la tarjeta del cliente
   - Se abrirá WhatsApp Web con el mensaje personalizado
   - Se registrará el envío en el historial

3. **Marcar como Pagado:**
   - Click en "✅ Marcar como Pagado" cuando el cliente pague
   - El cliente se marcará visualmente como pagado

4. **Ver Historial:**
   - Click en "👁️ Ver Historial" para ver todos los envíos realizados

## 🎨 Personalización

### Colores
Edita `src/App.css` para cambiar los colores:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Plantillas de Mensajes
Edita las plantillas en `src/App.jsx`:
```javascript
const plantillas = {
  cortés: "Tu mensaje aquí...",
  // ...
};
```

## 📱 SEO y Google

Para que tu app aparezca en Google:

1. **Agrega meta tags** (ya incluidos en `index.html`)
2. **Crea un sitemap.xml** en `public/`
3. **Agrega Google Analytics** si lo necesitas
4. **Envía a Google Search Console** después del despliegue

## 🐛 Solución de Problemas

### La app no carga
- Verifica que Node.js esté instalado: `node --version`
- Elimina `node_modules` y reinstala: `rm -rf node_modules && npm install`

### WhatsApp no abre
- Verifica que el número tenga formato correcto (código país + número)
- Ejemplo: 573001234567 (Colombia)

### Los datos no se guardan
- Verifica que el navegador permita localStorage
- No uses modo incógnito

## 📄 Licencia

MIT License - Libre para uso personal y comercial

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 💬 Soporte

Si tienes preguntas o problemas:
- Abre un issue en GitHub
- Contacta al desarrollador

---

**¡Hecho con ❤️ para facilitar los cobros!**
