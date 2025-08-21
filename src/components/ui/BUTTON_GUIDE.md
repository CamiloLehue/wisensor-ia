# Advanced Button System

Este sistema de botones proporciona una colección completa de componentes de botones con animaciones avanzadas y múltiples variantes.

## Uso Básico

```tsx
import { AdvancedButton } from '../components/ui/AdvancedButton';

// Botón básico
<AdvancedButton>Click me</AdvancedButton>

// Botón con variante y tamaño
<AdvancedButton variant="success" size="large">
  Save Changes
</AdvancedButton>
```

## Variantes Disponibles

### Principales
- `default` - Botón blanco estándar
- `solid` - Botón azul sólido  
- `border` - Botón con borde azul
- `ghost` - Botón transparente con borde sutil

### Semánticas
- `success` - Verde para acciones positivas
- `danger` - Rojo para acciones destructivas  
- `warning` - Amarillo para advertencias
- `info` - Cian para información
- `disabled` - Estado deshabilitado

## Tamaños

- `small` - Texto pequeño (14px), padding reducido
- `medium` - Tamaño estándar (17px)
- `large` - Texto grande (20px), padding amplio

## Efectos de Animación

Todos los botones incluyen:
- ✨ **Hover Effect**: Se elevan 3px y añaden sombra
- ✨ **Active Effect**: Efecto de "presionado" 
- ✨ **Scale Animation**: El fondo se escala y desvanece en hover
- ✨ **Smooth Transitions**: Transiciones suaves de 0.2s-0.4s

## Ejemplos de Uso

### Botones de Acción
```tsx
<AdvancedButton variant="success" onClick={handleSave}>
  Guardar
</AdvancedButton>

<AdvancedButton variant="danger" onClick={handleDelete}>
  Eliminar
</AdvancedButton>
```

### Botones de Navegación
```tsx
<AdvancedButton variant="ghost" size="small">
  Cancelar
</AdvancedButton>

<AdvancedButton variant="border">
  Ver Más
</AdvancedButton>
```

### Formularios
```tsx
<AdvancedButton 
  type="submit" 
  variant="solid" 
  size="large"
  disabled={isLoading}
>
  {isLoading ? 'Enviando...' : 'Enviar'}
</AdvancedButton>
```

## Personalización

Puedes añadir clases CSS adicionales usando la prop `className`:

```tsx
<AdvancedButton 
  variant="solid"
  className="w-full !bg-purple-500 hover:!bg-purple-600"
>
  Botón Personalizado
</AdvancedButton>
```

## Props Disponibles

```tsx
interface AdvancedButtonProps {
  variant?: 'default' | 'disabled' | 'border' | 'solid' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  // ... otras props de HTMLButtonElement
}
```

## Migración

Para migrar botones existentes:

### Antes:
```tsx
<button 
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
  onClick={handleClick}
>
  Click me
</button>
```

### Después:
```tsx
<AdvancedButton 
  variant="solid"
  onClick={handleClick}
>
  Click me
</AdvancedButton>
```

## Showcase

Para ver todos los botones en acción, importa y usa el componente `ButtonShowcase`:

```tsx
import { ButtonShowcase } from '../components/ui/ButtonShowcase';

<ButtonShowcase />
```
