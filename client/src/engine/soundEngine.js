const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export const playSound = (type) => {
  if (audioCtx.state === 'suspended') {
      audioCtx.resume();
  }
  
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  const now = audioCtx.currentTime;
  
  if (type === 'correct') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.start(now);
    osc.stop(now + 0.5);
  } else if (type === 'wrong') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.3);
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.start(now);
    osc.stop(now + 0.5);
  } else if (type === 'heartbeat') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, now);
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.8, now + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.4);
  } else if (type === 'paper') {
    try {
        const bufferSize = audioCtx.sampleRate * 0.1;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 1000;
        
        const env = audioCtx.createGain();
        env.gain.setValueAtTime(0.2, now);
        env.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        noise.connect(filter);
        filter.connect(env);
        env.connect(audioCtx.destination);
        
        noise.start(now);
    } catch(e) { console.error('Audio noise error', e) }
  }
};
