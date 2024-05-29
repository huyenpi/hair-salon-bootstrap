// Dựa vào số ảnh trên 1 hàng(row_count), số của slide hiện tại(data-slide-number), phần tử item đầu tiên và cuối cùng để tạo carousel động.

let row_count = 4;
const carousel = document.querySelector(".carousel.team__list");
const carousel_item_collection = document.querySelectorAll(
  ".carousel.team__list .carousel-item"
);
const first_child_collection = document.querySelectorAll(
  `.carousel.team__list .carousel-item:nth-child(-n + ${row_count})`
);
const last_child_collection = document.querySelectorAll(
  `.carousel.team__list .carousel-item:nth-last-child(-n + ${row_count})`
);

const first_child_item = document.querySelector(
  " .carousel.team__list .carousel-item:first-child"
);
const last_child_item = document.querySelector(
  ".carousel.team__list .carousel-item:last-child"
);

//set slide ban đầu là 0
carousel.dataset.slideNumber = 0;

//set tất cả carousel-item display: none
for (item of carousel_item_collection) {
  item.style.display = "none";
}
// set row_count số phần tử đầu tiên display: block
for (item of first_child_collection) {
  item.style.display = "block";
}

const carousel_prev_btn = document.querySelector("button.carousel-btn.prev");
const carousel_next_btn = document.querySelector("button.carousel-btn.next");

//click bào btn prev:
//giảm data-slide-number của div.carousel xuống 1 đơn vị
//set tất cả carousel-item display none,
// sau đó set row_count phần tử phía trước display block

carousel_prev_btn.addEventListener("click", function () {
  if (first_child_item.style.display == "block") {
    return;
  }
  carousel.dataset.slideNumber = Number(carousel.dataset.slideNumber) - 1;
  for (item of carousel_item_collection) {
    let carousel_style =
      "display: none;transform: scale(80%);transition: all 5s ease-in-out; ";
    item.setAttribute("style", carousel_style);
  }
  for (let i = 1; i <= row_count; i++) {
    let carousel_style =
      "display: block;transform: scale(110%);transition: all 5s  ease-in-out; ";
    document
      .querySelector(
        `.carousel.team__list .carousel-item:nth-child(${
          Number(carousel.dataset.slideNumber) * row_count + i
        } )`
      )
      .setAttribute("style", carousel_style);
  }
});

//click bào btn next:
//tăng data-slide-number của div.carousel lên 1 đơn vị
//set tất cả carousel-item display none,
// sau đó set row_count phần tử phía sau display block

carousel_next_btn.addEventListener("click", function () {
  if (last_child_item.style.display == "block") {
    return;
  }
  carousel.dataset.slideNumber = Number(carousel.dataset.slideNumber) + 1;
  for (item of carousel_item_collection) {
    let carousel_style =
      "display: none;transform: scale(80%);transition: all 5s ease-in-out; ";
    item.setAttribute("style", carousel_style);
  }
  //tạo mảng tạm chứa, kiểm tra xem mảng có chứa phần tử cuối cùng không,
  // nếu có set row_count phần tử cuối cùng của carousel display block
  //nếu không set các phần tử trong mảng tạm display block.
  let temp_arr = [];
  for (let i = 1; i <= row_count; i++) {
    temp_arr.push(
      document.querySelector(
        `.carousel.team__list .carousel-item:nth-child(${
          Number(carousel.dataset.slideNumber) * row_count + i
        } )`
      )
    );
  }

  if (temp_arr.includes(last_child_item) == true) {
    for (item of last_child_collection) {
      let carousel_style =
        "display: block;transform: scale(110%); transition: all 5s ease-in-out; ";
      item.setAttribute("style", carousel_style);
    }
  } else {
    for (item of temp_arr) {
      let carousel_style =
        "display: block;transform: scale(110%); transition: all 5s ease-in-out; ";
      item.setAttribute("style", carousel_style);
    }
  }
});
