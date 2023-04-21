export const EscBtn = (event , close , reset ) => {
  const KeyCode = event.keyCode;
  if (KeyCode === 27) {
    document.body.style.overflow ="unset"
    close(false);

  }
};
