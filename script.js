var t1=gsap.timeline();
t1.from(".box2 a",{
    y:-100,
    delay:0.2,
    duration:0.2,
    stagger:0.2
})
t1.from(".box3" ,{
    x:-800,
    delay:0.1,
    duration:0.9,
    stagger:0.2
})
gsap.from(".box4 img" ,{
    x:800,
    rotate:110,
    duration:0.9,
    opacity:1,
    stagger:0.5
})
gsap.from("#About div",{
    x:-1500,
    delay:0.5,
    duration:2,
    stagger:0.3,
    scrollTrigger:"#About div",
})

// project

gsap.from("#projectContainer img",{
    transform:"translateX(-250%)",
    scrollTrigger:{
        trigger:"#projectContainer",
        scroller:"body",
        // markers:true,
        start:"top 20%",
        end:"1000%",
        scrub:2,
        pin:true,
    }
})