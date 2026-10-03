document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GET ELEMENTS
    ====================================================== */

    const intro = document.getElementById("intro");
    const mainContent = document.getElementById("mainContent");

    const openButton =
        document.getElementById("openButton") ||
        document.getElementById("heartButton") ||
        document.getElementById("openHeartButton");

    const music = document.getElementById("backgroundMusic");
    const musicButton = document.getElementById("musicButton");
    const musicIcon = document.getElementById("musicIcon");

    const video = document.getElementById("birthdayVideo");
    const letterSection = document.getElementById("letterSection");
    const celebrateButton = document.getElementById("celebrateButton");

    const countdownScreen =
        document.getElementById("countdownScreen");

    const countdownNumber =
        document.getElementById("countdownNumber");

    const birthdayMessage =
        document.getElementById("birthdayMessage");

    const photosSection =
        document.getElementById("photosSection");

    const slideshowDots =
        document.getElementById("slideshowDots");

    const photoProgress =
        document.getElementById("photoProgress");


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    document.body.classList.add("no-scroll");

    let musicPlaying = false;
    let openingStarted = false;
    let slideshowStarted = false;

    let currentSlide = 0;
    let photoTimer = null;


    /* =====================================================
       WAIT FUNCTION
    ====================================================== */

    function wait(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }


    /* =====================================================
       BACKGROUND MUSIC
       FILE:
       music/romantic_birthday_instrumental.mp3.mp3
    ====================================================== */

    async function startMusic() {

        if (!music) {

            console.error(
                "❌ backgroundMusic element not found."
            );

            return false;
        }

        console.log(
            "🎵 Trying to start music..."
        );

        console.log(
            "🎵 Music URL:",
            music.currentSrc || music.src
        );

        try {

            music.muted = false;
            music.volume = 0.45;

            /*
             * IMPORTANT:
             * Do NOT use music.load() here.
             */

            const playPromise = music.play();

            if (playPromise !== undefined) {
                await playPromise;
            }

            musicPlaying = true;

            console.log(
                "✅ MUSIC IS PLAYING"
            );

            if (musicButton) {

                musicButton.classList.add(
                    "playing"
                );

            }

            if (musicIcon) {

                musicIcon.textContent =
                    "♫";

            }

            return true;

        } catch (error) {

            musicPlaying = false;

            console.error(
                "❌ MUSIC FAILED TO PLAY"
            );

            console.error(
                "Error name:",
                error.name
            );

            console.error(
                "Error message:",
                error.message
            );

            if (musicButton) {

                musicButton.classList.remove(
                    "playing"
                );

                musicButton.style.display =
                    "flex";

                musicButton.style.opacity =
                    "1";

                musicButton.style.pointerEvents =
                    "auto";
            }

            if (musicIcon) {

                musicIcon.textContent =
                    "♪";

            }

            return false;
        }
    }


    /* =====================================================
       OPEN MY HEART
    ====================================================== */

    if (openButton) {

        openButton.addEventListener(
            "click",
            async (event) => {

                event.preventDefault();

                if (openingStarted) {
                    return;
                }

                openingStarted = true;

                openButton.disabled = true;

                console.log(
                    "❤️ Open My Heart clicked"
                );


                /* =================================================
                   START MUSIC IMMEDIATELY
                ================================================== */

                /*
                 * This is intentionally NOT awaited.
                 * It starts directly from the user's click.
                 */

                startMusic();


                /* =================================================
                   HIDE INTRO
                ================================================== */

                if (intro) {

                    intro.classList.add(
                        "hide"
                    );

                }


                /* =================================================
                   SHOW COUNTDOWN
                ================================================== */

                if (countdownScreen) {

                    countdownScreen.classList.remove(
                        "hidden"
                    );

                    countdownScreen.style.display =
                        "flex";

                }


                /* =================================================
                   COUNTDOWN
                ================================================== */

                await showCountdownNumber("3");

                await showCountdownNumber("2");

                await showCountdownNumber("1");


                /* =================================================
                   HAPPY BIRTHDAY
                ================================================== */

                if (countdownNumber) {

                    countdownNumber.style.display =
                        "none";

                }

                if (birthdayMessage) {

                    birthdayMessage.classList.add(
                        "show"
                    );

                }

                createHearts(30);


                /* =================================================
                   WAIT
                ================================================== */

                await wait(2500);


                /* =================================================
                   HIDE COUNTDOWN
                ================================================== */

                if (countdownScreen) {

                    countdownScreen.classList.add(
                        "hide-countdown"
                    );

                }

                await wait(900);


                if (countdownScreen) {

                    countdownScreen.style.display =
                        "none";

                }


                /* =================================================
                   SHOW MAIN CONTENT
                ================================================== */

                if (mainContent) {

                    mainContent.classList.remove(
                        "hidden"
                    );

                    mainContent.style.display =
                        "block";

                    mainContent.style.visibility =
                        "visible";

                    mainContent.style.opacity =
                        "1";

                }


                /* =================================================
                   ENABLE SCROLL
                ================================================== */

                document.body.classList.remove(
                    "no-scroll"
                );

                document.documentElement.style.overflowY =
                    "auto";

                document.body.style.overflowY =
                    "auto";


                /* =================================================
                   MORE HEARTS
                ================================================== */

                createHearts(35);


                /* =================================================
                   START PHOTO EXPERIENCE
                ================================================== */

                await wait(1500);

                startPhotoExperience();

            }
        );

    } else {

        console.error(
            "❌ Open button not found."
        );

    }


    /* =====================================================
       COUNTDOWN
    ====================================================== */

    async function showCountdownNumber(number) {

        if (!countdownNumber) {
            return;
        }

        countdownNumber.style.display =
            "block";

        countdownNumber.textContent =
            number;

        countdownNumber.classList.remove(
            "countdown-pop"
        );

        void countdownNumber.offsetWidth;

        countdownNumber.classList.add(
            "countdown-pop"
        );

        await wait(1000);
    }


    /* =====================================================
       MUSIC BUTTON
    ====================================================== */

    if (musicButton && music) {

        musicButton.addEventListener(
            "click",
            async (event) => {

                event.preventDefault();

                console.log(
                    "🎵 Music button clicked"
                );


                if (music.paused) {

                    const started =
                        await startMusic();

                    if (started) {

                        console.log(
                            "✅ Music resumed"
                        );

                    }

                } else {

                    music.pause();

                    musicPlaying = false;

                    musicButton.classList.remove(
                        "playing"
                    );

                    if (musicIcon) {

                        musicIcon.textContent =
                            "♪";

                    }

                    console.log(
                        "⏸️ Music paused"
                    );

                }

            }
        );

    }


    /* =====================================================
       MUSIC EVENTS
    ====================================================== */

    if (music) {

        music.addEventListener(
            "play",
            () => {

                musicPlaying = true;

                if (musicButton) {

                    musicButton.classList.add(
                        "playing"
                    );

                }

                if (musicIcon) {

                    musicIcon.textContent =
                        "♫";

                }

            }
        );


        music.addEventListener(
            "playing",
            () => {

                musicPlaying = true;

                console.log(
                    "🎵 Audio is actually playing."
                );

            }
        );


        music.addEventListener(
            "pause",
            () => {

                musicPlaying = false;

                if (musicButton) {

                    musicButton.classList.remove(
                        "playing"
                    );

                }

                if (musicIcon) {

                    musicIcon.textContent =
                        "♪";

                }

            }
        );


        music.addEventListener(
            "canplay",
            () => {

                console.log(
                    "🎵 Music file loaded successfully."
                );

            }
        );


        music.addEventListener(
            "error",
            () => {

                console.error(
                    "❌ MUSIC FILE ERROR"
                );

                console.error(
                    "Expected file:",
                    "./music/romantic_birthday_instrumental.mp3.mp3"
                );

                console.error(
                    "Browser URL:",
                    music.currentSrc || music.src
                );

                if (music.error) {

                    console.error(
                        "Error code:",
                        music.error.code
                    );

                }

            }
        );

    }


    /* =====================================================
       PHOTO SLIDESHOW
    ====================================================== */

    const slides =
        document.querySelectorAll(
            ".slide"
        );


    /* =====================================================
       CREATE DOTS
    ====================================================== */

    if (
        slideshowDots &&
        slides.length > 0
    ) {

        slideshowDots.innerHTML = "";

        slides.forEach(
            (slide, index) => {

                const dot =
                    document.createElement(
                        "div"
                    );

                dot.className =
                    "slideshow-dot";

                if (index === 0) {

                    dot.classList.add(
                        "active"
                    );

                }

                slideshowDots.appendChild(
                    dot
                );

            }
        );

    }


    /* =====================================================
       SHOW SLIDE
    ====================================================== */

    function showSlide(index) {

        if (!slides.length) {
            return;
        }

        if (index < 0) {
            index = 0;
        }

        if (index >= slides.length) {
            index = slides.length - 1;
        }

        slides.forEach(
            slide => {

                slide.classList.remove(
                    "active"
                );

            }
        );

        slides[index].classList.add(
            "active"
        );


        const dots =
            document.querySelectorAll(
                ".slideshow-dot"
            );

        dots.forEach(
            dot => {

                dot.classList.remove(
                    "active"
                );

            }
        );

        if (dots[index]) {

            dots[index].classList.add(
                "active"
            );

        }


        if (photoProgress) {

            photoProgress.textContent =
                `${index + 1} / ${slides.length}`;

        }

    }


    /* =====================================================
       START PHOTO EXPERIENCE
    ====================================================== */

    function startPhotoExperience() {

        if (slideshowStarted) {
            return;
        }

        slideshowStarted = true;


        if (!slides.length) {

            playBirthdayVideo();

            return;

        }


        currentSlide = 0;

        showSlide(
            currentSlide
        );


        photoTimer =
            setInterval(
                () => {

                    currentSlide++;


                    if (
                        currentSlide >=
                        slides.length
                    ) {

                        clearInterval(
                            photoTimer
                        );

                        photoTimer = null;


                        wait(1200).then(
                            () => {

                                playBirthdayVideo();

                            }
                        );

                        return;

                    }


                    showSlide(
                        currentSlide
                    );

                    createHearts(2);

                },
                4000
            );

    }


    /* =====================================================
       SCROLL TO PHOTOS
    ====================================================== */

    async function scrollToPhotos() {

        if (!photosSection) {
            return;
        }

        await wait(500);

        photosSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    /* =====================================================
       PLAY BIRTHDAY VIDEO
    ====================================================== */

    async function playBirthdayVideo() {

        if (!video) {

            console.log(
                "🎬 Birthday video not found."
            );

            return;
        }

        console.log(
            "🎬 All photos finished."
        );

        console.log(
            "🎬 Starting birthday video."
        );


        const videoSection =
            document.getElementById(
                "videoSection"
            );


        if (videoSection) {

            videoSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        await wait(1000);


        try {

            video.currentTime = 0;

        } catch (error) {

            console.log(
                "Could not reset video."
            );

        }


        /* -----------------------------------------
           TRY VIDEO WITH SOUND
        ------------------------------------------ */

        try {

            video.muted = false;

            await video.play();

            console.log(
                "🎬 Video playing with sound."
            );

        } catch (error) {

            console.log(
                "⚠️ Video autoplay with sound blocked.",
                error
            );


            /* -----------------------------------------
               TRY MUTED
            ------------------------------------------ */

            try {

                video.muted = true;

                await video.play();

                console.log(
                    "🎬 Video playing muted."
                );

                showVideoSoundMessage();

            } catch (secondError) {

                console.log(
                    "❌ Video autoplay completely blocked.",
                    secondError
                );

            }

        }

    }


    /* =====================================================
       VIDEO SOUND MESSAGE
    ====================================================== */

    function showVideoSoundMessage() {

        const oldMessage =
            document.getElementById(
                "videoSoundMessage"
            );

        if (oldMessage) {
            oldMessage.remove();
        }


        const message =
            document.createElement(
                "div"
            );

        message.id =
            "videoSoundMessage";

        message.textContent =
            "🔊 Tap the video to turn sound on";


        message.style.position =
            "fixed";

        message.style.left =
            "50%";

        message.style.bottom =
            "90px";

        message.style.transform =
            "translateX(-50%)";

        message.style.zIndex =
            "10000";

        message.style.padding =
            "12px 20px";

        message.style.borderRadius =
            "30px";

        message.style.background =
            "rgba(30,5,15,.95)";

        message.style.color =
            "#f3c6d2";

        message.style.border =
            "1px solid rgba(217,181,109,.5)";

        message.style.fontSize =
            "13px";

        message.style.textAlign =
            "center";

        message.style.pointerEvents =
            "none";


        document.body.appendChild(
            message
        );


        setTimeout(
            () => {

                message.remove();

            },
            5000
        );

    }


    /* =====================================================
       VIDEO EVENTS
    ====================================================== */

    if (video) {

        video.addEventListener(
            "play",
            () => {

                if (
                    music &&
                    !music.paused
                ) {

                    music.volume =
                        0.10;

                }

            }
        );


        video.addEventListener(
            "pause",
            () => {

                if (
                    music &&
                    !music.paused
                ) {

                    music.volume =
                        0.45;

                }

            }
        );


        video.addEventListener(
            "ended",
            () => {

                console.log(
                    "🎬 Video finished."
                );


                if (music) {

                    music.volume =
                        0.45;

                }


                createHearts(30);


                if (letterSection) {

                    setTimeout(
                        () => {

                            letterSection.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        },
                        1200
                    );

                }

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".letter-card, .memory-card, .love-card, .section-heading, .video-frame, .photo-slideshow, .final-content"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       FLOATING HEARTS
    ====================================================== */

    function createHearts(
        amount = 10
    ) {

        for (
            let i = 0;
            i < amount;
            i++
        ) {

            setTimeout(
                () => {

                    const heart =
                        document.createElement(
                            "div"
                        );

                    heart.className =
                        "heart-particle";

                    heart.innerHTML =
                        Math.random() > 0.5
                            ? "♥"
                            : "♡";


                    heart.style.left =
                        Math.random() *
                        100 +
                        "vw";


                    const size =
                        12 +
                        Math.random() *
                        25;

                    heart.style.fontSize =
                        size +
                        "px";


                    heart.style.animationDuration =
                        4 +
                        Math.random() *
                        4 +
                        "s";


                    heart.style.setProperty(
                        "--drift",
                        (
                            Math.random() *
                            100 -
                            50
                        ) +
                        "px"
                    );


                    document.body.appendChild(
                        heart
                    );


                    setTimeout(
                        () => {

                            heart.remove();

                        },
                        9000
                    );

                },
                i * 120
            );

        }

    }


    /* =====================================================
       FINAL CELEBRATION
    ====================================================== */

    if (celebrateButton) {

        celebrateButton.addEventListener(
            "click",
            async () => {

                createHearts(60);

                createConfetti(120);


                if (music) {

                    music.volume =
                        0.60;

                    if (music.paused) {

                        await startMusic();

                    }

                }


                document.body.classList.add(
                    "celebration-mode"
                );


                setTimeout(
                    () => {

                        document.body.classList.remove(
                            "celebration-mode"
                        );

                    },
                    4000
                );

            }
        );

    }


    /* =====================================================
       CONFETTI
    ====================================================== */

    function createConfetti(
        amount = 80
    ) {

        const colors = [
            "#d9b56d",
            "#e9a8b8",
            "#ffffff",
            "#b85c72",
            "#f3c6d2"
        ];


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            setTimeout(
                () => {

                    const piece =
                        document.createElement(
                            "div"
                        );

                    piece.className =
                        "confetti";


                    piece.style.left =
                        Math.random() *
                        100 +
                        "vw";


                    piece.style.width =
                        5 +
                        Math.random() *
                        7 +
                        "px";


                    piece.style.height =
                        8 +
                        Math.random() *
                        12 +
                        "px";


                    piece.style.background =
                        colors[
                            Math.floor(
                                Math.random() *
                                colors.length
                            )
                        ];


                    piece.style.animationDuration =
                        3 +
                        Math.random() *
                        3 +
                        "s";


                    piece.style.transform =
                        `rotate(${Math.random() * 360}deg)`;


                    document.body.appendChild(
                        piece
                    );


                    setTimeout(
                        () => {

                            piece.remove();

                        },
                        7000
                    );

                },
                i * 20
            );

        }

    }


    /* =====================================================
       RANDOM HEARTS WHILE SCROLLING
    ====================================================== */

    let lastHeartTime = 0;


    window.addEventListener(
        "scroll",
        () => {

            const now =
                Date.now();


            if (
                now -
                lastHeartTime >
                1800
            ) {

                if (
                    Math.random() >
                    0.55
                ) {

                    createHearts(1);

                }

                lastHeartTime =
                    now;

            }

        }
    );


    /* =====================================================
       PAGE VISIBILITY
    ====================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden &&
                music &&
                !music.paused
            ) {

                music.pause();

                musicPlaying =
                    false;


                if (musicButton) {

                    musicButton.classList.remove(
                        "playing"
                    );

                }


                if (musicIcon) {

                    musicIcon.textContent =
                        "♪";

                }

            }

        }
    );


    /* =====================================================
       STARTUP DEBUG
    ====================================================== */

    console.log(
        "💖 Birthday website initialized."
    );


    if (music) {

        console.log(
            "🎵 Music element found."
        );

        console.log(
            "🎵 Expected music file:",
            "./music/romantic_birthday_instrumental.mp3.mp3"
        );

        console.log(
            "🎵 Browser music URL:",
            music.currentSrc || music.src
        );

    } else {

        console.error(
            "❌ Music element was NOT found."
        );

    }

});