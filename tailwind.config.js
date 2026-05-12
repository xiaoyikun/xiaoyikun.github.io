/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand & accent
        primary: '#0066cc',
        'primary-focus': '#0071e3',
        'primary-on-dark': '#2997ff',
        // Ink
        ink: '#1d1d1f',
        body: '#1d1d1f',
        'body-on-dark': '#ffffff',
        'body-muted': '#cccccc',
        'ink-muted-80': '#333333',
        'ink-muted-48': '#7a7a7a',
        // Hairlines
        'divider-soft': '#f0f0f0',
        hairline: '#e0e0e0',
        // Surfaces
        canvas: '#ffffff',
        parchment: '#f5f5f7',
        pearl: '#fafafc',
        'tile-1': '#272729',
        'tile-2': '#2a2a2c',
        'tile-3': '#252527',
        'surface-black': '#000000',
        'chip-translucent': '#d2d2d7'
      },
      fontFamily: {
        display: [
          'SF Pro Display',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'sans-serif'
        ],
        text: [
          'SF Pro Text',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'sans-serif'
        ]
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing }]
        'hero-display': ['56px', { lineHeight: '1.07', letterSpacing: '-0.28px' }],
        'display-lg': ['40px', { lineHeight: '1.1', letterSpacing: '0' }],
        'display-md': ['34px', { lineHeight: '1.47', letterSpacing: '-0.374px' }],
        lead: ['28px', { lineHeight: '1.14', letterSpacing: '0.196px' }],
        'lead-airy': ['24px', { lineHeight: '1.5', letterSpacing: '0' }],
        tagline: ['21px', { lineHeight: '1.19', letterSpacing: '0.231px' }],
        'body-strong': ['17px', { lineHeight: '1.24', letterSpacing: '-0.374px' }],
        'body-base': ['17px', { lineHeight: '1.47', letterSpacing: '-0.374px' }],
        'dense-link': ['17px', { lineHeight: '2.41', letterSpacing: '0' }],
        caption: ['14px', { lineHeight: '1.43', letterSpacing: '-0.224px' }],
        'caption-strong': ['14px', { lineHeight: '1.29', letterSpacing: '-0.224px' }],
        'button-large': ['18px', { lineHeight: '1', letterSpacing: '0' }],
        'button-utility': ['14px', { lineHeight: '1.29', letterSpacing: '-0.224px' }],
        'fine-print': ['12px', { lineHeight: '1', letterSpacing: '-0.12px' }],
        'micro-legal': ['10px', { lineHeight: '1.3', letterSpacing: '-0.08px' }],
        'nav-link': ['12px', { lineHeight: '1', letterSpacing: '-0.12px' }]
      },
      borderRadius: {
        none: '0px',
        xs: '5px',
        sm: '8px',
        md: '11px',
        lg: '18px',
        pill: '9999px',
        full: '9999px'
      },
      spacing: {
        xxs: '4px',
        // 注：覆盖 tailwind 默认 xs 命名时使用自定义 key
        'apple-xs': '8px',
        'apple-sm': '12px',
        'apple-md': '17px',
        'apple-lg': '24px',
        'apple-xl': '32px',
        'apple-xxl': '48px',
        section: '80px'
      },
      boxShadow: {
        // 整个系统中唯一的阴影：产品落在表面时
        product: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0'
      },
      backdropBlur: {
        frosted: '20px'
      }
    }
  },
  plugins: []
}
