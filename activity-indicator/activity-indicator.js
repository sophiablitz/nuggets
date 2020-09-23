function makeTextIndicator(text, size = 50, speed = 3, color = '') {
  let indicator = document.createElement('div');
  indicator.className = 'activity-indicator';
  let length = text.length;
  // text = text.toUpperCase();
  if (length == 0) return;
  let step = Math.floor(360 / length);
  let degrees = 180;

  for (let i = 0; i < length; i++) {
    let el = document.createElement('div');
    el.innerText = text[length - 1 - i];
    let input = 0 + i / length;
    let x = Math.floor(size * Math.sin(Math.PI * 2 * input));
    let y = Math.floor(size * Math.sin(Math.PI * 2 * (input + 0.25)));
    el.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px) rotate(${degrees}deg)`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.textAlign = 'center';
    el.style.position = 'absolute';
    el.style.borderRadius = size / 2 + 'px';
    el.style.fontSize = size / 3 + 'pt';
    el.style.fontWeight = 800;
    el.style.color = color;
    el.style.zIndex = 10002;
    degrees -= step;
    indicator.appendChild(el);
  }
  indicator.style.height = '1px';
  indicator.style.width = '1px';
  indicator.style.position = 'fixed';
  indicator.style.left = '50%';
  indicator.style.top = '50%';
  indicator.style.animationName = 'circle-rotation';
  indicator.style.animationDuration = speed + 's';
  indicator.style.animationIterationCount = 'infinite';
  indicator.style.animationTimingFunction = 'linear';
  indicator.style.zIndex = 10001;

  return [
    indicator, 
    (active) => { 
      indicator.style.animationPlayState = active ? 'running' : 'paused';
      indicator.style.display = active ? 'block' : 'none';
    }
  ];
}
function makeTextIndicatorWithBlockout(text, size, speed, color, coverColor = 'rgba(255,255,255,0.75)') {
  let block = document.createElement('div');
  block.style.zIndex = 10000;
  block.style.width = '100vw';
  block.style.height = '100vh';
  block.style.position = 'absolute';
  block.style.left = 0;
  block.style.top = 0;
  block.style.backgroundColor = coverColor;
  // block.style.opacity = '75%';
  let [indicator, setIndicator] = makeTextIndicator(text, size, speed, color)
  block.appendChild(indicator);
  return [

    block,
    (active) => {
      block.style.display = active ? 'block' : 'none';
      setIndicator(active);
    }
  ];
}
