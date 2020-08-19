window.addEventListener("DOMContentLoaded", () => {
  // Tabs
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent");

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (event.target == item) {
          hideTabContent();
          showTabContent(i);
          event.target.classList.add("tabheader__item_active");
        }
      });
    }
  });

  //Timer
  const deadline = "2020-08-14";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  //Modal
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  function closeModal() {
    modal.classList.toggle("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.toggle("show");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target == modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 5000);

  function showByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showByScroll);
    }
  }

  window.addEventListener("scroll", showByScroll);


// Menu card

class MenuCard {
  constructor(parentElem, src, alt, title, descr, price) {
    this.parentElem = document.querySelector(parentElem);
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.rate = 27.41;
    this.convertToUAH();
  }

  convertToUAH() {
    this.price = +this.price * this.rate;
  }

  render() {
    const elem = document.createElement("div");
    elem.innerHTML = `
    <div class="menu__item">
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
      <div class="menu__item-descr">Меню ${this.title} - ${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>
    </div>
    `;
    this.parentElem.appendChild(elem);
  }
}

  new MenuCard(
    ".menu .container",
    "img/tabs/vegy.jpg",
    "vegy",
    "Фитнес",
    "это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    9
    ).render();

    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
    };

    forms.forEach( (item) => {
      postData(item);
    });

    function postData(form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);

        const req = new XMLHttpRequest();
        req.open('POST', 'server.php');

        //req.setRequestHeader('Content-type', 'multipart/form-data');
        const formData = new FormData(form);

        req.send(formData);

        req.addEventListener('load', () => {
          if(req.status === 200) {
            console.log(req.response);
            statusMessage.textContent = message.success;
          } else {
            statusMessage.textContent = message.failure;
          }
        });
      });
    }
});