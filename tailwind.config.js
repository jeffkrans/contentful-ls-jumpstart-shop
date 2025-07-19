const colors = require("tailwindcss/colors");
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./layouts/**/*.{js,ts,jsx,tsx}",
        "./HOC/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    	colors: {
    		transparent: 'transparent',
    		current: 'currentColor',
    		black: 'colors.black',
    		white: 'colors.white',
    		gray: 'colors.trueGray',
    		indigo: 'colors.indigo',
    		red: 'colors.rose',
    		yellow: 'colors.amber',
    		blau: '#0033A3',
    		blau2: '#003CBE',
    		blau3: '#0050D5',
    		blau4: '#0065EB',
    		blau5: '#007CFF',
    		blau6: '#1A8CFF',
    		blau7: '#47A1FF',
    		blau8: '#67B3FF',
    		blau9: '#8BCBFF',
    		blau10: '#0065EB',
    		blau11: '#E9F7FF',
    		gelb: '#FCBB00',
    		gelb2: '#FFDA00',
    		gelb3: '#FFF575',
    		rot: '#EB5A68',
    		neuter: '#2A3039'
    	},
    	extend: {
    		fontFamily: {
    			AvenirNextLTW02: [
    				'AvenirNextLTW02-Regular',
    				'sans-serif'
    			],
    			AvenirNextLTitalic: [
    				'AvenirNextLTW02-It',
    				'sans-serif'
    			],
    			AvenirNextLTDemi: [
    				'AvenirNextLTW02-Demi',
    				'sans-serif'
    			],
    			AvenirNextLTBold: [
    				'AvenirNextLTW02-Bold',
    				'sans-serif'
    			]
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
};