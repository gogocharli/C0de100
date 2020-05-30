// Create our wiper for the last page
const bodyEl = document.querySelector('body');

const wiper = document.createElement('div');
wiper.classList.add('wiper');

const wiperText = document.createElement('span');
wiperText.innerText = 'B';

wiper.appendChild(wiperText);
bodyEl.appendChild(wiper);

// The pages will transition in and out by a fade and move up motion

barba.init({
  transitions: [
    {
      name: 'next',
      leave({ current, next, trigger }) {
        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
              current.container.remove();
              resolve();
            },
          });

          // Select all the direct children of the container
          const elements = current.container.querySelectorAll('*');

          timeline
            .set(wiper, { y: '100%' })
            .to(elements, { opacity: 0, y: -300, ease: 'power4.inOut' }, 0)
            .to(wiper, { y: 0 }, 0);
        });
      },
      beforeEnter({ current, next, trigger }) {
        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            },
          });

          // Allow the the wiper to stay on screen for one and a half seconds
          timeline.to(wiper, { duration: 1.5, x: 0 });
        });
      },
      enter({ current, next, trigger }) {
        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            },
          });

          timeline.to(wiper, { y: '-100%' }, 0);
        });
      },
      after({ current }) {
        return new Promise(resolve => {
          // Select all the direct children of the container
          const elements = current.container.querySelectorAll('*');
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            },
          });

          // TODO Animate them with a stagger after we've entered the page
          timeline.from(elements, {
            opacity: 0,
            y: 300,
            stagger: 0.2,
            ease: 'sine',
          });
        });
      },
    },
    // {
    //   name: 'firstLoad',
    //   beforeOnce() {
    //     return new Promise(resolve => {
    //       const timeline = gsap.timeline({
    //         onComplete() {
    //           resolve();
    //         },
    //       });

    //       timeline.to(wiper, { y: 0, duration: 1, ease: 'power4.inOut' });
    //     });
    //   },
    //   once() {
    //     return new Promise(resolve => {
    //       const timeline = gsap.timeline({
    //         onComplete() {
    //           resolve();
    //         },
    //       });

    //       timeline.to(wiper, { y: '-100%', ease: 'power4.inOut' });
    //     });
    //   },
    // },
  ],
  views: [],
  debug: true,
});
// For the callback page, add a loading of the B letter by transitioning up and then add all the other elements one by one
