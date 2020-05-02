import { ThemeModes } from '../definitions';

export function isSet(attr: string, element: HTMLElement) {
  const value = element.getAttribute(attr);
  return value === '';
}

export function isOpen(element: HTMLElement) {
  return isSet('open', element);
}

export function toggleAttribute(element: HTMLElement, attr: string) {
  const newState = isSet(attr, element) ? false : true;
  if (newState) {
    element.setAttribute(attr, '');
  } else {
    element.removeAttribute(attr);
  }
}

export function setAttribute(element: HTMLElement, attr: string, enabled: boolean) {
  if (enabled) {
    element.setAttribute(attr, '');
  } else {
    element.removeAttribute(attr);
  }
}

export function open(element: HTMLElement) {
  setAttribute(element, 'open', true);
}

export function close(element: HTMLElement) {
  setAttribute(element, 'open', false);
}

export function select(element: HTMLElement) {
  setAttribute(element, 'selected', true);
}

export function deselect(element: HTMLElement) {
  setAttribute(element, 'selected', false);
}

export function loading(element: HTMLElement) {
  setAttribute(element, 'loading', true);
}

export function loaded(element: HTMLElement) {
  setAttribute(element, 'loading', false);
}

export function toggleSelected(element: HTMLElement) {
  toggleAttribute(element, 'selected');
}

export function toggleOpen(element: HTMLElement) {
  toggleAttribute(element, 'open');
}

export async function setInitialThemeClass(themeInfo?: browser.theme.ThemeUpdateInfo) {
  let theme: any;
  if (themeInfo) {
    theme = themeInfo.theme;
  } else {
    theme = await browser.theme.getCurrent();
  }

  if (Object.keys(theme).length > 0 && theme['colors'] !== null) {
    // Seems like there is no better way of identifying themes
    if (theme.colors.toolbar_field === '#fff' || theme.colors.toolbar_field === '#ffffff') {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      return ThemeModes.Light;
    }
  }

  document.body.classList.add('dark');
  document.body.classList.remove('light');
  return ThemeModes.Dark;
}

export function rgbToHex(rgb: string) {
  return '#' + rgb.substr(4, rgb.indexOf(')') - 4).split(',').map((color) => parseInt(color).toString(16)).join('');
}
