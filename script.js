const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;
let startX;
let endX;

function handleTouchStart(e) {
  startX = e.touches[0].pageX;
}

function handleTouchMove(e) {
  endX = e.touches[0].pageX;
}

function handleTouchEnd(e) {
  if (endX < startX) {

    checkboxes.forEach((checkbox) => {
      if (
        (checkbox.offsetLeft > lastChecked.offsetLeft &&
          checkbox.offsetLeft <= endX) ||
        (checkbox.offsetLeft < lastChecked.offsetLeft &&
          checkbox.offsetLeft >= endX)
      ) {
        checkbox.checked = true;
      }
    });
  } else if (endX > startX) {

    checkboxes.forEach((checkbox) => {
      if (
        (checkbox.offsetLeft < lastChecked.offsetLeft &&
          checkbox.offsetLeft >= endX) ||
        (checkbox.offsetLeft > lastChecked.offsetLeft &&
          checkbox.offsetLeft <= endX)
      ) {
        checkbox.checked = true;
      }
    });
  }
}

function handleCheck(e) {
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    checkboxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  lastChecked = this;
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', handleCheck);
  checkbox.addEventListener('touchstart', handleTouchStart);
  checkbox.addEventListener('touchmove', handleTouchMove);
  checkbox.addEventListener('touchend', handleTouchEnd);
});
