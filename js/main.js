(() => {
    console.log ('Express and Immerse')

    let hamMenu = document.querySelector('#hamburger-menu'),
        navMenu = document.querySelector('#main-nav'),
        xrayCon = document.querySelector('#xray-container'),
        xraySlider = document.querySelector('.slider-bar'),
        left = document.querySelector('.left-image'),
        collabButton = document.querySelectorAll('.collab-button'),
        dragging = false,
        min = 0,
        max = xrayCon.offsetWidth;

        const animationArea = document.querySelector('#animation');
        const context = animationArea.getContext("2d");
        animationArea.width = 1920;
        animationArea.height = 1080;
        const frameCount = 2066;

    const frames = [];

    const frame = {
        frame: 0
    }

    const earbudText = [
        {
            text : 'Project: LGBTQ designs include transgender, gay, lesbian, asexual, bisexual, non-binary, and more!'
        },

        {
            text : 'Project: Sanrio designs include Hello Kitty, Cinnamoroll, Kuromi, My Melody, Pompompurin, Keroppi, Badtz-maru, and more!'
        },

        {
            text : 'Project: Pokemon designs include Pikachu, Eevee, Charizard, Slowpoke, Furret, Lucario, Aegislash, Walking Wake, Mudkip, and more!'
        },

        {
            text : 'Project: Vocaloid designs include Miku Hatsune, Kaito, Rin Kagamine, Len Kagamine, Luka Megurine, Gumi, Meiko, and more!'
        },

        {
            text : 'Project: Disney designs include Mickey Mouse, Stitch, Winnie the Pooh, Kronk, Elsa, Pan, Jack Skellington, Maleficent, Gaston, Jiminy Cricket, and more!'
        },
    ]


    function openMobileMenu() {
        hamMenu.classList.toggle('rotate');
        navMenu.classList.toggle('show');
    }

    function onDown() {
        dragging = true
    }

    function onUp() {
        dragging = false
    }

    function onMove(event) {
        if(dragging === true) {
            let x = event.clientX - xrayCon.getBoundingClientRect().left;

            if(x < min) {
                x = min;
            } else if  (x > max) {
                x = max-5;
            }

            xraySlider.style.left = x + 'px';
            left.style.width = x + 'px';
        }
    }

    for(let i=0; i<frameCount; i++) {
        const img = document.createElement("img");
        img.src = `images/scroll_animation/earbud__${(i+1).toString().padStart(5, "0")}.jpg`;
        frames.push(img);
    }

    gsap.to(frame, {
        frame: 2065,
        snap: "frame",
        scrollTrigger: {
            trigger: "#animation",
            pin: true,
            scrub: 1,
        },

        onUpdate: render
    })

    function render() {
        context.clearRect(0,0, animationArea.width, animationArea.height)
        context.drawImage(frames[frame.frame], 0, 0);
    }

    function changeDisplay() {
        const earbudImage = document.querySelector('#earbud-image')
        const earbudCaption = document.querySelector('#earbud-caption')
        
        let captionText = this.dataset.member

        earbudImage.src = `images/${this.id}.jpg`
        earbudCaption.textContent = earbudText[captionText].text
    }
    

    hamMenu.addEventListener('click', openMobileMenu);
    xraySlider.addEventListener('mousedown', onDown);
    document.body.addEventListener('mouseup', onUp);
    document.body.addEventListener('mousemove', onMove)

    frames[0].addEventListener("load", render)

    collabButton.forEach(collab => collab.addEventListener('click', changeDisplay))

})();