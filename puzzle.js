/* =====================================================
   PUZZLE GAME + FINAL BIRTHDAY CAKE EXPERIENCE

   FLOW:

   ROUND 1
      ↓
   ROUND 2
      ↓
   ROUND 3
      ↓
   RECORDED VOICE
      ↓
   VOICE FINISHES
      ↓
   CAKE + CANDLES
      ↓
   BLOW CANDLES
      ↓
   CAKE CUTTING
      ↓
   CONFETTI + FINAL MESSAGE
===================================================== */


document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       ELEMENTS
    ================================================== */

    const round1 =
        document.getElementById("round1");

    const round2 =
        document.getElementById("round2");

    const round3 =
        document.getElementById("round3");

    const finalRound =
        document.getElementById("finalRound");

    const celebration =
        document.getElementById("celebration");

    const datePuzzle =
        document.getElementById("datePuzzle");

    const imagePuzzle =
        document.getElementById("imagePuzzle");

    const step1 =
        document.getElementById("step1");

    const step2 =
        document.getElementById("step2");

    const step3 =
        document.getElementById("step3");


    /* =================================================
       SAFETY CHECK
    ================================================== */

    if (
        !round1 ||
        !round2 ||
        !round3 ||
        !finalRound ||
        !celebration ||
        !datePuzzle ||
        !imagePuzzle
    ) {

        console.warn(
            "Puzzle elements are missing from the HTML."
        );

        return;

    }


    /* =================================================
       ROUND 1 — DATE PUZZLE
    ================================================== */

    const dates = [

        {
            id: "date3",
            date: "23 OCT",
            name: "Mrunal's Birthday",
            correct: 3
        },

        {
            id: "date1",
            date: "FIRST",
            name: "Our First Memory",
            correct: 1
        },

        {
            id: "date4",
            date: "TODAY",
            name: "This Surprise",
            correct: 4
        },

        {
            id: "date2",
            date: "SPECIAL",
            name: "A Beautiful Moment",
            correct: 2
        }

    ];


    let shuffledDates =
        [...dates].sort(
            () => Math.random() - 0.5
        );


    function createDatePuzzle() {

        datePuzzle.innerHTML = "";


        shuffledDates.forEach(item => {

            const card =
                document.createElement("div");


            card.className =
                "date-card";


            card.draggable = true;


            card.dataset.id =
                item.id;


            card.innerHTML = `

                <div class="date-number">
                    ${item.date}
                </div>

                <div class="date-name">
                    ${item.name}
                </div>

            `;


            datePuzzle.appendChild(card);

        });


        enableDateDragging();

    }


    function enableDateDragging() {

        const cards =
            document.querySelectorAll(
                "#datePuzzle .date-card"
            );


        let dragged = null;


        cards.forEach(card => {


            card.addEventListener(
                "dragstart",
                event => {

                    dragged = card;

                    card.classList.add(
                        "dragging"
                    );


                    if (
                        event.dataTransfer
                    ) {

                        event.dataTransfer.effectAllowed =
                            "move";

                    }

                }
            );


            card.addEventListener(
                "dragend",
                () => {

                    card.classList.remove(
                        "dragging"
                    );

                    dragged = null;

                }
            );


            card.addEventListener(
                "dragover",
                event => {

                    event.preventDefault();

                }
            );


            card.addEventListener(
                "drop",
                event => {

                    event.preventDefault();


                    if (
                        !dragged ||
                        dragged === card
                    ) {

                        return;

                    }


                    const allCards =
                        [
                            ...datePuzzle.children
                        ];


                    const draggedIndex =
                        allCards.indexOf(
                            dragged
                        );


                    const targetIndex =
                        allCards.indexOf(
                            card
                        );


                    if (
                        draggedIndex <
                        targetIndex
                    ) {

                        datePuzzle.insertBefore(
                            dragged,
                            card.nextSibling
                        );

                    } else {

                        datePuzzle.insertBefore(
                            dragged,
                            card
                        );

                    }

                }
            );

        });

    }


    createDatePuzzle();


    const checkDatesButton =
        document.getElementById(
            "checkDates"
        );


    if (checkDatesButton) {

        checkDatesButton.addEventListener(
            "click",
            checkDates
        );

    }


    function checkDates() {

        const cards =
            [
                ...datePuzzle.children
            ];


        let correct = true;


        cards.forEach(
            (card, index) => {

                const expected =
                    dates.find(
                        date =>
                            date.correct ===
                            index + 1
                    );


                if (
                    !expected ||
                    card.dataset.id !==
                    expected.id
                ) {

                    correct = false;

                }

            }
        );


        const message =
            document.getElementById(
                "dateMessage"
            );


        if (!correct) {

            if (message) {

                message.textContent =
                    "Almost... ❤️ Try arranging the memories again.";

            }

            return;

        }


        if (message) {

            message.textContent =
                "Perfect! You remembered. ❤️";

        }


        if (checkDatesButton) {

            checkDatesButton.disabled =
                true;

        }


        completeRound(
            1,
            () => {

                if (step1) {

                    step1.classList.add(
                        "completed"
                    );

                }


                if (step2) {

                    step2.classList.add(
                        "active"
                    );

                }


                round1.classList.remove(
                    "active-round"
                );


                round2.classList.add(
                    "active-round"
                );


                createImagePuzzle();

            }
        );

    }


    /* =================================================
       ROUND 2 — IMAGE PUZZLE
    ================================================== */

    const puzzleSize = 9;


    let imageOrder =
        [...Array(puzzleSize).keys()]
            .sort(
                () =>
                    Math.random() - 0.5
            );


    function createImagePuzzle() {

        imagePuzzle.innerHTML = "";


        imageOrder.forEach(
            position => {

                const piece =
                    document.createElement(
                        "div"
                    );


                piece.className =
                    "puzzle-piece";


                piece.draggable = true;


                piece.dataset.position =
                    position;


                const row =
                    Math.floor(
                        position / 3
                    );


                const column =
                    position % 3;


                piece.style.backgroundPosition =
                    `${column * 50}% ${row * 50}%`;


                imagePuzzle.appendChild(
                    piece
                );

            }
        );


        enableImageDragging();

    }


    function enableImageDragging() {

        let dragged = null;


        const pieces =
            document.querySelectorAll(
                "#imagePuzzle .puzzle-piece"
            );


        pieces.forEach(piece => {


            piece.addEventListener(
                "dragstart",
                event => {

                    dragged = piece;

                    piece.classList.add(
                        "dragging"
                    );


                    if (
                        event.dataTransfer
                    ) {

                        event.dataTransfer.effectAllowed =
                            "move";

                    }

                }
            );


            piece.addEventListener(
                "dragend",
                () => {

                    piece.classList.remove(
                        "dragging"
                    );

                    dragged = null;

                }
            );


            piece.addEventListener(
                "dragover",
                event => {

                    event.preventDefault();

                }
            );


            piece.addEventListener(
                "drop",
                event => {

                    event.preventDefault();


                    if (
                        !dragged ||
                        dragged === piece
                    ) {

                        return;

                    }


                    const allPieces =
                        [
                            ...imagePuzzle.children
                        ];


                    const draggedIndex =
                        allPieces.indexOf(
                            dragged
                        );


                    const targetIndex =
                        allPieces.indexOf(
                            piece
                        );


                    if (
                        draggedIndex <
                        targetIndex
                    ) {

                        imagePuzzle.insertBefore(
                            dragged,
                            piece.nextSibling
                        );

                    } else {

                        imagePuzzle.insertBefore(
                            dragged,
                            piece
                        );

                    }

                }
            );

        });

    }


    const checkImageButton =
        document.getElementById(
            "checkImage"
        );


    if (checkImageButton) {

        checkImageButton.addEventListener(
            "click",
            checkImagePuzzle
        );

    }


    function checkImagePuzzle() {

        const pieces =
            [
                ...imagePuzzle.children
            ];


        const isCorrect =
            pieces.every(
                (piece, index) => {

                    return (
                        Number(
                            piece.dataset.position
                        ) === index
                    );

                }
            );


        const message =
            document.getElementById(
                "imageMessage"
            );


        if (!isCorrect) {

            if (message) {

                message.textContent =
                    "Not quite... 🧩 Put the memories back together.";

            }

            return;

        }


        if (message) {

            message.textContent =
                "You found our memory. ❤️";

        }


        const photoReveal =
            document.getElementById(
                "photoReveal"
            );


        if (photoReveal) {

            photoReveal.classList.remove(
                "hidden"
            );

        }


        if (checkImageButton) {

            checkImageButton.disabled =
                true;

        }


        completeRound(
            2,
            () => {

                if (step2) {

                    step2.classList.add(
                        "completed"
                    );

                }


                if (step3) {

                    step3.classList.add(
                        "active"
                    );

                }


                round2.classList.remove(
                    "active-round"
                );


                round3.classList.add(
                    "active-round"
                );


                startQuiz();

            }
        );

    }


    /* =================================================
       ROUND 3 — QUIZ
    ================================================== */

    const questions = [

        {
            question:
                "What makes Mrunal's smile so special?",

            answers: [

                "It makes every day brighter",

                "Because it is impossible to forget",

                "Both of these ❤️",

                "Nothing"

            ],

            correct: 2

        },


        {
            question:
                "What do I want more of with you?",

            answers: [

                "More memories",

                "More adventures",

                "More laughter",

                "All of them ❤️"

            ],

            correct: 3

        },


        {
            question:
                "Who is my favorite person?",

            answers: [

                "My best friend",

                "Someone very special",

                "Mrunal ❤️",

                "You already know the answer"

            ],

            correct: 2

        },


        {
            question:
                "What do I hope never changes?",

            answers: [

                "Your smile",

                "Your heart",

                "The beautiful person you are",

                "Everything above ❤️"

            ],

            correct: 3

        },


        {
            question:
                "Who is this entire surprise made for?",

            answers: [

                "Someone special",

                "A beautiful girl",

                "Mrunal ❤️",

                "Obviously you"

            ],

            correct: 2

        }

    ];


    let currentQuestion = 0;


    function startQuiz() {

        currentQuestion = 0;

        showQuestion();

    }


    function showQuestion() {

        const question =
            questions[currentQuestion];


        const questionNumber =
            document.getElementById(
                "questionNumber"
            );


        const questionText =
            document.getElementById(
                "question"
            );


        const answers =
            document.getElementById(
                "answers"
            );


        if (
            !questionNumber ||
            !questionText ||
            !answers
        ) {

            return;

        }


        questionNumber.textContent =
            currentQuestion + 1;


        questionText.textContent =
            question.question;


        answers.innerHTML = "";


        const quizMessage =
            document.getElementById(
                "quizMessage"
            );


        if (quizMessage) {

            quizMessage.textContent = "";

        }


        question.answers.forEach(
            (answer, index) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    "answer";


                button.textContent =
                    answer;


                button.addEventListener(
                    "click",
                    () => {

                        handleAnswer(
                            index,
                            button
                        );

                    }
                );


                answers.appendChild(
                    button
                );

            }
        );

    }


    function handleAnswer(
        selected,
        button
    ) {

        const question =
            questions[currentQuestion];


        const message =
            document.getElementById(
                "quizMessage"
            );


        /* ---------------------------------------------
           WRONG ANSWER
        --------------------------------------------- */

        if (
            selected !==
            question.correct
        ) {

            button.classList.add(
                "wrong"
            );


            if (message) {

                message.textContent =
                    "Hmm... think about us again. ❤️";

            }


            setTimeout(
                () => {

                    button.classList.remove(
                        "wrong"
                    );

                },
                600
            );


            return;

        }


        /* ---------------------------------------------
           CORRECT ANSWER
        --------------------------------------------- */

        button.classList.add(
            "correct"
        );


        if (message) {

            message.textContent =
                "That's right. ❤️";

        }


        document
            .querySelectorAll(
                "#answers .answer"
            )
            .forEach(
                btn => {

                    btn.disabled =
                        true;

                }
            );


        setTimeout(
            () => {

                currentQuestion++;


                if (
                    currentQuestion >=
                    questions.length
                ) {

                    finishQuiz();

                } else {

                    showQuestion();

                }

            },
            900
        );

    }


    /* =================================================
       FINISH QUIZ
    ================================================== */

    function finishQuiz() {

        console.log(
            "🎉 ROUND 3 COMPLETED!"
        );


        if (step3) {

            step3.classList.add(
                "completed"
            );

        }


        completeRound(
            3,
            () => {

                console.log(
                    "🎤 Starting recorded birthday message..."
                );


                round3.classList.remove(
                    "active-round"
                );


                finalRound.classList.add(
                    "show"
                );


                createFinalHearts();


                /*
                 * IMPORTANT:
                 *
                 * The cake is NOT started here.
                 *
                 * First the voice plays.
                 *
                 * When the voice finishes,
                 * the audio "ended" event
                 * starts the cake.
                 */

                setupAudio();

            }
        );

    }


    /* =================================================
       ROUND COMPLETION
    ================================================== */

    function completeRound(
        round,
        callback
    ) {

        if (celebration) {

            celebration.classList.add(
                "show"
            );

        }


        createParticles(
            round === 3
                ? 55
                : 35
        );


        setTimeout(
            () => {

                if (celebration) {

                    celebration.classList.remove(
                        "show"
                    );

                }


                setTimeout(
                    () => {

                        if (
                            typeof callback ===
                            "function"
                        ) {

                            callback();

                        }

                    },
                    400
                );

            },
            2200
        );

    }


    /* =================================================
       PARTICLES
    ================================================== */

    function createParticles(amount) {

        const symbols = [

            "🌹",
            "❤️",
            "💕",
            "✨",
            "🌸",
            "💗",
            "🎉"

        ];


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            setTimeout(
                () => {

                    const particle =
                        document.createElement(
                            "div"
                        );


                    particle.className =
                        "particle";


                    particle.textContent =
                        symbols[
                            Math.floor(
                                Math.random() *
                                symbols.length
                            )
                        ];


                    particle.style.left =
                        Math.random() *
                        100 +
                        "vw";


                    particle.style.fontSize =
                        (
                            18 +
                            Math.random() *
                            25
                        ) +
                        "px";


                    particle.style
                        .setProperty(
                            "--duration",
                            (
                                2 +
                                Math.random() *
                                3
                            ) +
                            "s"
                        );


                    document.body.appendChild(
                        particle
                    );


                    setTimeout(
                        () => {

                            particle.remove();

                        },
                        5500
                    );

                },
                i * 45
            );

        }

    }


    /* =================================================
       FINAL HEARTS
    ================================================== */

    function createFinalHearts() {

        /*
         * Your HTML may use either
         * #finalHearts or #heartExplosion.
         */

        const container =
            document.getElementById(
                "finalHearts"
            ) ||
            document.getElementById(
                "heartExplosion"
            );


        if (!container) return;


        container.innerHTML = "";


        for (
            let i = 0;
            i < 25;
            i++
        ) {

            const heart =
                document.createElement(
                    "span"
                );


            heart.textContent =
                Math.random() > 0.5
                    ? "♥"
                    : "✦";


            heart.style.position =
                "fixed";


            heart.style.left =
                Math.random() *
                100 +
                "vw";


            heart.style.top =
                Math.random() *
                100 +
                "vh";


            heart.style.color =
                Math.random() > 0.5
                    ? "#d8b36a"
                    : "#e85b7d";


            heart.style.opacity =
                ".4";


            heart.style.fontSize =
                (
                    10 +
                    Math.random() * 25
                ) +
                "px";


            container.appendChild(
                heart
            );

        }

    }


    /* =================================================
       RECORDED AUDIO
       
       ROUND 3
          ↓
       VOICE
          ↓
       VOICE ENDS
          ↓
       CAKE
    ================================================== */

    let audioEndedListenerAdded =
        false;


    function setupAudio() {

        const audio =
            document.getElementById(
                "recordedAudio"
            );


        const playButton =
            document.getElementById(
                "playAudio"
            );


        if (!audio) {

            console.error(
                "❌ recordedAudio not found."
            );


            /*
             * Don't leave the user stuck
             * if the audio element is missing.
             */

            setTimeout(
                () => {

                    startCakeCelebration();

                },
                1000
            );


            return;

        }


        console.log(
            "🎤 Recorded audio element found."
        );


        /*
         * Load the audio.
         */

        audio.load();


        /*
         * Make sure the ended listener
         * is added only once.
         */

        if (!audioEndedListenerAdded) {

            audioEndedListenerAdded =
                true;


            audio.addEventListener(
                "ended",
                () => {

                    console.log(
                        "❤️ Birthday voice finished!"
                    );


                    /*
                     * Small emotional pause.
                     */

                    setTimeout(
                        () => {

                            startCakeCelebration();

                        },
                        800
                    );

                }
            );

        }


        /*
         * AUDIO ERROR
         */

        audio.addEventListener(
            "error",
            () => {

                console.error(
                    "❌ Recorded audio could not be loaded."
                );


                console.error(
                    "Audio source:",
                    audio.currentSrc
                );


                if (playButton) {

                    playButton.style.display =
                        "inline-flex";


                    playButton.textContent =
                        "▶ Play My Voice ❤️";

                }

            }
        );


        /*
         * TRY AUTOMATIC PLAYBACK
         */

        audio.currentTime = 0;


        const playPromise =
            audio.play();


        if (
            playPromise !== undefined
        ) {

            playPromise
                .then(
                    () => {

                        console.log(
                            "🎤 Voice is playing!"
                        );


                        if (playButton) {

                            playButton.style.display =
                                "none";

                        }

                    }
                )
                .catch(
                    error => {

                        console.warn(
                            "⚠️ Browser blocked autoplay:",
                            error
                        );


                        /*
                         * Show manual button.
                         */

                        if (playButton) {

                            playButton.style.display =
                                "inline-flex";


                            playButton.textContent =
                                "▶ Play My Voice ❤️";

                        }

                    }
                );

        }

    }


    /* =================================================
       MANUAL AUDIO BUTTON
    ================================================== */

    const playAudioButton =
        document.getElementById(
            "playAudio"
        );


    if (playAudioButton) {

        playAudioButton.addEventListener(
            "click",
            () => {

                const audio =
                    document.getElementById(
                        "recordedAudio"
                    );


                if (!audio) {

                    return;

                }


                audio.currentTime = 0;


                audio.play()
                    .then(
                        () => {

                            console.log(
                                "🎤 Voice started manually."
                            );


                            playAudioButton.style.display =
                                "none";

                        }
                    )
                    .catch(
                        error => {

                            console.error(
                                "❌ Could not play voice:",
                                error
                            );

                        }
                    );

            }
        );

    }


    /* =================================================
       CAKE EXPERIENCE STYLES
    ================================================== */

    function addCakeStyles() {

        if (
            document.getElementById(
                "cakeExperienceStyles"
            )
        ) {

            return;

        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "cakeExperienceStyles";


        style.textContent = `

        .cake-experience {

            position: fixed;

            inset: 0;

            z-index: 99999;

            display: flex;

            align-items: center;

            justify-content: center;

            overflow: hidden;

            background:

                radial-gradient(
                    circle at 50% 35%,
                    rgba(255,180,205,.18),
                    transparent 35%
                ),

                radial-gradient(
                    circle at 20% 80%,
                    rgba(200,100,255,.12),
                    transparent 30%
                ),

                linear-gradient(
                    180deg,
                    #08030d,
                    #160713 50%,
                    #08030d
                );

            animation:
                cakeSceneIn 1.5s ease;

        }


        @keyframes cakeSceneIn {

            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }

        }


        .cake-star {

            position: absolute;

            color: white;

            opacity: .5;

            animation:
                starTwinkle
                2s
                ease-in-out
                infinite;

        }


        @keyframes starTwinkle {

            0%,100% {

                opacity: .2;

                transform:
                    scale(.7);

            }

            50% {

                opacity: 1;

                transform:
                    scale(1.3);

            }

        }


        .cake-content {

            position: relative;

            z-index: 5;

            width:
                min(700px, 94%);

            text-align: center;

            color: white;

        }


        .cake-small-title {

            font-size: 13px;

            letter-spacing: 4px;

            text-transform: uppercase;

            color: #f3b7cb;

            margin-bottom: 15px;

            opacity: .85;

        }


        .cake-title {

            margin: 0;

            font-size:
                clamp(32px, 8vw, 64px);

            line-height: 1.1;

            font-weight: 900;

            background:
                linear-gradient(
                    90deg,
                    #fff,
                    #ffd3e2,
                    #fff
                );

            -webkit-background-clip:
                text;

            -webkit-text-fill-color:
                transparent;

        }


        .cake-subtitle {

            margin:
                15px auto 30px;

            max-width: 520px;

            font-size: 17px;

            line-height: 1.7;

            color:
                rgba(255,255,255,.72);

        }


        .cake-wrapper {

            position: relative;

            width: 320px;

            max-width: 85vw;

            height: 300px;

            margin:
                0 auto 15px;

        }


        .cake-glow {

            position: absolute;

            width: 300px;

            height: 130px;

            left: 50%;

            bottom: 25px;

            transform:
                translateX(-50%);

            background:
                rgba(255,100,160,.22);

            filter:
                blur(45px);

            border-radius: 50%;

            animation:
                cakeGlow
                2s
                ease-in-out
                infinite;

        }


        @keyframes cakeGlow {

            0%,100% {

                opacity: .45;

                transform:
                    translateX(-50%)
                    scale(.9);

            }

            50% {

                opacity: .9;

                transform:
                    translateX(-50%)
                    scale(1.15);

            }

        }


        .cake {

            position: absolute;

            width: 240px;

            height: 150px;

            left: 50%;

            bottom: 35px;

            transform:
                translateX(-50%);

            filter:
                drop-shadow(
                    0 20px 20px
                    rgba(0,0,0,.35)
                );

        }


        .cake-plate {

            position: absolute;

            bottom: -8px;

            left: 50%;

            transform:
                translateX(-50%);

            width: 280px;

            height: 25px;

            border-radius: 50%;

            background:
                linear-gradient(
                    #fff,
                    #d9d9e5
                );

            box-shadow:
                0 10px 20px
                rgba(0,0,0,.4);

        }


        .cake-bottom {

            position: absolute;

            bottom: 15px;

            left: 10px;

            width: 220px;

            height: 75px;

            border-radius:
                10px 10px 22px 22px;

            background:
                linear-gradient(
                    180deg,
                    #ffb5cb,
                    #e8789c
                );

            box-shadow:
                inset 0 -15px 0
                rgba(160,40,80,.18);

        }


        .cake-top {

            position: absolute;

            bottom: 75px;

            left: 0;

            width: 240px;

            height: 60px;

            border-radius: 50%;

            background:
                linear-gradient(
                    180deg,
                    #fff4f7,
                    #ffd6e2
                );

        }


        .icing {

            position: absolute;

            bottom: 60px;

            left: 8px;

            width: 224px;

            height: 55px;

            background: #fff5f8;

            border-radius:
                0 0 25px 25px;

        }


        .icing::before,
        .icing::after {

            content: "";

            position: absolute;

            bottom: -15px;

            width: 20px;

            height: 28px;

            border-radius:
                0 0 15px 15px;

            background: #fff5f8;

        }


        .icing::before {

            left: 45px;

        }


        .icing::after {

            right: 50px;

        }


        .cake-decoration {

            position: absolute;

            bottom: 38px;

            left: 25px;

            right: 25px;

            display: flex;

            justify-content:
                space-between;

            font-size: 18px;

        }


        .candles {

            position: absolute;

            z-index: 10;

            top: -5px;

            left: 50%;

            transform:
                translateX(-50%);

            display: flex;

            gap: 24px;

        }


        .candle {

            position: relative;

            width: 15px;

            height: 65px;

            border-radius: 7px;

            background:
                repeating-linear-gradient(
                    45deg,
                    #fff,
                    #fff 8px,
                    #ff80aa 8px,
                    #ff80aa 15px
                );

        }


        .flame {

            position: absolute;

            left: 50%;

            top: -35px;

            width: 20px;

            height: 30px;

            transform:
                translateX(-50%);

            border-radius: 50%;

            background:
                radial-gradient(
                    circle at 50% 70%,
                    #fff,
                    #ffd35a 35%,
                    #ff7b00 70%
                );

            box-shadow:
                0 0 20px #ffae38,
                0 0 40px #ff7b00;

            animation:
                flameMove
                .15s
                infinite
                alternate;

        }


        @keyframes flameMove {

            from {

                transform:
                    translateX(-50%)
                    rotate(-4deg)
                    scaleY(1);

            }

            to {

                transform:
                    translateX(-50%)
                    rotate(4deg)
                    scaleY(1.1);

            }

        }


        .candle.blown .flame {

            animation: none;

            opacity: 0;

            transform:
                translateX(-50%)
                scale(.1);

            transition: .4s ease;

        }


        .smoke {

            position: absolute;

            left: 50%;

            top: -45px;

            transform:
                translateX(-50%);

            font-size: 22px;

            opacity: 0;

        }


        .candle.blown .smoke {

            animation:
                smokeRise
                2s
                ease
                forwards;

        }


        @keyframes smokeRise {

            0% {

                opacity: 0;

                transform:
                    translateX(-50%)
                    translateY(10px)
                    scale(.5);

            }

            30% {

                opacity: .6;

            }

            100% {

                opacity: 0;

                transform:
                    translateX(-50%)
                    translateY(-60px)
                    scale(1.5);

            }

        }


        .blow-instruction {

            margin-top: 10px;

            font-size: 18px;

            font-weight: 700;

            color: #ffd8e6;

            animation:
                instructionPulse
                1.5s
                ease-in-out
                infinite;

        }


        @keyframes instructionPulse {

            0%,100% {

                opacity: .6;

            }

            50% {

                opacity: 1;

            }

        }


        .blow-hint {

            margin-top: 8px;

            font-size: 13px;

            color:
                rgba(255,255,255,.55);

        }


        .cake-button {

            margin-top: 22px;

            border: none;

            padding:
                15px 28px;

            border-radius: 50px;

            background:
                linear-gradient(
                    135deg,
                    #ff6f9f,
                    #a65cff
                );

            color: white;

            font-size: 15px;

            font-weight: 800;

            cursor: pointer;

            box-shadow:
                0 10px 30px
                rgba(255,90,150,.3);

            transition: .25s;

        }


        .cake-button:hover {

            transform:
                translateY(-3px)
                scale(1.03);

        }


        .cake.cut {

            animation:
                cakeCelebrate
                .8s
                ease;

        }


        @keyframes cakeCelebrate {

            0% {

                transform:
                    translateX(-50%)
                    scale(1);

            }

            50% {

                transform:
                    translateX(-50%)
                    scale(1.12)
                    rotate(2deg);

            }

            100% {

                transform:
                    translateX(-50%)
                    scale(1);

            }

        }


        .cake-knife {

            position: absolute;

            z-index: 20;

            width: 130px;

            height: 10px;

            background:
                linear-gradient(
                    90deg,
                    #ddd,
                    white,
                    #aaa
                );

            border-radius: 10px;

            right: -70px;

            top: 100px;

            transform:
                rotate(-55deg)
                translateX(180px);

            opacity: 0;

        }


        .cake.cut .cake-knife {

            animation:
                knifeCut
                1s
                ease
                forwards;

        }


        @keyframes knifeCut {

            0% {

                opacity: 0;

                transform:
                    rotate(-55deg)
                    translateX(180px);

            }

            30% {

                opacity: 1;

            }

            100% {

                opacity: 1;

                transform:
                    rotate(-55deg)
                    translateX(0);

            }

        }


        .birthday-final {

            animation:
                finalMessageIn
                1s
                ease;

        }


        @keyframes finalMessageIn {

            from {

                opacity: 0;

                transform:
                    translateY(30px)
                    scale(.9);

            }

            to {

                opacity: 1;

                transform:
                    translateY(0)
                    scale(1);

            }

        }


        .birthday-final h1 {

            font-size:
                clamp(38px, 9vw, 75px);

            margin: 0;

            background:
                linear-gradient(
                    90deg,
                    #ffd2e2,
                    #fff,
                    #ffd2e2
                );

            -webkit-background-clip:
                text;

            -webkit-text-fill-color:
                transparent;

        }


        .birthday-final p {

            font-size: 19px;

            line-height: 1.8;

            color:
                rgba(255,255,255,.75);

            max-width: 550px;

            margin:
                20px auto;

        }


        .final-heart {

            font-size: 70px;

            animation:
                finalHeartBeat
                1s
                infinite;

        }


        @keyframes finalHeartBeat {

            0%,100% {

                transform:
                    scale(1);

            }

            50% {

                transform:
                    scale(1.18);

            }

        }


        @media (max-width: 500px) {

            .cake-wrapper {

                transform:
                    scale(.82);

                margin-top: -15px;

                margin-bottom: -25px;

            }


            .cake-title {

                font-size: 36px;

            }


            .cake-subtitle {

                font-size: 15px;

            }


            .candles {

                gap: 16px;

            }

        }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =================================================
       START CAKE CELEBRATION
    ================================================== */

    function startCakeCelebration() {

        /*
         * Prevent duplicate cake scenes.
         */

        if (
            document.getElementById(
                "cakeExperience"
            )
        ) {

            return;

        }


        console.log(
            "🎂 Voice finished → Cake starting!"
        );


        addCakeStyles();


        const scene =
            document.createElement(
                "div"
            );


        scene.className =
            "cake-experience";


        scene.id =
            "cakeExperience";


        scene.innerHTML = `

            ${createStars()}


            <div class="cake-content">


                <div class="cake-small-title">

                    YOUR FINAL BIRTHDAY SURPRISE

                </div>


                <h1 class="cake-title">

                    Make a wish, Mrunal ✨

                </h1>


                <p class="cake-subtitle">

                    The message is over...
                    but your birthday surprise isn't. ❤️

                </p>


                <div class="cake-wrapper">


                    <div class="cake-glow"></div>


                    <div class="cake">


                        <div class="candles">


                            <div class="candle">

                                <div class="flame"></div>

                                <div class="smoke">
                                    〰
                                </div>

                            </div>


                            <div class="candle">

                                <div class="flame"></div>

                                <div class="smoke">
                                    〰
                                </div>

                            </div>


                            <div class="candle">

                                <div class="flame"></div>

                                <div class="smoke">
                                    〰
                                </div>

                            </div>


                            <div class="candle">

                                <div class="flame"></div>

                                <div class="smoke">
                                    〰
                                </div>

                            </div>


                            <div class="candle">

                                <div class="flame"></div>

                                <div class="smoke">
                                    〰
                                </div>

                            </div>


                        </div>


                        <div class="cake-top"></div>


                        <div class="icing"></div>


                        <div class="cake-bottom"></div>


                        <div class="cake-decoration">

                            <span>🌸</span>

                            <span>💗</span>

                            <span>🌸</span>

                            <span>💗</span>

                            <span>🌸</span>

                        </div>


                        <div class="cake-knife"></div>


                    </div>


                    <div class="cake-plate"></div>


                </div>


                <div
                    class="blow-instruction"
                    id="blowInstruction">

                    🌬️ Blow the candles,
                    make a wish
                    and close your eyes... ✨

                </div>


                <div class="blow-hint">

                    Blow toward your microphone
                    or tap the button below.

                </div>


                <button
                    class="cake-button"
                    id="blowButton">

                    🌬️ Blow Out The Candles

                </button>


            </div>

        `;


        document.body.appendChild(
            scene
        );


        const blowButton =
            document.getElementById(
                "blowButton"
            );


        if (blowButton) {

            blowButton.addEventListener(
                "click",
                () => {

                    blowCandles();

                }
            );

        }


        /*
         * Ask for microphone permission.
         */

        startBlowDetection();

    }


    /* =================================================
       CREATE STARS
    ================================================== */

    function createStars() {

        let stars = "";


        for (
            let i = 0;
            i < 45;
            i++
        ) {

            const left =
                Math.random() * 100;


            const top =
                Math.random() * 100;


            const delay =
                Math.random() * 2;


            stars += `

                <span
                    class="cake-star"
                    style="
                        left:${left}%;
                        top:${top}%;
                        animation-delay:${delay}s;
                    "
                >

                    ${
                        Math.random() > 0.5
                            ? "✦"
                            : "·"
                    }

                </span>

            `;

        }


        return stars;

    }


    /* =================================================
       MICROPHONE BLOW DETECTION
    ================================================== */

    let blowDetectionStream =
        null;


    let blowDetectionActive =
        false;


    let blowDetectionTriggered =
        false;


    async function startBlowDetection() {

        /*
         * Reset state.
         */

        blowDetectionTriggered =
            false;


        blowDetectionActive =
            false;


        /*
         * Browser doesn't support
         * microphone access.
         */

        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {

            console.log(
                "Microphone not supported."
            );

            return;

        }


        try {

            blowDetectionStream =
                await navigator.mediaDevices
                    .getUserMedia({
                        audio: true
                    });


            console.log(
                "🎤 Microphone connected."
            );


            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;


            if (!AudioContext) {

                return;

            }


            const audioContext =
                new AudioContext();


            const analyser =
                audioContext.createAnalyser();


            analyser.fftSize =
                512;


            analyser.smoothingTimeConstant =
                0.8;


            const microphone =
                audioContext
                    .createMediaStreamSource(
                        blowDetectionStream
                    );


            microphone.connect(
                analyser
            );


            const data =
                new Uint8Array(
                    analyser.fftSize
                );


            blowDetectionActive =
                true;


            function detectBlow() {

                if (
                    !blowDetectionActive ||
                    blowDetectionTriggered
                ) {

                    return;

                }


                analyser.getByteTimeDomainData(
                    data
                );


                let sum = 0;


                for (
                    let i = 0;
                    i < data.length;
                    i++
                ) {

                    const value =
                        (
                            data[i] -
                            128
                        ) / 128;


                    sum +=
                        value * value;

                }


                const volume =
                    Math.sqrt(
                        sum /
                        data.length
                    );


                /*
                 * Blow sensitivity.
                 *
                 * Increase to make it harder.
                 * Decrease to make it easier.
                 */

                if (
                    volume > 0.18
                ) {

                    blowCandles();

                    return;

                }


                requestAnimationFrame(
                    detectBlow
                );

            }


            detectBlow();


        } catch (error) {

            console.log(
                "🎤 Microphone permission was not granted."
            );

            console.log(error);

        }

    }


    /* =================================================
       BLOW CANDLES
    ================================================== */

    function blowCandles() {

        /*
         * Prevent double activation.
         */

        if (
            blowDetectionTriggered
        ) {

            return;

        }


        blowDetectionTriggered =
            true;


        blowDetectionActive =
            false;


        /*
         * Stop microphone.
         */

        if (
            blowDetectionStream
        ) {

            blowDetectionStream
                .getTracks()
                .forEach(
                    track => {

                        track.stop();

                    }
                );


            blowDetectionStream =
                null;

        }


        /*
         * Find all candles.
         */

        const candles =
            document.querySelectorAll(
                ".candle"
            );


        candles.forEach(
            (candle, index) => {

                setTimeout(
                    () => {

                        candle.classList.add(
                            "blown"
                        );

                    },
                    index * 100
                );

            }
        );


        const instruction =
            document.getElementById(
                "blowInstruction"
            );


        const button =
            document.getElementById(
                "blowButton"
            );


        if (instruction) {

            instruction.textContent =
                "✨ Wish made... ✨";

        }


        if (button) {

            button.style.display =
                "none";

        }


        /*
         * Wait for candles to disappear.
         */

        setTimeout(
            () => {

                cutTheCake();

            },
            1800
        );

    }


    /* =================================================
       CUT THE CAKE
    ================================================== */

    function cutTheCake() {

        console.log(
            "🔪 Cutting the cake..."
        );


        const cake =
            document.querySelector(
                ".cake"
            );


        if (!cake) {

            return;

        }


        cake.classList.add(
            "cut"
        );


        const instruction =
            document.getElementById(
                "blowInstruction"
            );


        if (instruction) {

            instruction.textContent =
                "🔪 Cutting the birthday cake... 🎂";

        }


        createCakeConfetti();


        setTimeout(
            () => {

                showBirthdayFinalMessage();

            },
            1800
        );

    }


    /* =================================================
       CAKE CONFETTI
    ================================================== */

    function createCakeConfetti() {

        const symbols = [

            "🎉",
            "✨",
            "💖",
            "🌸",
            "🎂",
            "💕",
            "⭐",
            "🌹"

        ];


        for (
            let i = 0;
            i < 60;
            i++
        ) {

            const particle =
                document.createElement(
                    "div"
                );


            particle.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            particle.style.position =
                "fixed";


            particle.style.left =
                Math.random() *
                100 +
                "vw";


            particle.style.top =
                "-30px";


            particle.style.zIndex =
                "100001";


            particle.style.fontSize =
                (
                    18 +
                    Math.random() * 20
                ) +
                "px";


            particle.style.pointerEvents =
                "none";


            particle.style.transition =
                `
                    transform
                    ${2 + Math.random() * 2}s
                    ease-out,

                    opacity
                    3s
                    ease
                `;


            document.body.appendChild(
                particle
            );


            setTimeout(
                () => {

                    particle.style.transform =
                        `
                            translateY(
                                ${window.innerHeight + 100}px
                            )

                            rotate(
                                ${Math.random() * 900}deg
                            )
                        `;


                    particle.style.opacity =
                        "0";

                },
                50
            );


            setTimeout(
                () => {

                    particle.remove();

                },
                4500
            );

        }

    }


    /* =================================================
       FINAL BIRTHDAY MESSAGE
    ================================================== */

    function showBirthdayFinalMessage() {

        const scene =
            document.getElementById(
                "cakeExperience"
            );


        if (!scene) {

            return;

        }


        const content =
            scene.querySelector(
                ".cake-content"
            );


        if (!content) {

            return;

        }


        content.innerHTML = `

            <div class="birthday-final">


                <div class="final-heart">

                    ❤️

                </div>


                <div class="cake-small-title">

                    HAPPY BIRTHDAY

                </div>


                <h1>

                    Mrunal

                </h1>


                <p>

                    The candles are gone,
                    the cake is cut,
                    and your wish is somewhere
                    out there now... ✨

                    <br><br>

                    But if I could make one wish
                    for you, it would be that you
                    always keep that beautiful smile,
                    that beautiful heart,
                    and the beautiful person
                    you are. ❤️

                    <br><br>

                    <strong>

                        Happy Birthday, Mrunal. 🎂🌹

                    </strong>

                </p>


                <button
                    class="cake-button"
                    id="closeCakeExperience">

                    💕 Keep This Moment Forever

                </button>


            </div>

        `;


        const closeButton =
            document.getElementById(
                "closeCakeExperience"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                () => {

                    scene.style.transition =
                        "opacity 1s ease";


                    scene.style.opacity =
                        "0";


                    setTimeout(
                        () => {

                            scene.remove();

                        },
                        1000
                    );

                }
            );

        }

    }


    /* =================================================
       START
    ================================================== */

    console.log(
        "❤️ Puzzle system ready."
    );

});