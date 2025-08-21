# Advanced Button Color Customization

## Variables CSS Disponibles

El sistema de botones ahora utiliza variables CSS para una fácil personalización de colores. Todas las variables están definidas en `:root` para uso global.

### 🎨 Variables de Color Principales

```css
:root {
  /* Primary Colors */
  --primary: #007bff;
  --primary-dark: #0056b3;
  --primary-light: #4dabf7;
  
  /* Default Colors */
  --default: #ffffff;
  --default-dark: #f8f9fa;
  --default-light: #ffffff;
  --default-text: #000000;
  
  /* Success Colors */
  --success: #28a745;
  --success-dark: #218838;
  --success-light: #40c057;
  
  /* Danger Colors */
  --danger: #dc3545;
  --danger-dark: #c82333;
  --danger-light: #fa5252;
  
  /* Warning Colors */
  --warning: #ffc107;
  --warning-dark: #e0a800;
  --warning-light: #ffd43b;
  --warning-text: #212529;
  
  /* Info Colors */
  --info: #17a2b8;
  --info-dark: #138496;
  --info-light: #22b8cf;
  
  /* Ghost Colors */
  --ghost: #6c757d;
  --ghost-dark: #495057;
  --ghost-light: #adb5bd;
  
  /* Disabled Colors */
  --disabled: #e9ecef;
  --disabled-text: #6c757d;
}
```

## 🔧 Personalización Fácil

### Cambiar el Esquema de Colores Global

Para cambiar todos los botones primarios a un color verde neón:

```css
:root {
  --primary: #00ffd0;
  --primary-dark: #0096cc;
  --primary-light: #88ffdd;
}
```

### Crear Tema Personalizado

```css
/* Tema Dark/Neon */
:root {
  --primary: #00ffd0;
  --primary-dark: #00cc88;
  --primary-light: #88ffdd;
  
  --success: #00ff88;
  --success-dark: #00cc66;
  
  --danger: #ff0066;
  --danger-dark: #cc0044;
  
  --warning: #ffcc00;
  --warning-dark: #cc9900;
}
```

### Personalización por Componente

También puedes personalizar colores a nivel de componente específico:

```css
/* Solo para botones en el dashboard */
.dashboard .btn--solid {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
}
```

## 🎯 Ejemplos de Uso

### Tema Corporativo
```css
:root {
  --primary: #1e40af;      /* Azul corporativo */
  --primary-dark: #1e3a8a;
  --success: #059669;      /* Verde empresarial */
  --danger: #dc2626;       /* Rojo profesional */
}
```

### Tema Gaming
```css
:root {
  --primary: #8b5cf6;      /* Púrpura vibrante */
  --primary-dark: #7c3aed;
  --success: #10b981;      /* Verde neón */
  --danger: #ef4444;       /* Rojo intenso */
  --warning: #f59e0b;      /* Naranja gaming */
}
```

### Tema Minimalista
```css
:root {
  --primary: #374151;      /* Gris oscuro */
  --primary-dark: #1f2937;
  --success: #6b7280;      /* Gris medio */
  --danger: #9ca3af;       /* Gris claro */
}
```

## 🌙 Soporte para Tema Oscuro

El sistema incluye adaptaciones automáticas para tema oscuro:

```css
@media (prefers-color-scheme: dark) {
  .btn--default {
    color: var(--black);
    background-color: var(--default-dark);
  }
  
  .btn--ghost {
    color: var(--ghost-light);
  }
}
```

## 🔄 Migración de Colores Hardcodeados

### Antes:
```css
.custom-button {
  background-color: #007bff;
  border-color: #0056b3;
}
```

### Después:
```css
.custom-button {
  background-color: var(--primary);
  border-color: var(--primary-dark);
}
```

## 💡 Consejos

1. **Mantén consistencia**: Usa siempre las variables en lugar de colores hardcodeados
2. **Testa la accesibilidad**: Asegúrate de que los contrastes sean adecuados
3. **Documenta cambios**: Si cambias variables globales, documenta el propósito
4. **Usa herencia**: Las variables se heredan, úsalo a tu favor para temas

## 🎨 Herramientas Recomendadas

- **Coolors.co**: Para generar paletas
- **Contrast Checker**: Para verificar accesibilidad
- **Adobe Color**: Para armonías cromáticas
