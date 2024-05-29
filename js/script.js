const carousel = document.querySelector(".carousel");
const arrowIcons = document.querySelectorAll(".team__list i.btn");
const firstItem = document.querySelector(".carousel .carousel-item");
let itemWidth = firstItem.clientWidth + 57;
let scrollMax = carousel.scrollWidth - carousel.clientWidth;
let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcon = () => {
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft >= scrollMax - 5 ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    carousel.scrollLeft -= icon.id == "left" ? itemWidth : -itemWidth;
    setTimeout(() => {
      showHideIcon();
    }, 350);
  });
});

const autoSlide = () => {
  console.log(carousel.scrollLeft + " " + scrollMax);
  if (carousel.scrollLeft == 0 || carousel.scrollLeft >= scrollMax - 5) return;
  positionDiff = Math.abs(positionDiff);
  let valDiff = itemWidth - positionDiff;
  if (carousel.scrollLeft > prevScrollLeft)
    return (carousel.scrollLeft +=
      positionDiff > itemWidth / 3 ? valDiff : -positionDiff);
  carousel.scrollLeft -= positionDiff > itemWidth / 3 ? valDiff : -positionDiff;
};

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  e.preventDefault();
  if (!isDragStart) return;
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = e.pageX - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  setTimeout(() => {
    showHideIcon();
  }, 350);
};

const dragStop = (e) => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  if (!isDragging) return;
  isDragging = false;

  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
