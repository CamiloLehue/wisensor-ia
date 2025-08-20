# Migración del Dashboard de Años a Ciclos

## Resumen de Cambios

Se ha migrado completamente la lógica del dashboard para trabajar con **ciclos** en lugar de años, adaptándose al nuevo formato de datos del backend donde cada ciclo puede tener entre 12 y 18 meses.

## Archivos Modificados

### 1. Tipos de Datos (`types/DashboardType.ts`)
- ✅ Actualizado `Ciclos.fecha_inicio` y `Ciclos.fecha_termino` de `Date` a `string`
- ✅ Estructura mantiene compatibilidad con el nuevo formato JSON

### 2. Lógica Principal (`components/useDashboardLogic.ts`)
- ✅ Cambio de `selectedYears: number[]` a `selectedCiclos: string[]`
- ✅ Nuevo estado `compareCiclos: boolean` para comparar múltiples ciclos
- ✅ Función `availableCiclos` que extrae los ciclos únicos de los datos
- ✅ Actualización de `getDataKeys()` para generar claves basadas en ciclos
- ✅ Datos de respaldo actualizados con IDs de ciclo reales

### 3. Preparación de Datos (`components/usePreparedData.ts`)
- ✅ Lógica completamente reescrita para trabajar con el nuevo formato
- ✅ Obtención dinámica de meses únicos de cada ciclo (soporta 12-18 meses)
- ✅ Uso de `resumen_mensual` del nuevo formato de datos
- ✅ Generación de claves dinámicas: `temp_I23F24`, `consumo_I23F24`, etc.

### 4. Panel de Filtros (`components/DashboardFilters.tsx`)
- ✅ Reorganización de la interfaz: **Centro** primero, luego **Ciclos**
- ✅ Nuevo selector de ciclos con checkboxes
- ✅ Opción "Comparar Ciclos" para múltiples selecciones
- ✅ Interfaz más intuitiva siguiendo el flujo: Centro → Ciclo → Configuración

### 5. Grilla de Gráficos (`components/ChartsGrid.tsx`)
- ✅ Cambio de `selectedYears: number[]` a `selectedYears: string[]`
- ✅ Actualización de etiquetas: "Años" → "Ciclos" en todos los subtítulos
- ✅ Soporte completo para IDs de ciclo como strings

### 6. Componente Principal (`DashboardNew.tsx`)
- ✅ Integración con las nuevas propiedades del hook
- ✅ Paso de `availableCiclos` en lugar de `availableYears`
- ✅ Actualización de parámetros en `usePreparedData`

### 7. Servicio de Datos (`services/dashboardService.ts`)
- ✅ Datos mock actualizados con el formato real del backend
- ✅ Estructura completa con 2 centros y diferentes ciclos
- ✅ Datos reales simulados para pruebas

## Nuevas Funcionalidades

### 🎯 Flujo de Selección Mejorado
1. **Seleccionar Centro**: Primero se elige el centro acuícola
2. **Seleccionar Ciclo**: Luego se elige el ciclo específico de ese centro
3. **Configurar Visualización**: Métricas, tipo de gráfico, comparaciones

### 📊 Soporte de Ciclos Variables
- ✅ Ciclos de 12-18 meses soportados automáticamente
- ✅ Visualización dinámica de todos los meses del ciclo
- ✅ Etiquetas de meses correctas (Ene, Feb, Mar, etc.)

### 🔄 Comparación de Ciclos
- ✅ Comparar múltiples ciclos del mismo centro
- ✅ Comparar diferentes centros y sus ciclos
- ✅ Leyendas dinámicas: `temp_I23F24`, `fcr_I24F25`, etc.

## Estructura de Datos Soportada

```json
{
  "nombreCentro": "Centro Acuícola A",
  "ciclos": {
    "id_ciclo": "I23F24",
    "fecha_inicio": "2023-04-08",
    "fecha_termino": "2024-01-15",
    "meses": [
      {
        "idMes": 4,
        "datos": {
          "consumo_alimentos": { "2023-04-08": 50, ... },
          "fcr": { "2023-04-08": 0.98, ... },
          "peso_promedio": { "2023-04-08": 344, ... },
          "clima": { "2023-04-08": { "temperatura": 10.11, "precipitacion": 0 }, ... },
          "resumen_mensual": {
            "consumoTotal": 497485,
            "fcrPromedio": 0.88,
            "pesoPromedio": 347.6,
            "temperaturaPromedio": 11.18,
            "precipitacionTotal": 160.12
          }
        }
      }
    ],
    "resumen_ciclo": { ... }
  },
  "semanales": { ... },
  "promedios": { ... }
}
```

## Cómo Usar

1. **Desarrollo**: El servidor está corriendo en `http://localhost:5174/`
2. **Navegación**: Ir a la sección Dashboard
3. **Selección**: 
   - Elegir centro en el primer dropdown
   - Elegir ciclo(s) en el segundo dropdown
   - Configurar métricas y tipo de gráfico
4. **Visualización**: Los gráficos mostrarán todos los meses del ciclo seleccionado

## Próximos Pasos

1. **Conectar API Real**: Cambiar el servicio para usar el endpoint real del backend
2. **Optimizaciones**: Implementar cache y loading states
3. **Validaciones**: Agregar validaciones de datos y manejo de errores
4. **Tests**: Crear tests unitarios para las nuevas funcionalidades

---

✅ **Estado**: Migración completada y funcional  
🎯 **Objetivo**: Dashboard totalmente adaptado al formato de ciclos del backend  
📅 **Fecha**: $(date)
