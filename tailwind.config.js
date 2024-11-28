/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
		keyframes: {
			rotateLeft:{
				'0%': { transform: 'rotate(0deg)' },       // Start at the original position
				'50%': { transform: 'rotate(-10deg)' },    // Rotate 10% to the left (counterclockwise)
				'100%': { transform: 'rotate(0deg)' },     // End back at the original position
			},

			rise: {
			  '0%': { transform: 'translateY(100%)', opacity: '0' },
			  '100%': { transform: 'translateY(0)', opacity: '1' },
			},

			float: {
				'0%, 100%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-10px)' },
			  },
		  },
		  animation: {
			rotateLeft: 'rotateLeft 2s ease-in-out infinite',
			rise: 'rise 1s ease-out',
			float: 'float 3s ease-in-out infinite',
		  },
  		fontFamily: {
			pops: ['Poppins', 'sans-serif'],
			inter: ['Inter', 'sans-serif'],
  			sans: ['Roboto', 'sans-serif'],
  			comic: ['Comic Sans MS"', 'cursive'],
  			times: ['Times New Roman"', 'serif'],
  			arial: ['Arial', 'sans-serif'],
  			georgia: ['Georgia', 'serif']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
