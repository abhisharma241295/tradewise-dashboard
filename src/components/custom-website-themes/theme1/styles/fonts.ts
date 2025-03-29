// Available font options for the theme
export const fonts = {
  decorative: {
    alexBrush: "Alex_Brush",
    monallesiaScript: "Monallesia_Script",
  },
  primary: {
    inter: "Inter",
    nunitoSans: "Nunito_Sans",
    cormorantGaramond: "Cormorant_Garamond",
    jost: "Jost",
    didactGothic: "Didact_Gothic",
  },
  secondary: {
    roboto: "Roboto",
  },
};
// Function to inject font styles into the document
export const injectFontStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Nunito+Sans:ital,opsz,wght@0,6..12,200;0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;1,6..12,200;1,6..12,300;1,6..12,400;1,6..12,500;1,6..12,600;1,6..12,700&family=Jost:wght@100;200;300;400;500;600;700;800;900&display=swap');
    @import url('https://fonts.cdnfonts.com/css/monallesia-script');
    @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Didact+Gothic&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Ephesis&display=swap);
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap);
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap);
    @import url('https://fonts.googleapis.com/css2?family=Meow+Script&display=swap);
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap);
    @import url('https://fonts.googleapis.com/css2?family=Moon+Dance&display=swap);
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap);

 
    /* Define a CSS class for each font */
    .font-alex-brush {
      font-family: 'Alex Brush', cursive;
    }
    
    .font-cormorant {
      font-family: 'Cormorant Garamond', serif;
    }

    .font-nunito {
      font-family: 'Nunito Sans', sans-serif;
    }

    .font-jost {
      font-family: 'Jost', sans-serif;
    }

    .font-monallesia-script {
      font-family: 'Monallesia Script';
    }
    .didact-gothic-regular {
      font-family: "Didact Gothic", serif;
      font-weight: 400;
      font-style: normal;
    }
    .ephesis-regular {
  font-family: "Ephesis", serif;
  font-weight: 400;
  font-style: normal;
}
    `;
  document.head.appendChild(style);
};
