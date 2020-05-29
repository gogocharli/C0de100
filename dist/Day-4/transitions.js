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
            .to(elements, { opacity: 0, y: -300 }, 0)
            .to(wiper, { y: 0 }, 0);
        });
      },
      enter({ current, next, trigger }) {
        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            },
          });

          // Select all the direct children of the container
          const elements = current.container.querySelectorAll('*');

          timeline
            .set(elements, { opacity: 0, y: -300 })
            .to(wiper, { y: '-100%' }, 0)
            .to(elements, { opacity: 1, y: 0 }, 1);
        });
      },
    },
  ],
  views: [],
  debug: true,
});
// For the callback page, add a loading of the B letter by transitioning up and then add all the other elements one by one
