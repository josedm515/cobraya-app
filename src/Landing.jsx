import { useState } from 'react'
import './Landing.css'

function Landing({ onIniciar }) {
  return (
    <div className="landing">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <div className="hero-badge">💰 Gestión de Cobranza Inteligente</div>
          <h1 className="hero-title">
            Cobra más rápido con <span className="gradient-text">recordatorios automáticos</span> por WhatsApp
          </h1>
          <p className="hero-subtitle">
            Deja de perseguir a tus clientes. CobraMatic te ayuda a gestionar cobros pendientes y enviar recordatorios profesionales en segundos.
          </p>
          
          <div className="hero-cta">
            <button className="btn-primary" onClick={onIniciar}>
              🚀 Empezar Gratis
            </button>
            <div className="hero-stats">
              <span>✅ Sin tarjeta de crédito</span>
              <span>⚡ Listo en 2 minutos</span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="social-proof">
            <div className="proof-item">
              <div className="proof-number">35%</div>
              <div className="proof-text">menos morosidad</div>
            </div>
            <div className="proof-item">
              <div className="proof-number">2x</div>
              <div className="proof-text">más rápido cobrar</div>
            </div>
            <div className="proof-item">
              <div className="proof-number">100%</div>
              <div className="proof-text">gratis para empezar</div>
            </div>
          </div>
        </div>

        {/* App Preview */}
        <div className="hero-image">
          <div className="app-preview">
            <div className="preview-header">
              <div className="preview-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="preview-title">CobraMatic Dashboard</div>
            </div>
            <div className="preview-body">
              <div className="preview-metric">
                <span className="metric-icon">👥</span>
                <div className="metric-info">
                  <div className="metric-value">12</div>
                  <div className="metric-label">Clientes</div>
                </div>
              </div>
              <div className="preview-metric">
                <span className="metric-icon">💵</span>
                <div className="metric-info">
                  <div className="metric-value">$8.5M</div>
                  <div className="metric-label">Por Cobrar</div>
                </div>
              </div>
              <div className="preview-metric alert">
                <span className="metric-icon">⚠️</span>
                <div className="metric-info">
                  <div className="metric-value">3</div>
                  <div className="metric-label">Vencidos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="section-header">
          <h2>Todo lo que necesitas para cobrar mejor</h2>
          <p>Herramientas profesionales en una interfaz simple</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📲</div>
            <h3>Envío por WhatsApp</h3>
            <p>Envía recordatorios directamente a WhatsApp con un clic. Mensajes personalizados y profesionales.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Dashboard en Tiempo Real</h3>
            <p>Ve cuánto dinero tienes pendiente, quiénes deben y qué cobros están vencidos.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Plantillas Listas</h3>
            <p>Mensajes pre-diseñados para recordatorios corteses, estándar o urgentes.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Seguimiento Automático</h3>
            <p>Controla fechas de vencimiento y recibe alertas de pagos retrasados.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Historial Completo</h3>
            <p>Registra todos los recordatorios enviados. Nunca pierdas el control.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">☁️</div>
            <h3>En la Nube</h3>
            <p>Accede desde cualquier dispositivo. Tus datos siempre seguros y sincronizados.</p>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="how-it-works">
        <div className="section-header">
          <h2>Cómo funciona</h2>
          <p>En 3 pasos simples empieza a cobrar mejor</p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Agrega tus clientes</h3>
              <p>Ingresa nombre, monto, fecha y concepto del cobro. Toma solo 30 segundos.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Personaliza el mensaje</h3>
              <p>Elige una plantilla o escribe tu propio mensaje. Las variables se reemplazan automáticamente.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Envía por WhatsApp</h3>
              <p>Un clic y listo. El mensaje se abre en WhatsApp listo para enviar. Automático y profesional.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>¿Listo para cobrar más rápido?</h2>
          <p>Empieza gratis hoy. Sin tarjeta de crédito. Sin complicaciones.</p>
          <button className="btn-primary-large" onClick={onIniciar}>
            🚀 Empezar Ahora
          </button>
          <div className="cta-note">
            ✅ Configuración instantánea · ⚡ Sin instalación · 💾 Gratis para siempre
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>CobraMatic © 2026 · Gestiona tus cobros de forma inteligente</p>
      </footer>
    </div>
  );
}

export default Landing;