function scrollToSection(id) {
  const section = document.getElementById(id);

  section.style.display = "block";

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  });

  setTimeout(() => {
    section.classList.remove("hide");
    section.classList.add("show");
  }, 400);
}

function hideToSection(id) {
  const section = document.getElementById(id);

  setTimeout(() => {
    section.classList.remove("show");
    section.classList.add("hide");
  }, 400);

  section.style.display = "none";
}

function scrollSlider(direction, slider_name) {
  const slider = document.getElementById(slider_name);
  const scrollAmount = 315; // ширина блока + отступ
  slider.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

document.addEventListener('input', function (e) {
  const textarea = e.target.closest('textarea');
  if (!textarea || textarea.hasAttribute('data-no-resize')) return;

  const baseHeight = 35;

  const lines = textarea.value.split('\n').length;

  // если одна строка или пусто — возвращаем базовую высоту
  if (textarea.value.trim() === '' || lines <= 1) {
    textarea.style.height = baseHeight + 'px';
    return;
  }

  // иначе подгоняем под контент
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
});

document.addEventListener('click', (e) => {
  if (e.target.closest('.toggle-button')) {
    const btn = e.target.closest('.toggle-button');
    const img = btn.querySelector('.button-image');
    const container = btn.closest('.input-button')
                         .querySelector('.input-container');

    img.classList.toggle('expanded');
    container.classList.toggle('expanded');
  }
});


let selectedPresetImage = null;
let selectedPresetText = null;

function selectPresetImage(url) {
  selectedPresetImage = url;
  
  const img = document.querySelector("#result_cart img");

  if (selectedPresetImage) {
    img.src = selectedPresetImage;
    img.crossOrigin = "anonymous";
  }
}


function selectPresetText(selector) {
  selectedPresetText = document.getElementById(selector).textContent;
}

document.getElementById("image_upload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    selectedPresetImage = event.target.result; // base64

    // (опционально) показать превью сразу
    const img = document.querySelector("#result_cart img");
    if (img) {
      img.src = selectedPresetImage;
    }
    scrollToSection('select_constructor')
  };

  reader.readAsDataURL(file);
});

function constructorResult() {

  const img = document.querySelector("#result_cart img");

  if (selectedPresetImage) {
    img.src = selectedPresetImage;
    img.crossOrigin = "anonymous";
  }

  const data = {
    header: document.getElementById("header_input").value,
    appeal: document.getElementById("appeal_input").value,
    description: document.getElementById("description_input").value,
    footer: document.getElementById("footer_input").value
  };

  // Записываем в карточку
  document.getElementById("header_result").textContent = data.header;
  document.getElementById("appeal_result").textContent = data.appeal;
  document.getElementById("description_result").textContent = data.description;
  document.getElementById("footer_result").textContent = data.footer;

  // Сохраняем глобально для скачивания
  window.resultData = data;
}

function patternResult() {

  const img = document.querySelector("#result_cart img");

  if (selectedPresetImage) {
    img.src = selectedPresetImage;
    img.crossOrigin = "anonymous";
  }

  const data = {
    header: document.getElementById("header_input_2").value,
    appeal: document.getElementById("appeal_input_2").value,
    description: selectedPresetText,
    footer: document.getElementById("footer_input_2").value
  };

  // Записываем в карточку
  document.getElementById("header_result").textContent = data.header;
  document.getElementById("appeal_result").textContent = data.appeal;
  document.getElementById("description_result").textContent = data.description;
  document.getElementById("footer_result").textContent = data.footer;

  // Сохраняем глобально для скачивания
  window.resultData = data;
}

function downloadResult() {
  const node = document.getElementById("result_cart");

  domtoimage.toPng(node, {
    width: node.offsetWidth * 2,
    height: node.offsetHeight * 2,
    style: {
      transform: "scale(2)",
      transformOrigin: "top left"
    }
  })
  .then(dataUrl => {
    const link = document.createElement("a");
    link.download = "card.png";
    link.href = dataUrl;
    link.click();
  });
}