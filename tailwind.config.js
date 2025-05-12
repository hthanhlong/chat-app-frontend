import flowbiteReact from 'flowbite-react/plugin/tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    'node_modules/flowbite-react/**/*.{js,jsx}',
    '.flowbite-react/class-list.json',
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require('flowbite/plugin'), flowbiteReact],
}
