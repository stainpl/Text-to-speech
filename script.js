// DOM refs
const voiceSelect   = document.getElementById('voiceSelect');
const speakButton   = document.getElementById('speakButton');
const textInput     = document.getElementById('textInput');
const rateControl   = document.getElementById('rate');
const pitchControl  = document.getElementById('pitch');

// Load & group voices by language
function loadVoices() {
  const allVoices = speechSynthesis.getVoices();
  const byLang = allVoices.reduce((map, v) => {
    (map[v.lang] = map[v.lang]||[]).push(v);
    return map;
  }, {});

  voiceSelect.innerHTML = '';
  Object.entries(byLang).forEach(([lang, voices]) => {
    const grp = document.createElement('optgroup');
    grp.label = lang;
    voices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = allVoices.indexOf(v);
      opt.textContent = v.name;
      grp.appendChild(opt);
    });
    voiceSelect.appendChild(grp);
  });
}

// Preview a short sample
function previewVoice(index = voiceSelect.value) {
  const utt = new SpeechSynthesisUtterance('Previewing voice.');
  const voices = speechSynthesis.getVoices();
  if (voices[index]) utt.voice = voices[index];
  utt.rate = 1; utt.pitch = 1;
  speechSynthesis.cancel();
  speechSynthesis.speak(utt);
}

// Speak full text
function speakText() {
  const text = textInput.value.trim();
  if (!text) return;
  const utt = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  const idx = voiceSelect.value;
  if (voices[idx]) utt.voice = voices[idx];
  utt.rate  = parseFloat(rateControl.value);
  utt.pitch = parseFloat(pitchControl.value);
  speechSynthesis.speak(utt);
}

// Events
voiceSelect.addEventListener('change', previewVoice);
voiceSelect.addEventListener('mouseover', e => {
  if (e.target.tagName === 'OPTION') previewVoice(e.target.value);
});
speakButton.addEventListener('click', speakText);

// Init
speechSynthesis.onvoiceschanged = loadVoices;
particlesJS("particles-js", {
  particles: { number:{value:60}, color:{value:"#fff"}, shape:{type:"circle"},
               opacity:{value:0.5}, size:{value:3}, move:{enable:true,speed:2} },
  interactivity:{ events:{ onhover:{enable:true,mode:"repulse"} } }
});
