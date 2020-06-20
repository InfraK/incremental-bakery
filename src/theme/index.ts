import { colors } from './colors';

export const theme = {
  fonts: {
    body: 'Patrick Hand',
    heading: 'Patrick Hand',
  },
  fontSizes: [14, 16, 18, 20, 24, 32, 48, 64],
  colors: {
    text: colors.greyDark,
    primary: colors.pastelRed,
    secondary: colors.pastelOrange,
    background: colors.lightGrey,
    disabled: colors.mediumGrey,
  },
  borders: [`3px solid ${colors.greyDark}`],
  radii: ['0.5rem'],
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      border: 'none',
      '&:hover': {
        transform: `scale(1.02)`,
      },
      '&:active': {
        transform: `scale(0.98)`,
      },
      '&:disabled': {
        bg: 'disabled',
        color: 'text',
        boxShadow: 'none',
        cursor: 'not-allowed',
      },
      boxShadow: '1px 1px 2px rgba(0,0,0,0.3)',
      cursor: 'pointer',
      fontFamily: 'Patrick Hand',
      textTransform: 'uppercase',
    },
    secondary: {
      color: 'background',
      bg: 'secondary',
      border: 'none',
      '&:hover': {
        transform: `scale(1.02)`,
      },
      '&:active': {
        transform: `scale(0.98)`,
      },
      boxShadow: '1px 1px 2px rgba(0,0,0,0.3)',
      cursor: 'pointer',
      fontFamily: 'Patrick Hand',
      textTransform: 'uppercase',
    },
    upgrade: {
      color: 'background',
      bg: 'secondary',
      padding: 1,
      fontSize: '1rem',
      border: 'none',
      '&:hover': {
        transform: `scale(1.02)`,
      },
      '&:active': {
        transform: `scale(0.98)`,
      },
      '&:disabled': {
        bg: 'disabled',
        cursor: 'not-allowed',
      },
      boxShadow: '1px 1px 2px rgba(0,0,0,0.3)',
      cursor: 'pointer',
      fontFamily: 'Patrick Hand',
      textTransform: 'uppercase',
    },
  },
  links: {
    nav: {
      textDecoration: 'none',
      color: 'text',
      px: 4,
      py: 2,
      '&:hover': {
        bg: 'primary',
        color: 'background',
      },
      '&:active': {
        text: 'primary',
      },
      width: '100%',
      textAlign: 'center',
    },
    active: {
      textDecoration: 'none',
      color: 'primary',
      px: 4,
      py: 2,
      '&:hover': {
        bg: 'primary',
        color: 'background',
      },
      width: '100%',
      textAlign: 'center',
    },
  },
  text: {
    default: {
      color: 'text',
      fontSize: 3,
    },
    sectionHeader: {
      color: 'primary',
      fontSize: 5,
    },
  },
};
