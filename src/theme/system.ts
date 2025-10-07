import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50:  { value: 'var(--color-brand-50)' },
          100: { value: 'var(--color-brand-100)' },
          200: { value: 'var(--color-brand-200)' },
          300: { value: 'var(--color-brand-300)' },
          400: { value: 'var(--color-brand-400)' },
          500: { value: 'var(--color-brand-500)' },
          600: { value: 'var(--color-brand-600)' },
          700: { value: 'var(--color-brand-700)' },
          800: { value: 'var(--color-brand-800)' },
          900: { value: 'var(--color-brand-900)' }
        },
        gray: {
          50:  { value: 'var(--color-gray-50)' },
          100: { value: 'var(--color-gray-100)' },
          200: { value: 'var(--color-gray-200)' },
          300: { value: 'var(--color-gray-300)' },
          400: { value: 'var(--color-gray-400)' },
          500: { value: 'var(--color-gray-500)' },
          600: { value: 'var(--color-gray-600)' },
          700: { value: 'var(--color-gray-700)' },
          800: { value: 'var(--color-gray-800)' },
          900: { value: 'var(--color-gray-900)' }
        }
      }
    },
    semanticTokens: {
      colors: {
        'bg.canvas':  { value: { base: '{colors.gray.50}',  _dark: '{colors.gray.900}' } },
        'bg.surface': { value: { base: '{colors.white}',    _dark: '{colors.gray.800}' } },
        'fg.default': { value: { base: '{colors.gray.900}', _dark: '{colors.gray.50}'  } },
        'primary.solid': { value: { base: '{colors.brand.600}', _dark: '{colors.gray.200}' } },
        'primary.hover': { value: { base: '{colors.brand.700}', _dark: '{colors.gray.300}' } },
        'primary.fg':    { value: { base: '{colors.white}',      _dark: '{colors.gray.900}' } }
      }
    }
  }
});

export default createSystem(defaultConfig, config);
