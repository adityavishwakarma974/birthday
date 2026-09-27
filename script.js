/* Personalise the photo captions below. Add your MP3 at music/birthday.mp3. */
const photos = [
  { src: 'images/photo1.jpg', alt: 'Annu in a blue sari, surrounded by garden plants', caption: 'The kind of smile that can turn an ordinary moment into a favorite memory.' },
  { src: 'images/photo2.jpg', alt: 'A monochrome selfie of Annu with pink heart stickers', caption: 'Some moments need no words. They just deserve to be kept close.' },
  { src: 'images/photo3.jpg', alt: 'Annu seated in a restaurant booth', caption: 'Some people don’t just enter your life...' },
  { src: 'images/photo4.jpg', alt: 'Annu in a blue sari in a garden', caption: '...they make the little moments feel worth remembering.' },
  { src: 'images/photo5.jpg', alt: 'A softly lit portrait of Annu', caption: 'No perfect pose needed. This moment is lovely because it is you. ♡' },
  { src: 'images/photo6.jpg', alt: 'Annu at a restaurant in a red sweater', caption: 'May the next chapter bring you moments you’ll wish you could hold forever.' }
];
const quotes = [
  'Some smiles are beautiful...<br><i>...and some smiles make the whole world feel beautiful. ♡</i>',
  'If memories were stars, I’d wish for an entire sky filled with yours. ✧',
  'May you always find reasons to smile, even on the days when life gives you reasons not to.',
  'You deserve a life filled with moments that make your heart quietly say...<br><i>“I’m glad I’m here.” ♡</i>',
  'Your story is still being written...<br><i>And I hope the next chapters are your most beautiful ones yet.</i>'
];
const wishes = [
  'May your smile never fade.', 'May your dreams become reality.', 'May you always believe in yourself.',
  'May happiness find you wherever you go.', 'May your heart always know peace.', 'May success follow your hard work.',
  'May you meet people who truly value you.', 'May every year make you stronger.', 'May your future be brighter than your past.',
  'May you always have something to look forward to.', 'May your laughter always fill the room.',
  'May you create memories worth keeping forever.', 'May you never stop dreaming.',
  'May you always choose yourself when you need to.', 'May you discover new reasons to love life.',
  'May every difficult chapter make you stronger.', 'May beautiful surprises find you.', 'May your heart always remain kind.',
  'May your journey be filled with unforgettable moments.', 'May you become everything you’ve ever dreamed of becoming.',
  'And may you always remember how incredibly special you are. ♡'
];
const $ = (id) => document.getElementById(id);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// A quiet, no-file-needed chime for candle taps. The browser only creates audio
// after a user gesture; background music also waits for the Enter button.
let audioContext;
function chime(frequency = 660) {
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = 'sine'; osc.frequency.value = frequency;
    gain.gain.setValueAtTime(.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.055, audioContext.currentTime + .02);
    gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + .42);
    osc.connect(gain); gain.connect(audioContext.destination); osc.start(); osc.stop(audioContext.currentTime + .45);
  } catch (_) { /* Audio can be unavailable on older browsers. */ }
}
function scatterStars(target, count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('i'); star.className = 'star';
    star.style.left = `${Math.random() * 100}%`; star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--dur', `${3 + Math.random() * 5}s`); star.style.setProperty('--delay', `${Math.random() * 5}s`);
    target.append(star);
  }
}
scatterStars($('starfield'), 72);

// The opening unfolds like title cards, then leaves the Enter button for the visitor.
const openingReveal = $('openingReveal');
window.setTimeout(() => openingReveal.classList.add('show'), reduceMotion ? 50 : 9800);
$('enterButton').addEventListener('click', async () => {
  document.body.classList.remove('locked'); document.body.classList.add('body-unlocked');
  const music = $('music');
  try { await music.play(); $('musicToggle').setAttribute('aria-pressed', 'true'); $('musicToggle').setAttribute('aria-label', 'Pause music'); } catch (_) {}
  $('candles').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
});

