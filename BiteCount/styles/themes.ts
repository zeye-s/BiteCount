export const themes = {
  DarkGreen: {
    name: 'Dark Green',
    background: '#0D1F17',
    header: '#16422e',
    surface: '#254D3A',
    primary: '#00FF9D',
    text: '#FFFFFF',
    textSecondary: '#A3C9B8',
    alert: '#FF4D6D',
  },
  LightMint: {
    name: 'LightMint',
    background: '#E8F5E9',     
    header: '#FFFFFF',         
    surface: '#C8E6C9',       
    primary: '#00C853',        
    text: '#05290F',           
    textSecondary: '#2E7D32',  
    alert: '#FF1744',        
  },
};

export type ThemeType = keyof typeof themes;