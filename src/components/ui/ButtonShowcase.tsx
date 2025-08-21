import React from 'react';
import { AdvancedButton } from './AdvancedButton';

export const ButtonShowcase: React.FC = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">Advanced Button Components</h1>
      
      {/* Size Variants */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Sizes</h2>
        <div className="flex gap-4 items-center">
          <AdvancedButton size="small">Small</AdvancedButton>
          <AdvancedButton size="medium">Medium</AdvancedButton>
          <AdvancedButton size="large">Large</AdvancedButton>
        </div>
      </section>

      {/* Default Variants */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Variants</h2>
        <div className="flex gap-4 flex-wrap">
          <AdvancedButton variant="default">Default</AdvancedButton>
          <AdvancedButton variant="solid">Solid</AdvancedButton>
          <AdvancedButton variant="border">Border</AdvancedButton>
          <AdvancedButton variant="ghost">Ghost</AdvancedButton>
        </div>
      </section>

      {/* Semantic Variants */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Semantic Colors</h2>
        <div className="flex gap-4 flex-wrap">
          <AdvancedButton variant="success">Success</AdvancedButton>
          <AdvancedButton variant="danger">Danger</AdvancedButton>
          <AdvancedButton variant="warning">Warning</AdvancedButton>
          <AdvancedButton variant="info">Info</AdvancedButton>
          <AdvancedButton variant="disabled" disabled>Disabled</AdvancedButton>
        </div>
      </section>

      {/* Interactive Examples */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Interactive Examples</h2>
        <div className="flex gap-4 flex-wrap">
          <AdvancedButton 
            variant="success" 
            onClick={() => alert('Success action!')}
          >
            Click Me
          </AdvancedButton>
          <AdvancedButton 
            variant="danger" 
            onClick={() => confirm('Are you sure?')}
          >
            Delete
          </AdvancedButton>
          <AdvancedButton 
            variant="info" 
            onClick={() => console.log('Info logged')}
          >
            Log Info
          </AdvancedButton>
        </div>
      </section>

      {/* Mixed Sizes and Variants */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Mixed Examples</h2>
        <div className="flex gap-4 flex-wrap items-center">
          <AdvancedButton variant="success" size="small">Save</AdvancedButton>
          <AdvancedButton variant="border" size="medium">Edit</AdvancedButton>
          <AdvancedButton variant="danger" size="large">Delete</AdvancedButton>
          <AdvancedButton variant="ghost" size="small">Cancel</AdvancedButton>
        </div>
      </section>
    </div>
  );
};
