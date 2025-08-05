// Script para probar la conexión a la API
const testApiConnection = async () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  
  console.log('🔍 Probando conexión a la API...');
  console.log('URL de la API:', apiUrl);
  
  try {
    // Probar endpoint de login
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@wisensor.com',
        password: 'admin123'
      })
    });
    
    console.log('📡 Status de la respuesta:', response.status);
    console.log('📡 Headers de la respuesta:', response.headers);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Login exitoso:', data);
    } else {
      const errorData = await response.json();
      console.log('❌ Error en login:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:', error);
  }
};

// Exportar para uso en componentes
export default testApiConnection;

// Ejecutar si se llama directamente
if (typeof window !== 'undefined') {
  // Solo ejecutar en el navegador
  testApiConnection();
} 