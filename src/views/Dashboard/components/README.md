# Dashboard Components Structure

Este directorio contiene todos los componentes modularizados del Dashboard, organizados por responsabilidad y reutilización.

## 📁 Estructura de Archivos

```
components/
├── index.ts                    # Barrel exports
├── types.ts                    # Interfaces y tipos TypeScript
├── useDashboardLogic.ts        # Hook principal con lógica del dashboard
├── usePreparedData.ts          # Hook para preparación de datos
├── StatCard.tsx                # Componente de tarjeta de estadística
├── ChartRenderer.tsx           # Renderizador genérico de gráficos
├── ChartCard.tsx              # Contenedor de gráfico con header
├── WeeklyTrendsChart.tsx      # Gráfico especializado de tendencias semanales
├── DashboardHeader.tsx        # Header con título y tarjetas de estadísticas
├── DashboardFilters.tsx       # Panel completo de filtros
└── ChartsGrid.tsx             # Grid con todos los gráficos
```

## 🧩 Componentes

### **Hooks Personalizados**

#### `useDashboardLogic.ts`
- **Propósito:** Centraliza toda la lógica del dashboard
- **Exporta:** Estados, setters, funciones de utilidad, datos calculados
- **Responsabilidades:**
  - Gestión de estados de filtros
  - Cálculo de años y centros disponibles
  - Funciones de filtrado y preparación de claves

#### `usePreparedData.ts`
- **Propósito:** Prepara y transforma datos para los gráficos
- **Exporta:** Datos formateados para clima, consumo, FCR y semanales
- **Responsabilidades:**
  - Transformación de datos crudos a formato de gráficos
  - Filtrado por centros y años
  - Generación de claves dinámicas para comparaciones

### **Componentes de UI**

#### `StatCard.tsx`
- **Propósito:** Tarjeta de estadística reutilizable
- **Props:** `title`, `value`, `gradient`
- **Uso:** Header del dashboard para mostrar promedios

#### `ChartRenderer.tsx`
- **Propósito:** Renderizador genérico de gráficos Recharts
- **Props:** `data`, `dataKeys`, `colors`, `chartType`
- **Soporta:** BarChart, LineChart, AreaChart

#### `ChartCard.tsx`
- **Propósito:** Contenedor estilizado para gráficos con header
- **Props:** `title`, `subtitle`, `data`, `dataKeys`, `colors`, `chartType`, `className`
- **Características:** Gradientes, responsive, altura mínima

#### `WeeklyTrendsChart.tsx`
- **Propósito:** Gráfico especializado para tendencias semanales
- **Props:** `data`
- **Características:** LineChart fijo, múltiples métricas

#### `DashboardHeader.tsx`
- **Propósito:** Header con título dinámico y tarjetas de estadísticas
- **Props:** `data`, `selectedCenters`, `compareCenters`
- **Características:** Título que cambia según modo de comparación

#### `DashboardFiltersPanel.tsx`
- **Propósito:** Panel completo de filtros interactivos
- **Props:** `filters`, `availableYears`, `availableCenters`, `setters`
- **Controles:**
  - Selección de años (checkboxes)
  - Selector de métrica (dropdown)
  - Tipo de gráfico (dropdown)
  - Modo comparación años (toggle)
  - Selector de centros (botones dinámicos)
  - Modo comparación centros (toggle)
  - Botones de acción (Todos/Limpiar)

#### `ChartsGrid.tsx`
- **Propósito:** Grid responsive con todos los gráficos
- **Props:** Todos los datos, filtros y funciones necesarias
- **Características:**
  - Grid responsive (1 col mobile, 2 cols desktop)
  - Renderizado condicional según métrica seleccionada
  - Gráfico unificado span 2 columnas

## 🔄 Flujo de Datos

```
Dashboard.tsx
    ↓
useDashboardLogic() ← useDashboard()
    ↓
usePreparedData() ← getFilteredDataForCenters()
    ↓
ChartsGrid + DashboardHeader + DashboardFiltersPanel
    ↓
ChartCard → ChartRenderer
```

## 🎯 Beneficios de la Modularización

### **Reutilización**
- `StatCard`: Se puede usar en cualquier parte de la aplicación
- `ChartRenderer`: Genérico para todos los tipos de gráficos
- `ChartCard`: Contenedor estándar para gráficos

### **Mantenibilidad**
- Cada componente tiene una responsabilidad específica
- Fácil de encontrar y modificar funcionalidades específicas
- Separación clara entre lógica y presentación

### **Escalabilidad**
- Fácil agregar nuevos tipos de gráficos
- Nuevos filtros se agregan en un solo lugar
- Nuevas métricas solo requieren cambios en los hooks

### **Testing**
- Cada componente se puede testear independientemente
- Hooks de lógica aislados para unit tests
- Componentes de UI para integration tests

## 🚀 Uso

```typescript
import { 
  DashboardHeader, 
  DashboardFiltersPanel, 
  ChartsGrid,
  useDashboardLogic,
  usePreparedData
} from './components';

// En Dashboard.tsx - Uso simple y limpio
const Dashboard = () => {
  const logic = useDashboardLogic();
  const data = usePreparedData(/* ... */);
  
  return (
    <div>
      <DashboardHeader {...headerProps} />
      <DashboardFiltersPanel {...filterProps} />
      <ChartsGrid {...gridProps} />
    </div>
  );
};
```

## 📋 Próximas Mejoras

1. **Lazy Loading:** Cargar gráficos solo cuando sean visibles
2. **Memoización:** React.memo en componentes que no cambian frecuentemente
3. **Error Boundaries:** Manejo de errores por componente
4. **Loading States:** Estados de carga para cada gráfico
5. **Export Functions:** Funcionalidad para exportar gráficos
6. **Theme System:** Soporte para temas claro/oscuro
