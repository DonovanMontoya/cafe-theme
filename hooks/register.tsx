import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { cafeScene } from './scene'

// Latte foam by day, an espresso bar by lamplight at night.
const { theme, problems } = makeColors({
  label: 'Cafe',
  roles: {
    accent: '#8a4b2a', // roasted bean
    danger: '#b2392e', // cherry
    success: '#5c7a3a', // matcha
    warning: '#b87414', // caramel
    pro: '#7a4a6e', // berry
  },
  light: {
    gray: {
      anchors: {
        'surface-0': '#ecdfcb',
        'surface-1': '#f3e8d6',
        'surface-2': '#f9f2e6',
        'text-primary': '#2b1d14',
        'text-secondary': '#523c2c',
        'text-muted': '#6b5442',
      },
    },
  },
  dark: {
    roles: { accent: '#d49a6a' },
    gray: {
      anchors: {
        'surface-0': '#1c130e',
        'surface-1': '#251a13',
        'surface-2': '#2e2118',
        'surface-3': '#35271d',
        'text-primary': '#f3e6d4',
        'text-secondary': '#d4c0a8',
        'text-muted': '#b09a82',
      },
    },
  },
})


const LOOK: ThemeSetArgs = {
  colors: theme,
  // A light veil: enough to keep words readable, thin enough to see the room.
  backdrop: { scene: 'cafe', glass: { blur: 3, opacity: 0.4 } },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))
    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)
    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }
    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)
    return (
      <Svg
        source={cafeScene(e.surface === 'mobile')}
        alt="A cafe: string lights, shelves, a chalkboard menu, a window onto the street, and an espresso machine and a latte on the counter"
        isInteractive
      />
    )
  })
}
