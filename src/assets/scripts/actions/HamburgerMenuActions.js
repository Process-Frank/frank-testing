export const OPEN_MENU = "OPEN_MENU";
export const CLOSE_MENU = "CLOSE_MENU";
export const TOGGLE_MENU = "TOGGLE_MENU";

export function openMenu() {
  return {
    type: OPEN_MODAL,
    open: true
  };
}

export function closeMenu() {
  return {
    type: CLOSE_MODAL,
    open: false
  }
}


export function toggleMenu() {
  return {
    type: TOGGLE_MENU
  }
}
