window.addEventListener("DOMContentLoaded", () => {
  // Swap Jupiter
  window.Jupiter.init({
    displayMode: "integrated",
    integratedTargetId: "integrated-terminal",
    endpoint: "https://api.mainnet-beta.solana.com",
    strictTokenList: false,
    formProps: {
      fixedOutputMint: true,
      initialAmount: "8888888800000",
      initialInputMint: "So11111111111111111111111111111111111111112",
      initialOutputMint: "6gvWSka7SnJDn4mqV7Ydn4q7AyVNSo2aX4TNGjBg7Cct",
    },
  });

  let currentIndexSteps = 0;

  let containerSlider = document.querySelector(".steps");
  let controls = containerSlider.querySelectorAll(
    ".steps__controls > .steps__controls-item"
  );
  let wrapperSlider = document.querySelector(".steps__wrapper");
  let itemsSlider = wrapperSlider.querySelectorAll(".steps-item");
  wrapperSlider.style.width = `${itemsSlider.length * 100}%`;

  itemsSlider.forEach((item) => {
    item.style.width = `${100 / itemsSlider.length}%`;
  });

  controls.forEach((control, index) => {
    control.addEventListener("click", (eL) => {
      removeClassControls();
      eL.target.classList.add('active');
      wrapperSlider.style.transform = `translateX(${
        index * -(100 / itemsSlider.length)
      }%)`;
    });
  });

  function removeClassControls() {
    controls.forEach((control) => {
      control.classList.remove("active");
    });
  }


  const scrollers = document.querySelectorAll(".scroller");

  addAnimation();
  function addAnimation() {
    scrollers.forEach((scroller) => {
      // add data-animated="true" to every `.scroller` on the page
      scroller.setAttribute("data-animated", true);
  
      // Make an array from the elements within `.scroller-inner`
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);
  
      // For each item in the array, clone it
      // add aria-hidden to it
      // add it into the `.scroller-inner`
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }

  const galleryItems = [
    { src: "/assets/bg-hero.jpg", alt: "Gallery Image 3" },
    { src: "/assets/layout-img-3.jpg", alt: "Gallery Image 3" },
    { src: "/assets/fatboyslim.jpg", alt: "Gallery Image 3" },
    { src: "/assets/layout-img.jpg", alt: "Gallery Image 3" },
    { src: "/assets/layout-img-5.jpg", alt: "Gallery Image 3" },
    { src: "/assets/Cocaine.jpg", alt: "Gallery Image 3" },
    { src: "/assets/trump.jpg", alt: "Gallery Image 3" },
    { src: "/assets/thanos.jpg", alt: "Gallery Image 3" },
    { src: "/assets/show.jpg", alt: "Gallery Image 3" },
    { src: "/assets/cuadros.jpg", alt: "Gallery Image 3" },

    { src: "/assets/mandalorian.jpg", alt: "Gallery Image 3" },
    { src: "/assets/starwars.jpg", alt: "Gallery Image 3" },
    { src: "/assets/father.jpg", alt: "Gallery Image 3" },
    
    { src: "/assets/pepeassasain.jpg", alt: "Gallery Image 3" },
    { src: "/assets/space.jpg", alt: "Gallery Image 3" },
    { src: "/MEMES/photo_2024-07-17_22-42-28.jpg", alt: "Gallery Image 3" },
    { src: "/MEMES/photo_2024-07-17_22-42-37.jpg", alt: "Gallery Image 4" },
    { src: "/MEMES/photo_2024-07-17_22-42-31.jpg", alt: "Gallery Image 5" },
    { src: "/assets/beatles.jpg", alt: "Gallery Image 6" },
    { src: "/MEMES/photo_2024-07-17_22-42-59.jpg", alt: "Gallery Image 1" },
    { src: "/MEMES/photo_2024-07-17_22-42-51.jpg", alt: "Gallery Image 2" },
    { src: "/assets/frens.jpg", alt: "Gallery Image 3" },
    { src: "/MEMES/photo_2024-07-17_22-42-34.jpg", alt: "Gallery Image 5" },
    { src: "/MEMES/photo_2024-07-17_22-42-56.jpg", alt: "Gallery Image 4" },
    { src: "/MEMES2/boyscluboffice.jpg", alt: "Gallery Image 4" },
    { src: "/MEMES2/deadnote.jpg", alt: "Gallery Image 4" },
    { src: "/MEMES2/dragon.jpg", alt: "Gallery Image 4" },
    { src: "/MEMES2/photo_2024-07-29_13-32-04.jpg", alt: "Gallery Image 4" },
    { src: "/MEMES2/photo_2024-07-29_13-32-14.jpg", alt: "Gallery Image 4" },
    { src: "/MEMES2/thankyou.jpg", alt: "Gallery Image 4" }
    // Agrega más imágenes según sea necesario
];

const itemsPerPage = 6;
let currentPage = 1;
const totalPages = Math.ceil(galleryItems.length / itemsPerPage);

const galleryGrid = document.querySelector(".gallery__grid");
const pageInfo = document.getElementById("page-info");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

function renderGallery(page) {
    galleryGrid.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    const itemsToShow = galleryItems.slice(start, end);

    itemsToShow.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("gallery__item");
        div.setAttribute("data-aos", "fade-up");
        div.setAttribute("data-aos-delay", index * 100);
        div.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
        galleryGrid.appendChild(div);
    });

    pageInfo.textContent = `Page ${page} of ${totalPages}`;
    prevButton.disabled = page === 1;
    nextButton.disabled = page === totalPages;

    // Reinitializing AOS for new elements
    AOS.init();
}

prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderGallery(currentPage);
    }
});

nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderGallery(currentPage);
    }
});

renderGallery(currentPage);

  // Código para el efecto de pase de página del cómic
  const comicPages = document.querySelectorAll('.page');
  let currentPageIndex = 0;

  function showPage(index) {
      comicPages.forEach((page, i) => {
          page.classList.remove('active', 'previous');
          if (i === index) {
              page.classList.add('active');
          } else if (i === currentPageIndex) {
              page.classList.add('previous');
          }
      });
      currentPageIndex = index;
  }

  document.getElementById('next1').addEventListener('click', function () {
      if (currentPageIndex < comicPages.length - 1) {
          showPage(currentPageIndex + 1);
      }
  });

  document.getElementById('prev1').addEventListener('click', function () {
      if (currentPageIndex > 0) {
          showPage(currentPageIndex - 1);
      }
  });

  showPage(currentPageIndex);

});
