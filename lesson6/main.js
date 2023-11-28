let video, playPauseBtn, stopBtn, slider, loopBtn;
video = document.querySelector(".video");
playPauseBtn = document.querySelector(".playPauseBtn");
stopBtn = document.querySelector(".stop");
slider = document.querySelector(".slider");
loopBtn = document.querySelector(".loop");
expandBtn = document.querySelector(".expand");
timer = document.querySelector(".timer");


// تابعی که باید بعد از تغییر اندازه صفحه اجرا شود
function afterResize() {
    // اینجا کد‌های خود را بنویسید
    
    // if ($(window).width() < 2000) {
        
       
    console.log("تغییر اندازه انجام شد!");
}

// تعریف تابع برای اجرا هنگام تغییر اندازه صفحه
function handleResize() {
    if (window.innerWidth < 600) {
        var videoFile = 'Black_Cats160p.mp4';
        $('#v1').attr('src',videoFile);
        $('#VideoQuality').text('Video Quality: 144p');
    }

    if (window.innerWidth > 600 && window.innerWidth < 1000) {
        var videoFile = 'Black_Cats255p.mp4';
        $('#v1').attr('src',videoFile);
        $('#VideoQuality').text('Video Quality: 255p');
    }

    if (window.innerWidth > 1000) {
        var videoFile = 'Black_Cats360p.mp4';
        $('#v1').attr('src',videoFile);
        $('#VideoQuality').text('Video Quality: 360p');
    }
  }

  // اضافه کردن یک گوش کننده به رویداد تغییر اندازه صفحه
  window.addEventListener('resize', handleResize);

  // استفاده از ResizeObserver برای اجرای تابع بدون نیاز به رفرش صفحه
  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(document.body);




function updateIcon() {
  if (video.paused) {
    playPauseBtn.innerHTML = "<i class='fas fa-play'></i>";
    playPauseBtn.style.color = "#30ff30";
  } else {
    playPauseBtn.innerHTML = "<i class='fas fa-pause'></i>";
    playPauseBtn.style.color = "#f4f4f4";
  }
}
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function stopVideo() {
  video.currentTime = 0;
  setSliderAndTimer();
  video.pause();
}

function setSliderAndTimer() {
  //get minutes
  let minutes = Math.floor(video.currentTime / 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  //get seconds
  let seconds = Math.floor(video.currentTime % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
  slider.value = (video.currentTime / video.duration) * 100;
  if (video.currentTime == video.duration) {
    slider.value = 0;
    stopVideo();
  }
}
function seeked() {
  video.currentTime = (slider.value / 100) * video.duration;
}
function changeLoopStatus() {
  if (loopBtn.classList.contains("loop-off")) {
    loopBtn.classList.remove("loop-off");
    loopBtn.classList.add("loop-on");
    video.loop = true;
  } else {
    loopBtn.classList.remove("loop-on");
    loopBtn.classList.add("loop-off");
    video.loop = false;
  }
}
function openFullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    /* Firefox */
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    /* IE/Edge */
    video.msRequestFullscreen();
  }
}

//event listeners
playPauseBtn.addEventListener("click", toggleVideoStatus);
video.addEventListener("play", updateIcon);
video.addEventListener("pause", updateIcon);
stopBtn.addEventListener("click", stopVideo);
video.addEventListener("timeupdate", setSliderAndTimer);
slider.addEventListener("input", seeked);
loopBtn.addEventListener("click", changeLoopStatus);
expandBtn.addEventListener("click", openFullscreen);