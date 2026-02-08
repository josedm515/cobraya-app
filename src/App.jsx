import { useState, useEffect } from 'react'
import './App.css'

// Plantillas de mensajes predefinidas
const plantillas = {
  cortés: `Hola {nombre}! 👋

Espero que estés muy bien. Te escribo para recordarte que tenemos pendiente el pago de {monto} por {concepto}.

La fecha acordada es {fecha}. ¿Podrías confirmarme cuándo podrías realizar el pago?

¡Gracias! 😊`,
  
  recordatorio: `Hola {nombre}! 🙂

Te recuerdo amablemente que el pago de {monto} por {concepto} vence el {fecha}.

¿Necesitas alguna información adicional para procesar el pago?

Quedo atento. ¡Saludos!`,
  
  urgente: `Hola {nombre},

Noto que el pago de {monto} por {concepto} venció el {fecha} y aún no lo he recibido.

¿Hay algún inconveniente? Me gustaría resolverlo lo antes posible.

Quedo pendiente de tu respuesta. Gracias.`
};

function App() {
  // Estados del formulario
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState('cortés');
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [concepto, setConcepto] = useState('');
  const [mensaje, setMensaje] = useState(plantillas.cortés);
  
  // Estado de clientes
  const [clientes, setClientes] = useState([]);
  
  // Estados para historial expandido
  const [historialExpandido, setHistorialExpandido] = useState({});

  // Cargar clientes del localStorage al iniciar
  useEffect(() => {
    const clientesGuardados = localStorage.getItem('clientes');
    if (clientesGuardados) {
      const clientesParsed = JSON.parse(clientesGuardados);
      // Migrar clientes antiguos si no tienen los campos nuevos
      const clientesMigrados = clientesParsed.map(c => ({
        ...c,
        enviados: c.enviados || 0,
        historial: c.historial || [],
        pagado: c.pagado || false
      }));
      setClientes(clientesMigrados);
    }
  }, []);

  // Guardar clientes en localStorage cuando cambien
  useEffect(() => {
    if (clientes.length > 0) {
      localStorage.setItem('clientes', JSON.stringify(clientes));
    }
  }, [clientes]);

  // Actualizar mensaje cuando cambia la plantilla
  const handlePlantillaChange = (nuevaPlantilla) => {
    setPlantillaSeleccionada(nuevaPlantilla);
    setMensaje(plantillas[nuevaPlantilla]);
  };

  // Generar preview del mensaje
  const generarPreview = () => {
    return mensaje
      .replace(/{nombre}/g, nombre || '{nombre}')
      .replace(/{monto}/g, monto || '{monto}')
      .replace(/{fecha}/g, fecha || '{fecha}')
      .replace(/{concepto}/g, concepto || '{concepto}');
  };

  // Agregar nuevo cliente
  const agregarCliente = (e) => {
    e.preventDefault();
    
    if (!telefono || !nombre || !monto) {
      alert('Por favor completa al menos teléfono, nombre y monto');
      return;
    }
    
    const nuevoCliente = {
      id: Date.now(),
      telefono,
      nombre,
      monto,
      fecha,
      concepto,
      mensaje,
      enviados: 0,
      historial: [],
      pagado: false
    };
    
    setClientes([...clientes, nuevoCliente]);
    
    // Limpiar formulario
    setTelefono('');
    setNombre('');
    setMonto('');
    setFecha('');
    setConcepto('');
    setMensaje(plantillas[plantillaSeleccionada]);
  };

  // Enviar mensaje por WhatsApp
  const enviarWhatsApp = (id) => {
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return;
    
    const mensajePersonalizado = cliente.mensaje
      .replace(/{nombre}/g, cliente.nombre)
      .replace(/{monto}/g, cliente.monto)
      .replace(/{fecha}/g, cliente.fecha)
      .replace(/{concepto}/g, cliente.concepto);
    
    const mensajeCodificado = encodeURIComponent(mensajePersonalizado);
    const url = `https://wa.me/${cliente.telefono}?text=${mensajeCodificado}`;
    
    // Registrar el envío
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-ES');
    const hora = ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    
    const clientesActualizados = clientes.map(c => {
      if (c.id === id) {
        return {
          ...c,
          enviados: c.enviados + 1,
          historial: [
            { fecha, hora, timestamp: ahora.getTime() },
            ...c.historial
          ]
        };
      }
      return c;
    });
    
    setClientes(clientesActualizados);
    
    // Abrir WhatsApp
    window.open(url, '_blank');
  };

  // Eliminar cliente
  const eliminarCliente = (id) => {
    if (confirm('¿Seguro que quieres eliminar este cliente?')) {
      setClientes(clientes.filter(c => c.id !== id));
      if (clientes.filter(c => c.id !== id).length === 0) {
        localStorage.removeItem('clientes');
      }
    }
  };

  // Marcar como pagado
  const marcarPagado = (id) => {
    setClientes(clientes.map(c => 
      c.id === id ? { ...c, pagado: true } : c
    ));
  };

  // Desmarcar pagado
  const desmarcarPagado = (id) => {
    setClientes(clientes.map(c => 
      c.id === id ? { ...c, pagado: false } : c
    ));
  };

  // Toggle historial
  const toggleHistorial = (id) => {
    setHistorialExpandido(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="container">
      <h1>💰 CobraYa</h1>
      <p className="subtitle">Gestiona tus recordatorios de cobro por WhatsApp</p>
      
      <div className="alerta">
        ℹ️ Tip: Usa las variables {'{nombre}'}, {'{monto}'}, {'{fecha}'}, {'{concepto}'} en tu mensaje y se reemplazarán automáticamente
      </div>

      <form onSubmit={agregarCliente}>
        <div className="form-group">
          <label htmlFor="telefono">📱 Teléfono (con código de país, ej: 573001234567)</label>
          <input 
            type="tel" 
            id="telefono" 
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="573001234567" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="nombre">👤 Nombre del Cliente</label>
          <input 
            type="text" 
            id="nombre" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Juan Pérez" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="monto">💵 Monto a Cobrar</label>
          <input 
            type="text" 
            id="monto" 
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="$500,000 COP" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="fecha">📅 Fecha de Vencimiento</label>
          <input 
            type="date" 
            id="fecha" 
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="concepto">📝 Concepto del Cobro</label>
          <input 
            type="text" 
            id="concepto" 
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            placeholder="Servicio de consultoría" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="plantilla">📝 Plantilla de Mensaje</label>
          <select 
            id="plantilla" 
            value={plantillaSeleccionada}
            onChange={(e) => handlePlantillaChange(e.target.value)}
          >
            <option value="cortés">Cortés y Amable</option>
            <option value="recordatorio">Recordatorio Estándar</option>
            <option value="urgente">Urgente (Vencido)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">✉️ Mensaje Personalizado</label>
          <textarea 
            id="mensaje" 
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <div className="variables">
            💡 Variables disponibles: {'{nombre}'}, {'{monto}'}, {'{fecha}'}, {'{concepto}'}
          </div>
        </div>

        <div className="mensaje-preview">
          <h4>👁️ Vista Previa del Mensaje:</h4>
          <pre>{generarPreview()}</pre>
        </div>

        <button type="submit" className="btn">
          ➕ Agregar Cliente
        </button>
      </form>

      <div className="clientes-list">
        <h2 style={{ marginTop: '40px', color: '#333', marginBottom: '20px' }}>
          📋 Clientes Pendientes
        </h2>
        
        {clientes.length === 0 ? (
          <p style={{ color: '#999', marginTop: '10px' }}>
            No hay clientes agregados aún
          </p>
        ) : (
          clientes.map(cliente => (
            <div 
              key={cliente.id} 
              className={`cliente-card ${cliente.pagado ? 'estado-pagado' : ''}`}
            >
              <h3>
                {cliente.nombre}
                {cliente.pagado && (
                  <span className="tag-pagado">✅ PAGADO</span>
                )}
                {cliente.enviados > 0 && (
                  <span className="badge-enviados">
                    📤 {cliente.enviados} recordatorio{cliente.enviados > 1 ? 's' : ''} enviado{cliente.enviados > 1 ? 's' : ''}
                  </span>
                )}
              </h3>
              <p><strong>📱 Teléfono:</strong> +{cliente.telefono}</p>
              <p><strong>💵 Monto:</strong> {cliente.monto}</p>
              <p><strong>📅 Vencimiento:</strong> {cliente.fecha}</p>
              <p><strong>📝 Concepto:</strong> {cliente.concepto}</p>
              
              <div style={{ marginTop: '10px' }}>
                {!cliente.pagado && (
                  <button 
                    className="btn-enviar" 
                    onClick={() => enviarWhatsApp(cliente.id)}
                  >
                    📲 Enviar Recordatorio
                  </button>
                )}
                
                <button 
                  className="btn-marcar-pagado" 
                  onClick={() => cliente.pagado ? desmarcarPagado(cliente.id) : marcarPagado(cliente.id)}
                >
                  {cliente.pagado ? '↩️ Desmarcar Pagado' : '✅ Marcar como Pagado'}
                </button>
                
                <button 
                  className="btn-eliminar" 
                  onClick={() => eliminarCliente(cliente.id)}
                >
                  🗑️ Eliminar
                </button>
                
                {cliente.historial && cliente.historial.length > 0 && (
                  <>
                    <button 
                      className="toggle-historial" 
                      onClick={() => toggleHistorial(cliente.id)}
                    >
                      👁️ {historialExpandido[cliente.id] ? 'Ocultar' : 'Ver'} Historial
                    </button>
                    
                    {historialExpandido[cliente.id] && (
                      <div className="historial">
                        <strong>📋 Historial de Envíos:</strong>
                        {cliente.historial.map((h, idx) => (
                          <div key={idx} className="historial-item">
                            🕐 {h.fecha} - {h.hora}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App