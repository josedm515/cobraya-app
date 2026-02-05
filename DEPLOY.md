# 🚀 Guía de Despliegue - CobraYa

## Opción 1: Vercel (MÁS FÁCIL Y RECOMENDADA)

### Método A: Desde la interfaz web (Sin instalar nada)

1. **Sube tu código a GitHub**
   - Crea un repositorio en GitHub
   - Sube todos los archivos de `cobraya-app`

2. **Conecta con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "Sign Up" y usa tu cuenta de GitHub
   - Clic en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite
   - Clic en "Deploy"

3. **¡Listo!**
   - En 2-3 minutos tendrás tu URL: `https://tu-proyecto.vercel.app`
   - Cada vez que hagas push a GitHub, se actualizará automáticamente

### Método B: Desde la terminal

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Desde la carpeta cobraya-app
cd cobraya-app

# 3. Login en Vercel
vercel login

# 4. Desplegar
vercel

# 5. Para producción
vercel --prod
```

---

## Opción 2: Netlify

### Método A: Drag & Drop

1. **Construir el proyecto**
```bash
npm run build
```

2. **Ir a Netlify**
   - Ve a [netlify.com](https://netlify.com)
   - Crea una cuenta gratis
   - Arrastra la carpeta `dist` a la interfaz de Netlify

3. **¡Listo!**
   - URL: `https://tu-proyecto.netlify.app`

### Método B: Desde GitHub

1. Sube tu código a GitHub
2. En Netlify: "New site from Git"
3. Conecta tu repositorio
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy

---

## Opción 3: GitHub Pages

```bash
# 1. Instalar gh-pages
npm install gh-pages --save-dev

# 2. Editar package.json, agregar:
{
  "homepage": "https://tuusuario.github.io/cobraya-app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# 3. Editar vite.config.js, agregar:
export default defineConfig({
  base: '/cobraya-app/',  // nombre de tu repo
  plugins: [react()],
})

# 4. Desplegar
npm run deploy

# 5. En GitHub, ve a Settings > Pages
# Selecciona branch "gh-pages" y guarda
```

---

## Opción 4: Servidor Propio (VPS)

### Requisitos
- Un servidor con Node.js
- Dominio (opcional)

### Pasos

```bash
# 1. En tu servidor
sudo apt update
sudo apt install nodejs npm nginx

# 2. Clonar o subir archivos
git clone tu-repositorio.git
cd cobraya-app

# 3. Instalar dependencias
npm install

# 4. Construir
npm run build

# 5. Configurar Nginx
sudo nano /etc/nginx/sites-available/cobraya

# Pegar esta configuración:
server {
    listen 80;
    server_name tudominio.com;
    
    root /ruta/a/cobraya-app/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# 6. Activar sitio
sudo ln -s /etc/nginx/sites-available/cobraya /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 📊 Después del Despliegue

### 1. Actualizar URLs en los archivos

En `public/sitemap.xml`:
```xml
<loc>https://tu-url-real.com/</loc>
```

En `public/robots.txt`:
```
Sitemap: https://tu-url-real.com/sitemap.xml
```

### 2. Configurar Google Search Console

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega tu propiedad (URL del sitio)
3. Verifica la propiedad
4. Envía el sitemap: `https://tu-url.com/sitemap.xml`

### 3. (Opcional) Agregar Analytics

En `index.html`, antes de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎯 URLs de Ejemplo de Proyectos Desplegados

- Vercel: `https://cobraya-app.vercel.app`
- Netlify: `https://cobraya-app.netlify.app`
- GitHub Pages: `https://usuario.github.io/cobraya-app`

---

## 🐛 Solución de Problemas Comunes

### "404 Not Found" al recargar página
Solución: Configurar rewrites. En Vercel esto se hace automáticamente.

Para Netlify, crea `public/_redirects`:
```
/* /index.html 200
```

### Error de build
```bash
# Limpieza completa
rm -rf node_modules package-lock.json
npm install
npm run build
```

### La app funciona local pero no en producción
- Verifica la consola del navegador (F12)
- Revisa logs de build en tu plataforma
- Asegúrate que las rutas sean relativas

---

## 📝 Checklist Pre-Despliegue

- [ ] `npm run build` funciona sin errores
- [ ] Probaste la preview: `npm run preview`
- [ ] Actualizaste el README con tu URL
- [ ] Configuraste variables de entorno si las hay
- [ ] Verificaste que todas las rutas sean relativas
- [ ] Los meta tags están correctos en `index.html`

---

## 💰 Costos

- **Vercel**: Gratis para proyectos personales
- **Netlify**: Gratis (100GB/mes)
- **GitHub Pages**: Gratis
- **VPS**: Desde $5/mes (DigitalOcean, Linode, etc.)

---

**¡Tu app estará online en minutos! 🚀**

¿Preguntas? Revisa la documentación oficial de cada plataforma.
