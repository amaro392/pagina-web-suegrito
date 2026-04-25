// ========== GOOGLE APPS SCRIPT - ENVIAR EMAILS POR GMAIL ==========
// Instrucciones:
// 1. Ve a https://script.google.com
// 2. Crea un nuevo proyecto
// 3. Copia este código completo
// 4. Guarda el proyecto
// 5. Haz clic en "Deploy" > "New deployment"
// 6. Selecciona "Web app"
// 7. En "Execute as" selecciona tu cuenta de Gmail
// 8. En "Who has access" selecciona "Anyone"
// 9. Copia la URL generada y úsala en el formulario
// 10. La URL será algo como: https://script.google.com/macros/d/{ID}/userweb?v=1

function doPost(e) {
  try {
    // Obtener parámetros del formulario
    const name = e.parameter.name || 'Sin nombre';
    const email = e.parameter.email || 'Sin email';
    const message = e.parameter.message || 'Sin mensaje';
    const subject = e.parameter.subject || 'Nuevo mensaje de contacto';

    // Email destino
    const toEmail = 'cvasquez7788@gmail.com';

    // Crear HTML del email bonito
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            }
            .header {
              background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
              color: white;
              padding: 40px 20px;
              text-align: center;
            }
            .header h1 {
              font-size: 28px;
              margin-bottom: 10px;
              font-weight: 700;
            }
            .header p {
              font-size: 14px;
              opacity: 0.95;
            }
            .content {
              padding: 40px;
            }
            .info-box {
              background: #f0f9ff;
              border-left: 4px solid #0ea5e9;
              padding: 15px;
              margin-bottom: 20px;
              border-radius: 4px;
            }
            .info-label {
              font-size: 12px;
              color: #0284c7;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .info-value {
              font-size: 16px;
              color: #1e293b;
              word-break: break-all;
            }
            .message-box {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 20px;
              margin: 30px 0;
              line-height: 1.6;
              color: #334155;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .footer {
              background: #f1f5f9;
              padding: 20px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
              font-size: 12px;
              color: #64748b;
            }
            .badge {
              display: inline-block;
              background: #10b981;
              color: white;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              margin-top: 10px;
            }
            a {
              color: #0ea5e9;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- HEADER -->
            <div class="header">
              <h1>📬 Nuevo Mensaje de Contacto</h1>
              <p>Cristian Aire - Aire Acondicionado</p>
            </div>

            <!-- CONTENT -->
            <div class="content">
              <!-- NOMBRE -->
              <div class="info-box">
                <div class="info-label">👤 Nombre del Remitente</div>
                <div class="info-value">${escapeHtml(name)}</div>
              </div>

              <!-- EMAIL -->
              <div class="info-box">
                <div class="info-label">📧 Correo Electrónico</div>
                <div class="info-value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
              </div>

              <!-- ASUNTO -->
              <div class="info-box">
                <div class="info-label">📌 Asunto</div>
                <div class="info-value">${escapeHtml(subject)}</div>
              </div>

              <!-- MENSAJE -->
              <div style="margin: 30px 0;">
                <div class="info-label" style="margin-bottom: 10px;">💬 Mensaje</div>
                <div class="message-box">${escapeHtml(message)}</div>
              </div>

              <!-- CALL TO ACTION -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${escapeHtml(email)}?subject=Re: ${escapeHtml(subject)}" style="display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; border-radius: 6px; font-weight: 600; text-decoration: none;">
                  ✉️ Responder al Cliente
                </a>
              </div>
            </div>

            <!-- FOOTER -->
            <div class="footer">
              <p><strong>Cristian Aire</strong></p>
              <p>Especialistas en Aire Acondicionado Automotriz</p>
              <p>📞 +56 9 5667 2657 | WhatsApp | Los Ángeles, Chile</p>
              <p style="margin-top: 10px; opacity: 0.7;">Este correo fue generado automáticamente desde tu sitio web</p>
              <span class="badge">✓ Verificado</span>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar email
    GmailApp.sendEmail(
      toEmail,
      `[Cristian Aire] ${subject}`,
      message, // Texto plano
      {
        htmlBody: htmlBody,
        replyTo: email, // El cliente puede responder directamente al remitente
        name: 'Cristian Aire - Contacto'
      }
    );

    // Respuesta exitosa
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'success',
        message: 'Email enviado correctamente'
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Respuesta de error
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'error',
        message: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Función para escapar HTML y evitar inyecciones
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Función para probar (ejecuta manualmente en Google Apps Script)
function testEmail() {
  const testData = {
    parameter: {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      subject: 'Consulta sobre reparación de AC',
      message: 'Hola, necesito reparar el aire acondicionado de mi vehículo. ¿Cuál es el costo aproximado?'
    }
  };
  doPost(testData);
}
