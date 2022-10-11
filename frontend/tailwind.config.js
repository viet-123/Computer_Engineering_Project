module.exports = {
      content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
      theme: {
            extend: {
                  flex: {
                        '1/2': '1 1 50%',
                  },
                  backgroundImage: {
                        'user-image': "url('./assests/images/iphone13.jpg')",
                  },
                  colors: {
                        'regal-black': 'rgb(168, 165, 165)',
                        'minus-black': 'rgb(204, 204, 204)',
                        'blur-black': 'rgba(0,0,0,.7)',
                        'additional-black': 'rgba(85,85,85,.8)',
                        'blur-grey': 'rgba(0,0,0,.02)',
                        'minus-red': 'rgba(255,66,79,.2);',
                        'blur-orange': 'rgb(208 110 1 / 8%)',
                  },
                  width: {
                        '9/10': '90%',
                        '9/20': '45%',
                  },
                  maxWidth: {
                        '8xl': '1400px',
                        full: '100%',
                  },
                  boxShadow: {
                        min: '0 1px 1px 0rgba(0,0,0,.03)',
                        '4xl': '0 5px 10px 0 rgb(0 0 0 / 12%);',
                        '3xl': '0 1px 20px 0 rgb(74 74 78/ 12%)',
                        'blue-blur': '0px 1px 2px rgb(50 50 71 / 8%);',
                        'blue-focus': '0px 1px 5px 2px rgb(37 37 203 / 40%)',
                  },
                  translate: {
                        '[-1/2]': '-50%',
                  },
                  keyframes: {
                        sweet: {
                              '50%': {},
                              '100%': {
                                    transform: 'translateX(0)',
                              },
                        },
                  },
                  animation: {
                        sweet: 'sweet 2s linear 1',
                  },
            },
      },
      plugins: [],
};
