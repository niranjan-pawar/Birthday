
document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       GET ELEMENTS
    ========================================= */

    const intro = document.getElementById("intro");
    const mainContent = document.getElementById("mainContent");

    // Supports either button ID
    const openButton =
        document.getElementById("openButton") ||
        document.getElementById("heartButton") ||
        document.getElementById("openHeartButton");

    const music =
        document.getElementById("backgroundMusic");

    const musicButton =
        document.getElementById("musicButton");

    const musicIcon =
        document.getElementById("musicIcon");

    const video =
        document.getElementById("birthdayVideo");

    const letterSection =
        document.getElementById("letterSection");

    const celebrateButton =
        document.getElementById("celebrateButton");


    /* =========================================
       INITIAL STATE
    ========================================= */

    document.body.classList.add("no-scroll");

    let musicPlaying = false;


    /* =========================================
       OPEN MY HEART / OPEN SURPRISE
    ========================================= */

    if (openButton) {

        openButton.addEventListener("click", async (event) => {

            event.preventDefault();

            console.log("❤️ Open My Heart button clicked");


            /* -------------------------------------
               START MUSIC
            ------------------------------------- */

            if (music) {

                try {

                    music.volume = 0.45;

                    await music.play();

                    musicPlaying = true;

                    if (musicButton) {
                        musicButton.classList.add("playing");
                    }

                    if (musicIcon) {
                        musicIcon.textContent = "♫";
                    }

                } catch (error) {

                    console.log(
                        "Music could not start:",
                        error
                    );

                    /*
                     The website should still open
                     even if music cannot play.
                    */

                }

            }


            /* -------------------------------------
               HIDE INTRO
            ------------------------------------- */

            if (intro) {
                intro.classList.add("hide");
            }


            /* -------------------------------------
               SHOW MAIN WEBSITE
            ------------------------------------- */

            if (mainContent) {

                mainContent.classList.remove("hidden");

                /*
                    Some redesigned versions use
                    opacity/visibility instead of
                    display:none.
                */

                mainContent.style.display = "block";
                mainContent.style.visibility = "visible";
                mainContent.style.opacity = "1";

            }


            /* -------------------------------------
               ENABLE SCROLLING
            ------------------------------------- */

            document.body.classList.remove("no-scroll");

            document.documentElement.style.overflowY = "auto";
            document.body.style.overflowY = "auto";


            /* -------------------------------------
               CREATE ROMANTIC HEARTS
            ------------------------------------- */

            createHearts(20);


            /* -------------------------------------
               GO TO TOP OF WEBSITE
            ------------------------------------- */

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });


            /* -------------------------------------
               Remove intro after animation
            ------------------------------------- */

            setTimeout(() => {

                if (intro) {
                    intro.style.display = "none";
                }

            }, 1500);

        });

    } else {

        console.error(
            "❌ Open button not found. Check the button ID in index.html."
        );

    }


    /* =========================================
       MUSIC BUTTON
    ========================================= */

    if (musicButton && music) {

        musicButton.addEventListener(
            "click",
            async () => {

                if (music.paused) {

                    try {

                        music.volume = 0.45;

                        await music.play();

                        musicPlaying = true;

                        musicButton.classList.add(
                            "playing"
                        );

                        if (musicIcon) {
                            musicIcon.textContent = "♫";
                        }

                    } catch (error) {

                        console.log(error);

                    }

                } else {

                    music.pause();

                    musicPlaying = false;

                    musicButton.classList.remove(
                        "playing"
                    );

                    if (musicIcon) {
                        musicIcon.textContent = "♪";
                    }

                }

            }
        );

    }


    /* =========================================
       VIDEO
    ========================================= */

    if (video && music) {

        video.addEventListener("play", () => {

            /*
                Lower background music while
                the birthday video is playing.
            */

            music.volume = 0.10;

        });


        video.addEventListener("pause", () => {

            if (!music.paused) {
                music.volume = 0.45;
            }

        });


        video.addEventListener("ended", () => {

            music.volume = 0.45;

            createHearts(30);


            /*
                Automatically move to letter
            */

            if (letterSection) {

                setTimeout(() => {

                    letterSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 1200);

            }

        });

    }


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".letter-card, .memory-card, .love-card, .section-heading"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        observer.observe(element);

    });


    /* =========================================
       FLOATING HEARTS
    ========================================= */

    function createHearts(amount = 10) {

        for (let i = 0; i < amount; i++) {

            setTimeout(() => {

                const heart =
                    document.createElement("div");

                heart.className =
                    "heart-particle";

                heart.innerHTML =
                    Math.random() > 0.5
                        ? "♥"
                        : "♡";


                /*
                    Position
                */

                heart.style.left =
                    Math.random() * 100 + "vw";


                /*
                    Size
                */

                const size =
                    12 + Math.random() * 25;

                heart.style.fontSize =
                    size + "px";


                /*
                    Animation duration
                */

                heart.style.animationDuration =
                    (4 + Math.random() * 4) + "s";


                /*
                    Random horizontal movement
                */

                heart.style.setProperty(
                    "--drift",
                    (Math.random() * 100 - 50) + "px"
                );


                document.body.appendChild(
                    heart
                );


                setTimeout(() => {

                    heart.remove();

                }, 9000);

            }, i * 120);

        }

    }


    /* =========================================
       FINAL CELEBRATION
    ========================================= */

    if (celebrateButton) {

        celebrateButton.addEventListener(
            "click",
            () => {

                createHearts(60);

                createConfetti(120);


                if (music) {

                    music.volume = 0.60;

                    if (music.paused) {

                        music.play().catch(() => {});

                    }

                }


                /*
                    Romantic screen effect
                */

                document.body.classList.add(
                    "celebration-mode"
                );


                setTimeout(() => {

                    document.body.classList.remove(
                        "celebration-mode"
                    );

                }, 4000);

            }
        );

    }


    /* =========================================
       CONFETTI
    ========================================= */

    function createConfetti(amount = 80) {

        const colors = [
            "#d9b56d",
            "#e9a8b8",
            "#ffffff",
            "#b85c72",
            "#f3c6d2"
        ];


        for (let i = 0; i < amount; i++) {

            setTimeout(() => {

                const piece =
                    document.createElement("div");

                piece.className =
                    "confetti";


                piece.style.left =
                    Math.random() * 100 + "vw";


                piece.style.width =
                    (5 + Math.random() * 7) + "px";


                piece.style.height =
                    (8 + Math.random() * 12) + "px";


                piece.style.background =
                    colors[
                        Math.floor(
                            Math.random() *
                            colors.length
                        )
                    ];


                piece.style.animationDuration =
                    (3 + Math.random() * 3) + "s";


                piece.style.transform =
                    `rotate(${Math.random() * 360}deg)`;


                document.body.appendChild(
                    piece
                );


                setTimeout(() => {

                    piece.remove();

                }, 7000);

            }, i * 20);

        }

    }


    /* =========================================
       RANDOM HEARTS WHILE SCROLLING
    ========================================= */

    let lastHeartTime = 0;


    window.addEventListener(
        "scroll",
        () => {

            const now = Date.now();


            if (
                now - lastHeartTime >
                1800
            ) {

                if (
                    Math.random() >
                    0.55
                ) {

                    createHearts(1);

                }

                lastHeartTime = now;

            }

        }
    );


    /* =========================================
       PAGE VISIBILITY
    ========================================= */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden &&
                music &&
                !music.paused
            ) {

                music.pause();

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

        }
    );


});

