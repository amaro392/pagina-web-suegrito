# ✅ Configuración de Gmail API con Google Apps Script

## 📝 Instrucciones Paso a Paso

### **Paso 1: Crear el Google Apps Script**

1. Ve a [script.google.com](https://script.google.com)
2. Haz clic en **"New project"** (Nuevo proyecto)
3. Dale un nombre: `Cristian Aire - Email API`
4. En el editor, **borra todo** el código que viene por defecto
5. **Copia TODO el contenido** del archivo `google-apps-script.gs` (de este repositorio)
6. **Pega el código** en el editor de Google Apps Script
7. Haz clic en **"Save"** (Guardar)

---

### **Paso 2: Desplegar como Web App**

1. En Google Apps Script, haz clic en **"Deploy"** (en la esquina superior derecha)
2. Selecciona **"New deployment"** (Nueva implementación)
3. Haz clic en el icono de **"⚙️ Select type"** y elige **"Web app"**
4. Configura:
   - **Execute as**: Selecciona tu cuenta de Gmail (cvasquez7788@gmail.com)
   - **Who has access**: Selecciona **"Anyone"**
5. Haz clic en **"Deploy"**
6. Se abrirá un modal - copia la **URL** que aparece (algo como):
   ```
   https://script.google.com/macros/d/1xxxxxxxxxxxxxxxxxxxxxxxxxxx/userweb
   ```

---

### **Paso 3: Configurar la URL en tu sitio web**

1. Abre el archivo `script.js` en tu editor de código
2. Busca esta línea (alrededor de la línea 40):
   ```javascript
   const GMAIL_API_ENDPOINT = 'https://script.google.com/macros/d/TU_SCRIPT_ID/userweb';
   ```
3. **Reemplaza** `TU_SCRIPT_ID` con tu URL completa:
   ```javascript
   const GMAIL_API_ENDPOINT = 'https://script.google.com/macros/d/1xxxxxxxxxxxxxxxxxxxxxxxxxxx/userweb';
   ```
4. **Guarda** el archivo
5. ¡Listo! 🎉

---

## 📧 ¿Qué sucede cuando alguien envía el formulario?

1. **El usuario completa el formulario** con:
   - Nombre
   - Email
   - Asunto (opcional)
   - Mensaje

2. **Se envía a Gmail** con:
   - Un email **HTML bonito y profesional**
   - Incluye el nombre, email y mensaje del usuario
   - Se recibe en `cvasquez7788@gmail.com`
   - El remitente es el email del usuario (puedes responder directamente)

3. **El usuario ve un mensaje de confirmación**:
   - ✅ Si se envió correctamente: "¡Mensaje enviado correctamente!"
   - ❌ Si hay error: "Error al enviar"

---

## 🔒 Seguridad

✅ **Validaciones**:
- Se validan todos los campos en el frontend
- Se escapa HTML para evitar inyecciones
- Hay protección anti-spam con honeypot

---

## 🧪 Probar (Opcional)

En Google Apps Script, puedes probar el script:
1. En el editor, busca la función `testEmail()`
2. Selecciónala en el dropdown de funciones (arriba)
3. Haz clic en **"Run"** (Ejecutar)
4. Deberías recibir un email de prueba en `cvasquez7788@gmail.com`

---

## ❌ Solución de Problemas

### **No recibo emails**
- Verifica que la URL esté correctamente copiada en `script.js`
- Asegúrate de que el Google Apps Script se deployó como "Web app"
- Verifica que el email destino sea correcto en el script

### **El sitio web muestra error**
- Abre la consola del navegador (F12)
- Verifica si hay mensajes de error
- Asegúrate de que la URL de Gmail API está correctamente configurada

### **El email no tiene los estilos (se ve feo)**
- Algunos clientes de email no soportan CSS. Gmail sí lo soporta.
- El contenido siempre es legible, aunque los estilos no se apliquen completamente.

---

## 📞 Detalles de la Integración

- **Email destino**: `cvasquez7788@gmail.com`
- **Remitente**: El email del usuario (permite respuesta directa)
- **Asunto**: `[Cristian Aire] + Asunto del mensaje`
- **Formato**: HTML con estilos profesionales + texto plano
- **Honeypot**: Previene bots automáticos

---

## 🚀 URL Importante

Guarda tu URL de Google Apps Script en un lugar seguro:
```
https://script.google.com/macros/d/TU_ID_AQUI/userweb
```

Si la pierdes, puedes recuperarla:
1. Ve a [script.google.com](https://script.google.com)
2. Abre tu proyecto
3. Haz clic en **Deployments** (Implementaciones)
4. Copia la URL de la web app que creaste
