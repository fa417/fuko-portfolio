// メニュー
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.works-menu-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      const menuItem = toggle.closest('.has-sub-menu');
      if (!menuItem) return;

      document.querySelectorAll('.has-sub-menu.open').forEach(openItem => {
        if (openItem !== menuItem) openItem.classList.remove('open');
      });

      menuItem.classList.toggle('open');
    });
  });

  // ライトモード切替
  const lightToggle = document.getElementById('light-toggle');
  if (lightToggle) {
    lightToggle.addEventListener('click', (e) => {
      e.preventDefault();
      document.documentElement.removeAttribute('data-theme');
    });
  }
  // 

  // ダークモード切替
  const darkToggle = document.getElementById('dark-toggle');
  if (darkToggle) {
    darkToggle.addEventListener('click', (e) => {
      e.preventDefault();
      document.documentElement.setAttribute('data-theme', 'dark');
    });
  }
  // 

  // SPメニュー
  const menuButton = document.getElementById('menu-button');
  const mainMenu = document.getElementById('main-menu');

  if (menuButton && mainMenu) {
    menuButton.addEventListener('click', () => {
      const isSP = window.matchMedia('(max-width:768px)').matches;
      if (!isSP) {
        mainMenu.classList.toggle('open');
      }
    });
  }
  // 

  // 画像切替処理
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainPicture = document.getElementById('mainPicture');
  const mainImage = document.getElementById('mainImage');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  function updateMainImage(pcSrc, spSrc) {
    const sources = mainPicture?.querySelectorAll('source') || [];
    const isPC = window.matchMedia('(min-width: 768px)').matches;

    if (sources.length >= 2) {
      sources[0].srcset = pcSrc;
      sources[1].srcset = spSrc;
    }
    if (mainImage) {
      mainImage.src = isPC ? pcSrc : spSrc;
    }
  }

  function updateThumbnails() {
    const isPC = window.matchMedia('(min-width: 768px)').matches;
    thumbnails.forEach(thumb => {
      thumb.src = isPC ? thumb.dataset.pc : thumb.dataset.sp;
    });
  }

  if (thumbnails.length) {
    updateThumbnails();

    const selected = document.querySelector('.thumbnail.selected');
    if (selected) {
      updateMainImage(selected.dataset.pc, selected.dataset.sp);
    }

    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('selected'));
        thumb.classList.add('selected');
        updateMainImage(thumb.dataset.pc, thumb.dataset.sp);
      });
    });

    window.addEventListener('resize', () => {
      updateThumbnails();
      const selected = document.querySelector('.thumbnail.selected');
      if (selected) {
        updateMainImage(selected.dataset.pc, selected.dataset.sp);
      }
    });

    function changeImageByArrow(direction) {
      const thumbsArray = Array.from(thumbnails);
      const current = document.querySelector('.thumbnail.selected');
      const currentIndex = thumbsArray.indexOf(current);

      let newIndex = currentIndex + direction;
      if (newIndex < 0) newIndex = thumbsArray.length - 1;
      if (newIndex >= thumbsArray.length) newIndex = 0;

      const newThumb = thumbsArray[newIndex];
      thumbnails.forEach(t => t.classList.remove('selected'));
      newThumb.classList.add('selected');
      updateMainImage(newThumb.dataset.pc, newThumb.dataset.sp);
    }

    if (leftArrow) {
      leftArrow.addEventListener('click', () => changeImageByArrow(-1));
    }
    if (rightArrow) {
      rightArrow.addEventListener('click', () => changeImageByArrow(1));
    }
  }
});
// 