const music = $('music'); music.volume = Number($('volume').value);
$('musicToggle').addEventListener('click', async () => {
  if (music.paused) { try { await music.play(); } catch (_) {} }
  else music.pause();
  const playing = !music.paused;
  $('musicToggle').setAttribute('aria-pressed', String(playing));
  $('musicToggle').setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
});
$('volume').addEventListener('input', (event) => { music.volume = Number(event.target.value); if (music.volume === 0 && !music.paused) music.pause(); });

const candlesList = $('candlesList');
for (let i = 0; i < 7; i++) {
  const candle = document.createElement('button'); candle.className = 'candle'; candle.type = 'button'; candle.setAttribute('aria-label', `Light candle ${i + 1}`);
  candle.innerHTML = '<span class="wick"></span><span class="flame"></span>';
  candle.addEventListener('click', () => {
    if (candle.classList.contains('is-lit')) return;
    candle.classList.add('is-lit'); candle.setAttribute('aria-label', `Candle ${i + 1} is lit`); chime(520 + i * 55);
    const remaining = candlesList.querySelectorAll('.candle:not(.is-lit)').length;
    $('candleStatus').textContent = remaining ? `${remaining} little ${remaining === 1 ? 'wish' : 'wishes'} still waiting to glow.` : '';
    if (!remaining) {
      $('cakeStage').classList.add('lit'); $('candles').style.background = 'radial-gradient(ellipse at 50% 65%,#49321d65,transparent 49%),linear-gradient(120deg,#171018,#1b1214)';
      $('afterCandles').classList.remove('hidden'); $('toCake').classList.remove('hidden');
    }
  });
  candlesList.append(candle);
}
$('toCake').addEventListener('click', () => $('cake').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }));

function celebrate() {
  const layer = $('celebration'); layer.innerHTML = '';
  for (let i = 0; i < 95; i++) {
    const bit = document.createElement('i'); bit.className = i % 3 === 0 ? 'petal' : 'confetti';
    bit.style.setProperty('--x', `${Math.random() * 100}%`); bit.style.setProperty('--dur', `${3 + Math.random() * 3}s`);
    bit.style.setProperty('--delay', `${Math.random() * 1.7}s`); bit.style.setProperty('--rot', `${Math.random() * 360}deg`);
    bit.style.setProperty('--drift', `${Math.random() * 140 - 70}px`); layer.append(bit);
  }
  window.setTimeout(() => { layer.innerHTML = ''; }, 8000);
}
$('cutCake').addEventListener('click', () => {
  $('cutCake').disabled = true; $('cutCake').classList.add('hidden'); chime(740); celebrate();
  window.setTimeout(() => $('birthdayReveal').classList.remove('hidden'), 950);
});
$('[data-scroll="memories"]').addEventListener('click', () => $('memories').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }));

let photoIndex = 0; const frame = $('filmFrame');
function updatePhoto(nextIndex) {
  photoIndex = (nextIndex + photos.length) % photos.length;
  frame.classList.add('is-changing');
  window.setTimeout(() => {
    const photo = photos[photoIndex]; $('memoryPhoto').src = photo.src; $('memoryPhoto').alt = photo.alt;
    $('photoCaption').textContent = photo.caption; $('photoCount').textContent = `${String(photoIndex + 1).padStart(2, '0')} — ${String(photos.length).padStart(2, '0')}`;
    $('filmDots').querySelectorAll('button').forEach((button, index) => button.classList.toggle('active', index === photoIndex));
    $('memoryStrip').querySelectorAll('.memory-thumb').forEach((button, index) => {
      button.classList.toggle('active', index === photoIndex);
      button.setAttribute('aria-pressed', String(index === photoIndex));
    });
    frame.classList.remove('is-changing');
  }, reduceMotion ? 0 : 350);
}
photos.forEach((photo, index) => {
  const dot = document.createElement('button'); dot.className = `film-dot${index === 0 ? ' active' : ''}`; dot.type = 'button'; dot.setAttribute('aria-label', `Show photograph ${index + 1}`);
  dot.addEventListener('click', () => updatePhoto(index)); $('filmDots').append(dot);
});
$('memoryStrip').querySelectorAll('.memory-thumb').forEach((button, index) => {
  button.setAttribute('aria-pressed', String(index === 0));
  button.addEventListener('click', () => updatePhoto(index));
});
$('photoPrev').addEventListener('click', () => updatePhoto(photoIndex - 1)); $('photoNext').addEventListener('click', () => updatePhoto(photoIndex + 1));
const photoDialog = $('photoDialog');
$('photoButton').addEventListener('click', () => { $('fullPhoto').src = photos[photoIndex].src; $('fullPhoto').alt = photos[photoIndex].alt; $('fullPhotoCaption').textContent = photos[photoIndex].caption; photoDialog.showModal(); });
$('closePhoto').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', (event) => { if (event.target === photoDialog) photoDialog.close(); });

