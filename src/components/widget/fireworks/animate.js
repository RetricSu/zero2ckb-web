// code from: https://codepen.io/goingtogogo/pen/abvPKjN

export default function pop(){
  for (let i = 0; i < 50; i++) {
    createParticle();
  }
}

function createParticle() {
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;
  
  const particle = document.createElement("particle");
  document.body.appendChild(particle);

  const size = Math.floor(Math.random() * 20 + 5);

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  const destinationX = x + (Math.random() - 0.5) * 8 * 75;
  const destinationY = y + (Math.random() - 0.5) * 8 * 75;

  particle.style.background = `hsl(${Math.random() * 90 + 120}, 70%, 60%)`;
  particle.style.borderRadius = "50%";

  const animation = particle.animate(
    [
      {
        // Set the origin position of the particle
        // We offset the particle with half its size to center it around the mouse
        transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
        opacity: 1,
      },
      {
        // We define the final coordinates as the second keyframe
        transform: `translate(${destinationX}px, ${destinationY}px)`,
        opacity: 0,
      },
    ],
    {
      duration: 1000 + Math.random() * 1000,
      easing: "cubic-bezier(0, .9, .57, 1)",
    }
  );

  animation.onfinish = () => {
    return particle.removeParticle;
  };
}

function removeParticle(e) {
  e.srcElement.effect.target.remove();
}