const fileInput = document.getElementById("audio-file");
      const audio = document.getElementById("audio");
      const progress = document.querySelector('input[name="progress"]');
      const playPause = document.querySelector(".play-pause");
      const songTitle = document.querySelector(".song-title");

      fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (!file) return;

        audio.src = URL.createObjectURL(file);
        songTitle.textContent = file.name.replace(/\.[^/.]+$/, "");
        audio.play();
      });

      playPause.addEventListener("click", () => {
        if (!audio.src) return;
        if (audio.paused) audio.play();
        else audio.pause();
      });

      audio.addEventListener("loadedmetadata", () => {
        progress.max = audio.duration;
      });

      audio.addEventListener("timeupdate", () => {
        progress.value = audio.currentTime;
      });

      progress.addEventListener("input", () => {
        audio.currentTime = progress.value;
      });

      audio.addEventListener("play", () => {
        playPause.textContent = "❚❚";
      });

      audio.addEventListener("pause", () => {
        playPause.textContent = "▶";
      });