let quoteIndex = 0;
function setQuote() { $('quoteText').innerHTML = quotes[quoteIndex]; $('quoteCount').textContent = `${String(quoteIndex + 1).padStart(2, '0')} — ${String(quotes.length).padStart(2, '0')}`; }
$('nextQuote').addEventListener('click', () => { quoteIndex = (quoteIndex + 1) % quotes.length; setQuote(); });
let wishIndex = 0;
function setWish() { $('wishNumber').textContent = String(wishIndex + 1).padStart(2, '0'); $('wishText').textContent = wishes[wishIndex]; $('wishProgress').style.width = `${((wishIndex + 1) / wishes.length) * 100}%`; }
$('nextWish').addEventListener('click', () => {
  if (wishIndex < wishes.length - 1) { wishIndex++; setWish(); chime(570 + (wishIndex % 7) * 35); }
  else $('gift').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
});

// Start the final dark-room reveal as soon as its scene enters view. The scroll
// fallback covers browsers where IntersectionObserver behaves inconsistently
// with tall, full-screen sections.
let giftStarted = false;
function startGiftReveal() {
  if (giftStarted) return;
  const bounds = $('gift').getBoundingClientRect();
  const inView = bounds.top < window.innerHeight * .9 && bounds.bottom > window.innerHeight * .1;
  if (!inView) return;
  giftStarted = true;
  $('gift').classList.add('gift-playing');
  $('toFinal').classList.remove('hidden');
}
const giftObserver = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.isIntersecting)) startGiftReveal();
}, { threshold: 0 });
giftObserver.observe($('gift'));
window.addEventListener('scroll', startGiftReveal, { passive: true });
window.addEventListener('resize', startGiftReveal);
$('toFinal').addEventListener('click', () => $('finale').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }));

scatterStars($('finaleStars'), 130);
const flame = $('wishCandle'); let wished = false;
flame.addEventListener('click', () => {
  if (wished) return; wished = true; flame.classList.add('out'); chime(430);
  window.setTimeout(() => {
    flame.classList.add('hidden'); $('finalWords').classList.remove('hidden');
    for (let i = 0; i < 48; i++) {
      const petal = document.createElement('i'); petal.className = 'petal'; petal.style.setProperty('--x', `${Math.random() * 100}%`);
      petal.style.setProperty('--dur', `${5 + Math.random() * 5}s`); petal.style.setProperty('--delay', `${Math.random() * 2}s`);
      petal.style.setProperty('--rot', `${Math.random() * 360}deg`); petal.style.setProperty('--drift', `${Math.random() * 180 - 90}px`); $('petals').append(petal);
    }
    $('finale').classList.add('finale-lit');
  }, 2000);
});
$('replay').addEventListener('click', () => { music.pause(); music.currentTime = 0; location.reload(); });

// Keep the music control honest if playback is paused by the browser or device.
music.addEventListener('pause', () => { $('musicToggle').setAttribute('aria-pressed', 'false'); $('musicToggle').setAttribute('aria-label', 'Play music'); });
music.addEventListener('play', () => { $('musicToggle').setAttribute('aria-pressed', 'true'); $('musicToggle').setAttribute('aria-label', 'Pause music'); });
