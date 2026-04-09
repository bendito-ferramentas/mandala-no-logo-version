import gsap from "gsap"

export function jello(el) {
  gsap.timeline({ overwrite: true, ease: "power1.out" })
    .to(el, { scaleX: 1.20, scaleY: 0.80, duration: 0.075 })
    .to(el, { scaleX: 1.10, scaleY: 0.90, duration: 0.075 })
    .to(el, { scaleX: 0.95, scaleY: 1.05, duration: 0.075 })
    .to(el, { scaleX: 1.00, scaleY: 1.00, duration: 0.075 })
}