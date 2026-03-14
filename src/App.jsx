import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Heart, Gift, MapPin, Coffee, Plane, MessageCircle, Star, Clock, ChevronDown, Sparkles, X, ChevronLeft, ChevronRight, CloudRain, Sun, Frown, Smile, Tv, Play, HeartPulse, Edit3, ShieldAlert, Car } from 'lucide-react';

// ==========================================
// 📸 ASSETS & MEDIA 🎵
// ==========================================
const ASSETS = {
  songUrl: "/audio/raatdigedi.mp3", 
  slideshowSongUrl: "/audio/udaarian.mp3", 
  introImages: [
    "/images/intro1.jpg",
    "/images/intro2.jpg",
    "/images/intro3.jpg",
    "/images/intro4.jpg"
  ],
  images: {
    hero: "/images/mumbai.jpg",
    hinge: "/images/firstdate.jpg", 
    airport: "/images/burgerking.jpg", 
    cops: "/images/irritated.jpg", 
    proposal: "/images/proposal.jpg", 
    thindlu: "/images/pppp.jpg", 
    saree: "/images/saree.jpg", 
  }
};

const OFFICIAL_DATE = new Date('2023-06-17T00:00:00');

// ==========================================
// 🌟 STARRY NIGHT BACKGROUND COMPONENT
// ==========================================
const StarryBackground = () => {
  const stars = useMemo(() => {
    return [...Array(150)].map((_, i) => ({
      id: i,
      width: Math.random() * 2 + 1 + 'px',
      height: Math.random() * 2 + 1 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      animationDelay: Math.random() * 5 + 's',
      animationDuration: Math.random() * 3 + 2 + 's',
      opacity: Math.random() * 0.8 + 0.2
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B1A] via-[#111133] to-[#0B0B1A] opacity-95" />
      {stars.map(({ id, ...styleProps }) => (
        <div key={id} className="absolute bg-white rounded-full animate-twinkle" style={styleProps} />
      ))}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
    </div>
  );
};

// ==========================================
// 🌟 MINIMALIST SVG DECORATIONS & CLOUDS
// ==========================================
const MinimalFirework = ({ className, style }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" className={className} style={style}>
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="M4.93 4.93l2.83 2.83" />
    <path d="M16.24 16.24l2.83 2.83" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="M4.93 19.07l2.83-2.83" />
    <path d="M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

const CloudBubble = ({ children, className = "" }) => {
  return (
    <div 
      className={`relative ${className}`} 
      style={{ filter: 'drop-shadow(1.5px 1.5px 0px #292524) drop-shadow(-1.5px -1.5px 0px #292524) drop-shadow(1.5px -1.5px 0px #292524) drop-shadow(-1.5px 1.5px 0px #292524) drop-shadow(0px 8px 15px rgba(0,0,0,0.1))' }}
    >
      <div className="bg-white rounded-[2rem] px-6 md:px-8 py-3 md:py-4 relative z-10 flex items-center justify-center text-center min-w-[120px]">
        <div className="absolute -top-3 left-[15%] w-8 h-8 bg-white rounded-full" />
        <div className="absolute -top-5 right-[20%] w-12 h-12 bg-white rounded-full" />
        <div className="absolute -bottom-3 left-[20%] w-10 h-10 bg-white rounded-full" />
        <div className="absolute -bottom-4 right-[15%] w-8 h-8 bg-white rounded-full" />
        <div className="absolute top-[20%] -left-3 w-8 h-8 bg-white rounded-full" />
        <div className="absolute top-[10%] -right-3 w-10 h-10 bg-white rounded-full" />
        
        <span className="relative z-20 text-stone-800 font-bold font-sans tracking-wide leading-tight text-sm md:text-base whitespace-nowrap">
          {children}
        </span>
      </div>
    </div>
  );
};

// ==========================================
// 🌟 ANIMATED COMPONENTS
// ==========================================
const Confetti = () => {
  const pieces = Array.from({ length: 100 }).map((_, i) => {
    const isCircle = Math.random() > 0.5;
    const colors = ['bg-rose-500', 'bg-yellow-400', 'bg-pink-400', 'bg-white', 'bg-orange-500'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100 + 'vw';
    const animationDelay = Math.random() * 3 + 's';
    const animationDuration = Math.random() * 2 + 3 + 's';
    return (
      <div 
        key={i} 
        className={`absolute top-[-10px] w-3 h-3 ${color} ${isCircle ? 'rounded-full' : 'rounded-sm'} animate-confetti-fall z-[100]`}
        style={{ left, animationDelay, animationDuration }}
      />
    );
  });
  return <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">{pieces}</div>;
};

const Typewriter = ({ words }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer = setTimeout(() => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(prev => prev + 1);
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return (
    <span className="text-7xl md:text-9xl font-black text-rose-950 mb-6 drop-shadow-sm tracking-tighter block">
      To {text}<span className="animate-blink font-light text-rose-400">|</span>
    </span>
  );
};

const FloatingParticle = ({ delay, left, size, duration }) => (
  <div 
    className="absolute text-rose-300 opacity-20 animate-float-up pointer-events-none z-0"
    style={{ left: `${left}%`, animationDelay: `${delay}s`, fontSize: `${size}px`, animationDuration: `${duration}s`, bottom: '-50px' }}
  >
    <Heart fill="currentColor" />
  </div>
);

const TimeCounter = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = now - OFFICIAL_DATE;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-md px-6 py-5 rounded-3xl shadow-lg border border-rose-100 flex flex-wrap justify-center gap-4 sm:gap-8 text-rose-900 mt-10 transform transition hover:scale-105 z-10 relative">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-rose-500 text-white text-xs px-4 py-1.5 rounded-full flex items-center gap-1.5 font-bold shadow-md tracking-wider">
        <Clock className="w-3.5 h-3.5" /> SINCE JUNE 17, 2023
      </div>
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds }
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center w-16 md:w-20">
          <span className="text-3xl md:text-4xl font-black">{item.value}</span>
          <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-rose-400 mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// ==========================================
// 🎥 SLIDESHOW & SECTIONS
// ==========================================
const JourneySlideshowOverlay = ({ events, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < events.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onClose(); 
      }
    }, 15000); 
    return () => clearTimeout(timer);
  }, [currentIndex, events.length, onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => console.log("Audio play blocked", error));
      }
    }
    return () => {
      document.body.style.overflow = 'auto';
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const nextSlide = () => {
    if (currentIndex < events.length - 1) setCurrentIndex(prev => prev + 1);
    else onClose(); 
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const slide = events[currentIndex];

  return (
    <div className="fixed inset-0 z-[150] bg-stone-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in">
      <audio ref={audioRef} src={ASSETS.slideshowSongUrl} loop />
      
      <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-white transition-colors p-3 bg-white/10 rounded-full hover:bg-rose-500 z-[160] shadow-lg hover:shadow-rose-500/50">
        <X className="w-8 h-8" />
      </button>

      <div key={currentIndex} className="relative w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-[0_0_60px_rgba(225,29,72,0.15)] animate-[scale-in_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
        <div className="absolute top-0 left-0 h-1.5 bg-rose-500 z-50 animate-[progress_15s_linear_forwards]" />

        {/* IMAGE CONTAINER FIX: Using relative flex container + absolute image to prevent ANY empty space */}
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[600px] shrink-0 bg-stone-100 flex">
           <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent md:hidden" />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col bg-stone-50 relative">
           <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-rose-200/90 rotate-[-2deg] shadow-sm z-30 opacity-80 backdrop-blur-sm" style={{ clipPath: 'polygon(0 0%, 100% 5%, 95% 100%, 5% 95%)'}} />

           <div className="flex justify-between items-center mb-8 border-b border-rose-200 pb-6 shrink-0">
             <h3 className="text-3xl md:text-5xl text-rose-900 pr-4 font-bold drop-shadow-sm" style={{ fontFamily: "'Caveat', cursive", lineHeight: '1.1' }}>{slide.title}</h3>
             <div className="text-rose-500 bg-rose-100 p-4 rounded-full shadow-inner shrink-0">
               {slide.icon}
             </div>
           </div>
           
           <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar">
             <p className="text-stone-800 leading-relaxed text-xl md:text-2xl font-medium" style={{ fontFamily: "'Caveat', cursive" }}>
               {slide.content}
             </p>
           </div>

           <div className="mt-8 flex items-center justify-between pt-6 border-t border-rose-100 shrink-0">
             <button onClick={prevSlide} disabled={currentIndex === 0} className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all ${currentIndex === 0 ? 'text-stone-300 cursor-not-allowed' : 'text-rose-500 hover:bg-rose-100 active:scale-95'}`}>
               <ChevronLeft className="w-5 h-5" /> Prev
             </button>
             
             <div className="flex gap-2 hidden sm:flex">
               {events.map((_, i) => (
                 <div key={i} className={`h-2.5 rounded-full transition-all duration-300 shadow-inner ${i === currentIndex ? 'w-8 bg-rose-500' : 'w-2.5 bg-rose-200'}`} />
               ))}
             </div>

             <button onClick={nextSlide} className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-rose-500 hover:bg-rose-100 transition-all active:scale-95">
               {currentIndex === events.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="w-5 h-5" />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const MoodSection = () => {
  const [isAround, setIsAround] = useState(false);

  return (
    <section className="py-20 md:py-32 relative z-10 w-full bg-stone-50">
      <div className={`max-w-4xl mx-auto px-6 md:px-12 py-16 rounded-[3rem] transition-all duration-1000 border backdrop-blur-xl shadow-2xl text-center relative overflow-hidden ${isAround ? 'bg-white/90 border-rose-200 shadow-[0_20px_50px_rgba(251,113,133,0.15)]' : 'bg-stone-900/95 border-stone-700 shadow-[0_20px_50px_rgba(0,0,0,0.4)]'}`}>
        <h2 className={`text-5xl md:text-7xl mb-12 font-bold transition-colors duration-1000 relative z-10 ${isAround ? 'text-rose-950' : 'text-stone-100'}`} style={{ fontFamily: "'Caveat', cursive" }}>
          The Kajori Effect
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-14 relative z-30 select-none">
          <span className={`font-medium text-lg md:text-xl transition-colors ${!isAround ? 'text-stone-300' : 'text-stone-400'}`}>When you're not around</span>
          <button
            onClick={() => setIsAround(!isAround)}
            className={`w-28 h-14 rounded-full p-1.5 transition-colors duration-500 flex items-center shadow-inner relative ${isAround ? 'bg-rose-100' : 'bg-black/60'} cursor-pointer hover:scale-105 active:scale-95`}
          >
            <div className={`w-11 h-11 rounded-full shadow-lg transform transition-transform duration-500 flex items-center justify-center ${isAround ? 'translate-x-14 bg-rose-500' : 'translate-x-0 bg-stone-600'}`}>
              {isAround ? <Heart className="w-5 h-5 text-white animate-pulse" fill="currentColor"/> : <CloudRain className="w-5 h-5 text-white"/>}
            </div>
          </button>
          <span className={`font-medium text-lg md:text-xl transition-colors ${isAround ? 'text-rose-900' : 'text-stone-500'}`}>When you're with me!</span>
        </div>

        <div className={`h-[280px] md:h-[300px] w-full max-w-md mx-auto rounded-3xl p-8 relative transition-all duration-700 overflow-hidden ${isAround ? 'bg-rose-50 border border-rose-100' : 'bg-white/5 border border-white/10'}`}>
          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${!isAround ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <div className="relative mb-6">
              <CloudRain className="w-24 h-24 text-stone-500 absolute -top-4 -left-4 -z-10 animate-bounce-slight opacity-50 pointer-events-none" />
              <Frown className="w-20 h-20 text-stone-400 animate-pulse-slow pointer-events-none" />
            </div>
            <p className="text-stone-300 text-3xl font-medium leading-relaxed select-none" style={{ fontFamily: "'Caveat', cursive" }}>
              Life feels pretty dull... <br/> just waiting to see you again. 🥺
            </p>
          </div>

          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${isAround ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <div className="relative mb-6">
               <Sun className="w-28 h-28 text-yellow-400 absolute -top-6 -left-4 -z-10 animate-spin-slow opacity-90 pointer-events-none" />
               <Smile className="w-20 h-20 text-rose-500 animate-bounce pointer-events-none" />
            </div>
            <p className="text-rose-950 text-3xl font-bold leading-relaxed select-none" style={{ fontFamily: "'Caveat', cursive" }}>
              Everything is magical! <br/> I'm the happiest guy ever! 🥰
            </p>
            
            <div className="absolute inset-0 pointer-events-none -m-10">
               {[...Array(8)].map((_,i) => (
                 <Heart key={i} className="absolute text-rose-400 animate-float-up opacity-80" style={{ left: `${10 + Math.random()*80}%`, bottom: `${Math.random()*20}%`, animationDelay: `${Math.random() * 2}s` }} fill="currentColor" />
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MovieProposalSection = () => {
  const [movieState, setMovieState] = useState('idle'); 
  const [progress, setProgress] = useState(0);

  const handlePlay = () => {
    setMovieState('playing');
    let p = 0;
    const interval = setInterval(() => {
      p += 1;
      setProgress(p);
      if (p >= 10) {
        clearInterval(interval);
        setTimeout(() => {
          setMovieState('distracted');
          setTimeout(() => setMovieState('phone'), 3000);
        }, 800);
      }
    }, 250); 
  };

  const reset = () => {
    setMovieState('idle');
    setProgress(0);
  };

  return (
    <section className="pb-24 pt-10 relative z-10 text-center">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h2 className="text-5xl md:text-7xl text-rose-200 mb-6 drop-shadow-md" style={{ fontFamily: "'Caveat', cursive" }}>The Night It Became Official</h2>
        <p className="text-indigo-200 mb-14 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
          My parents were out. You came over. We were supposed to watch a movie...
        </p>

        <div className={`relative mx-auto w-full max-w-3xl bg-black rounded-xl md:rounded-3xl border-[8px] md:border-[12px] border-stone-800 shadow-[0_0_60px_rgba(0,0,0,0.6)] transition-all duration-1000 overflow-hidden ${movieState === 'distracted' || movieState === 'phone' ? 'h-24 md:h-32 opacity-60' : 'aspect-video'}`}>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-stone-800 rounded-b-lg" />

          {movieState === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900 group">
              <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Tv className="w-12 h-12 md:w-16 md:h-16 text-stone-600 mb-4 transition-transform group-hover:scale-110 duration-500" />
              <h3 className="text-2xl md:text-4xl font-black text-white tracking-[0.3em] mb-8 text-shadow-glow">JUJUTSU KAISEN 0</h3>
              <button onClick={handlePlay} className="bg-rose-600 text-white px-8 py-3 rounded-full flex items-center gap-3 hover:bg-rose-500 transition-all hover:scale-105 shadow-[0_0_20px_rgba(225,29,72,0.4)] z-10 font-bold uppercase tracking-wider text-sm md:text-base">
                <Play className="w-5 h-5 fill-current" /> Play Movie
              </button>
            </div>
          )}

          {movieState === 'playing' && (
            <div className="absolute inset-0 bg-indigo-950 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-[0.3em] mb-10 animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">JUJUTSU KAISEN 0</h3>
              <div className="w-4/5 max-w-md bg-stone-800 rounded-full h-2 md:h-3 overflow-hidden relative shadow-inner">
                <div className="bg-rose-500 h-full transition-all duration-200 ease-linear" style={{ width: `${(progress / 10) * 100}%` }} />
              </div>
              <div className="flex justify-between w-4/5 max-w-md mt-3 text-stone-400 font-mono text-xs md:text-sm">
                <span>00:{progress < 10 ? `0${progress}` : progress}:00</span>
                <span>01:45:00</span>
              </div>
            </div>
          )}

          {(movieState === 'distracted' || movieState === 'phone') && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <p className="text-rose-500 font-bold tracking-[0.2em] md:tracking-[0.4em] text-lg md:text-xl animate-pulse">... 10 MINUTES LATER ...</p>
            </div>
          )}
        </div>

        {movieState === 'distracted' && (
          <div className="mt-16 animate-fade-in-up">
            <HeartPulse className="w-20 h-20 text-rose-500 mx-auto animate-bounce shadow-rose-500/50 drop-shadow-2xl" />
            <p className="text-white mt-6 text-2xl md:text-4xl font-medium" style={{ fontFamily: "'Caveat', cursive" }}>
              Yeah... we couldn't keep our hands off each other. 🙈
            </p>
          </div>
        )}

        {movieState === 'phone' && (
          <div className="mt-16 flex flex-col items-center animate-slide-up-phone relative z-20">
            <p className="text-rose-200 mb-10 text-2xl md:text-4xl drop-shadow-md" style={{ fontFamily: "'Caveat', cursive" }}>
              Then I nervously whipped out my phone...
            </p>
            <div className="w-[300px] md:w-[380px] h-[580px] md:h-[700px] bg-white rounded-[3rem] border-[14px] border-stone-800 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col transform transition-transform hover:scale-[1.02] duration-500">
              <div className="absolute top-0 inset-x-0 h-7 bg-stone-800 rounded-b-3xl w-36 mx-auto z-20" />
              <div className="bg-white h-8 w-full shrink-0 flex items-end justify-between px-6 pb-1 text-[10px] font-bold text-stone-800">
                <span>11:45</span>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-stone-800 rounded-sm" /></div>
              </div>
              <div className="bg-yellow-50/80 pt-2 pb-3 px-4 flex items-center justify-between border-b border-yellow-200 shrink-0">
                <span className="text-yellow-600 font-medium text-sm md:text-base flex items-center gap-1"><ChevronLeft className="w-5 h-5" /> Folders</span>
                <Edit3 className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1 bg-yellow-50/40 p-6 pt-4 text-left overflow-y-auto relative custom-scrollbar">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #eab308 28px, #eab308 29px)', backgroundAttachment: 'local' }} />
                <div className="relative z-10 text-stone-800">
                  <h4 className="font-bold text-base mb-4 text-stone-900 font-sans tracking-wide">17 June 2023</h4>
                  <p className="leading-relaxed whitespace-pre-line text-stone-900 font-medium" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.45rem' }}>
                    {`Okay. Kajori-san, I wanted to tell this to you yesterday but Ig I lost track between all my low iq and, possibly, dumb questions xD\n\nI know that you’ve had your trust broken multiple times, but I assure you. I will never do anything to hurt you. Never. I will do my best to earn your trust, because Ik it’s not something you can just give me simply.\n\nAnd also, I adore the heck out of you. I like you a lottttt (like a lottttttttttt. The number of ts express the degree :P). I love the way you smile at my jokes even though they’re lame most times. I feel comfortable with you. Words come out naturally when I speak with you. Nothing is forced. You make me feel like I’m special :P. I hope I can make you feel the same way.\n\nThis is my confession to you. I know you’ve just come out of a tough relationship. I will wait for how ever long it takes. You’re my crush, and a crush is worth the wait :’)\n\nKajori.\n\nFrom the moment I met you, I’ve felt different. Good different. Something I’ve never felt before. Something that was missing from my life. Something that I had wanted but could never get. But with you, it’s there. It just is.\n\nYou love me. Inspite of all of my stupidity, my weird jokes, my very needy self :P, You have been with me. With this guy who didn’t know what love was before he met you. Now all he can do is think about you. If I look at a meme, I think of showing it to you. If I have food, I think of sharing it with you (only the good ones though. If it’s not good I can hear you say “Ye kya le aaya, khajur” :P). Everything I do is associated with you. Everything I do makes me think of you.\nEverything I do reassures me that I’m truly in love with you.\n\nI really am. Every inch of me loves you. I love your smile. Your voice. Your blushing :P. Everyday I want more of you. I can never have enough. I want you with me. I need you with me. Forever.\n\nI don’t know if I deserve you. I truly don’t know that. I only know that I’m madly in love with you. I can only hope that you are too.\n\nSo, Kajori, if you’ll have me, will do me the favour of being my girlfriend?`}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-2 inset-x-0 h-1.5 bg-stone-300 w-1/3 mx-auto rounded-full z-20" />
            </div>
            <button onClick={reset} className="mt-12 px-8 py-3 rounded-full border-2 border-indigo-400 text-indigo-300 hover:bg-indigo-900 hover:text-white transition-all text-sm font-bold uppercase tracking-widest bg-indigo-950/50 backdrop-blur-sm">
              Close Notes
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// 8. Interactive Police Mini-Game (Compact Arcade Overlay)
const PoliceEscapeGame = ({ onClose }) => {
  const [score, setScore] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [copWarning, setCopWarning] = useState(false);
  const [preWarning, setPreWarning] = useState(false); 
  const [gameState, setGameState] = useState('idle'); // idle, playing, caught, won

  // Prevent background scrolling while game is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Keyboard Spacebar Listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault(); 
        if (gameState === 'playing' && !e.repeat) {
          setIsPressing(true);
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'playing') {
          setIsPressing(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Game Loop: Safely increment score independent of other state updates
  useEffect(() => {
    let interval;
    if (gameState === 'playing' && isPressing && !copWarning) {
      interval = setInterval(() => {
        setScore(s => s + 1.5);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [gameState, isPressing, copWarning]);

  // Win Condition Check
  useEffect(() => {
    if (score >= 100 && gameState === 'playing') {
      setGameState('won');
      setIsPressing(false);
      setScore(100);
    }
  }, [score, gameState]);

  // Caught Condition Check
  useEffect(() => {
    if (isPressing && copWarning && gameState === 'playing') {
      setGameState('caught');
      setIsPressing(false);
    }
  }, [isPressing, copWarning, gameState]);

  // Random Cop Spawner
  useEffect(() => {
    let timeout;
    if (gameState === 'playing' && !copWarning && !preWarning) {
      timeout = setTimeout(() => {
        setPreWarning(true); // Triggers the 1-second text warning
      }, Math.random() * 2000 + 1000); // Reduced delay: now spawns randomly between 1 to 3 seconds
    }
    return () => clearTimeout(timeout);
  }, [gameState, copWarning, preWarning]);

  // Pre-warning 1-second logic
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && preWarning) {
      timer = setTimeout(() => {
        // Warning ends after EXACTLY 1 second, cops arrive!
        setPreWarning(false);
        setCopWarning(true);
        // Cops stay for a short time before leaving
        setTimeout(() => {
          setCopWarning(false);
        }, Math.random() * 500 + 1000); 
      }, 1000); 
    }
    return () => clearTimeout(timer);
  }, [preWarning, gameState]);

  const startGame = () => {
    setScore(0);
    setCopWarning(false);
    setPreWarning(false);
    setGameState('playing');
    setIsPressing(false);
  };

  return (
    <div className="fixed inset-0 z-[160] bg-stone-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-2 md:p-4 animate-fade-in overflow-hidden">
      
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors p-3 bg-white/10 rounded-full hover:bg-rose-500 z-[170] shadow-lg"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="max-w-5xl mx-auto px-2 md:px-4 relative z-10 text-center w-full h-full max-h-[100vh] flex flex-col justify-center animate-[scale-in_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
        <div className="overflow-y-auto custom-scrollbar flex flex-col items-center w-full py-4">
          <h2 className="text-4xl md:text-6xl text-rose-300 mb-2 md:mb-4 drop-shadow-md shrink-0 font-bold" style={{ fontFamily: "'Caveat', cursive" }}>The Long Drive Scare</h2>
          <p className="text-indigo-200 mb-4 md:mb-6 text-sm md:text-lg font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-sm shrink-0">
            Remember when we were parked in front of VET Ground? Let's see if you can sneak a kiss without getting caught by the cops this time! 😂
          </p>

          {/* Game Container */}
          <div className={`relative w-full max-w-4xl mx-auto rounded-[2rem] border-[6px] overflow-hidden shadow-2xl transition-colors duration-100 shrink min-h-[300px] ${copWarning ? 'animate-siren border-red-500 shadow-[0_0_100px_rgba(255,0,0,0.8)]' : 'bg-stone-900 border-stone-700 shadow-[0_0_50px_rgba(0,0,0,0.8)]'}`}>
            
            {/* Flashing Police Lights Effect */}
            {copWarning && <div className="absolute inset-0 bg-red-600/20 animate-pulse pointer-events-none" />}

            <div className="p-6 md:p-10 flex flex-col items-center relative z-10 h-full justify-center">
              
              {/* Visual Screen */}
              <div className="h-32 md:h-56 flex items-center justify-center relative w-full mb-8 bg-black/70 rounded-3xl border-2 border-white/10 overflow-hidden shadow-inner">
                 
                 {/* Pre-Warning Text Overlay */}
                 {preWarning && (
                   <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center bg-orange-500/90 px-6 py-2.5 rounded-full border-4 border-orange-300 shadow-[0_0_30px_rgba(249,115,22,0.8)] animate-pulse">
                      <span className="text-xl md:text-2xl font-black text-white tracking-widest uppercase whitespace-nowrap drop-shadow-md">
                         ⚠️ Police incoming...
                      </span>
                   </div>
                 )}

                 {/* Massive Police Warning Overlay */}
                 {copWarning && (
                   <div className="absolute inset-0 z-20 flex items-center justify-center bg-red-600/40 backdrop-blur-[2px]">
                      <span className="text-5xl md:text-7xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_30px_rgba(255,0,0,1)] animate-[bounce-slight_0.3s_ease-in-out_infinite]">🚨 POLICE! 🚨</span>
                   </div>
                 )}

                 {gameState === 'idle' && (
                   <Car className="w-20 h-20 md:w-32 md:h-32 text-stone-400 opacity-80" />
                 )}
                 
                 {gameState === 'playing' && (
                   <div className="flex flex-col items-center relative z-10">
                     {copWarning ? (
                       <ShieldAlert className="w-20 h-20 md:w-32 md:h-32 text-transparent" /> /* Invisible placeholder */
                     ) : (
                       <div className={`text-6xl md:text-8xl transition-transform duration-100 ${isPressing ? 'scale-125 animate-[bounce-slight_0.5s_ease-in-out_infinite]' : 'scale-100'}`}>
                         {isPressing ? '👩‍❤️‍💋‍👨' : '🚗'}
                       </div>
                     )}
                     {isPressing && !copWarning && (
                       <Heart className="absolute -top-6 -right-6 md:-top-8 md:-right-8 w-10 h-10 text-rose-500 animate-float-up fill-current" />
                     )}
                   </div>
                 )}

                 {gameState === 'caught' && (
                   <div className="flex flex-col items-center z-10">
                     <span className="text-6xl md:text-8xl mb-4">👮‍♂️🚨</span>
                     <p className="text-red-400 font-bold tracking-widest uppercase text-sm md:text-xl drop-shadow-md">"STEP OUTSIDE OF THE CAR!"</p>
                   </div>
                 )}

                 {gameState === 'won' && (
                   <div className="flex flex-col items-center z-10">
                     <span className="text-6xl md:text-8xl mb-4">🥰🎉</span>
                     <p className="text-rose-400 font-bold tracking-widest uppercase text-sm md:text-xl drop-shadow-md">You safely survived the drive!</p>
                   </div>
                 )}
              </div>

              {/* Passion Progress Bar */}
              <div className="w-full bg-stone-950 rounded-full h-8 mb-8 border-2 border-stone-700 relative overflow-hidden shadow-inner">
                 <div 
                   className={`h-full transition-all duration-75 ${score === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-rose-600 to-pink-500'}`} 
                   style={{ width: `${score}%` }} 
                 />
                 <span className="absolute inset-0 flex items-center justify-center text-xs md:text-sm font-black tracking-widest text-white/80 uppercase drop-shadow-md">
                   Passion Meter
                 </span>
              </div>

              {/* Controls */}
              {gameState === 'idle' || gameState === 'caught' || gameState === 'won' ? (
                <button 
                  onClick={startGame}
                  className="bg-rose-500 text-white px-8 py-4 md:px-12 md:py-5 rounded-full font-bold hover:bg-rose-600 transition-all active:scale-95 shadow-[0_0_30px_rgba(244,63,94,0.4)] w-full md:w-auto text-lg md:text-2xl tracking-wider"
                >
                  {gameState === 'idle' ? 'Start Game' : 'Try Again'}
                </button>
              ) : (
                <div className="w-full flex flex-col items-center gap-2 md:gap-4 shrink-0">
                  <div
                    className={`w-full py-4 md:py-6 rounded-2xl font-black text-lg md:text-2xl tracking-widest uppercase transition-all select-none shadow-2xl border-b-8 ${copWarning ? 'bg-red-600 text-white border-red-800 scale-[0.98]' : isPressing ? 'bg-rose-400 text-white border-rose-600 scale-[0.98]' : 'bg-rose-500 text-white border-rose-700'}`}
                  >
                    {copWarning ? "LET GO NOW!!!" : "[ HOLD SPACEBAR ]"}
                  </div>
                  <p className={`text-sm md:text-lg font-bold mt-2 ${copWarning ? 'text-red-400 animate-pulse' : 'text-stone-400'}`}>
                    Let go <span className={`${copWarning ? 'text-white bg-red-600' : 'text-red-400 bg-red-400/10'} px-2 py-0.5 rounded`}>IMMEDIATELY</span> if you see police!
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// 9. Fixed Scroll Reminder
const ScrollReminder = () => {
  const [scrollState, setScrollState] = useState({ mood: 'happy', dir: 'up', inView: false });

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const btn = document.getElementById('memory-btn-container');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      const distance = inView ? 0 : (rect.top > window.innerHeight ? rect.top - window.innerHeight : -rect.bottom);
      const dir = rect.top > window.innerHeight / 2 ? 'down' : 'up';

      let mood = 'happy';
      if (distance > 1200) mood = 'crying';
      else if (distance > 400) mood = 'sad';

      setScrollState(prev =>
         (prev.mood === mood && prev.dir === dir && prev.inView === inView) ? prev : { mood, dir, inView }
      );
    };
    
    const onScroll = () => {
       if (!ticking) {
           window.requestAnimationFrame(() => {
               handleScroll();
               ticking = false;
           });
           ticking = true;
       }
    };
    
    window.addEventListener('scroll', onScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { mood, dir, inView } = scrollState;

  return (
    <div
      onClick={() => {
        const btn = document.getElementById('memory-btn-container');
        if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }}
      className={`fixed bottom-8 right-6 md:right-8 z-[140] cursor-pointer transition-all duration-700 hover:scale-110 ${inView ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}
    >
       <div className="relative animate-[bounce-slight_3s_ease-in-out_infinite]">
          <CloudBubble>
             {mood === 'happy' && <span>Memory Lane<br/>is near! 🥰 {dir === 'up' ? '⬆️' : '⬇️'}</span>}
             {mood === 'sad' && <span className="text-orange-600">Wait, scroll back!<br/>🥺 {dir === 'up' ? '⬆️' : '⬇️'}</span>}
             {mood === 'crying' && <span className="text-rose-600">Kaha Gayeeeeeee<br/>😭 {dir === 'up' ? '⬆️' : '⬇️'}</span>}
          </CloudBubble>
       </div>
    </div>
  );
};

export default function App() {
  const [appStep, setAppStep] = useState(0); // 0: Pre-intro, 1: Intro (Photos), 2: Main Site
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [hasOpenedMemoryLane, setHasOpenedMemoryLane] = useState(false);
  const [giftRevealed, setGiftRevealed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showGame, setShowGame] = useState(false);

  const globalAudioRef = useRef(null);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);

  // Handle global background music - Starts immediately upon any interaction
  useEffect(() => {
    const unlockAudio = () => {
      if (!isAudioUnlocked && globalAudioRef.current) {
        globalAudioRef.current.volume = 0.3;
        globalAudioRef.current.play()
          .then(() => setIsAudioUnlocked(true))
          .catch(e => console.log("Audio blocked by browser policy", e));
      }
    };

    // Listen for any tap or click anywhere on the page to unlock the audio
    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);
    
    // Try playing immediately (might work if browser has cached permissions)
    unlockAudio();

    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
  }, [isAudioUnlocked]);

  // Pause audio when slideshow opens, resume when it closes
  useEffect(() => {
    if (!globalAudioRef.current) return;
    
    if (showSlideshow) {
      globalAudioRef.current.pause();
    } else if (isAudioUnlocked && appStep > 0) {
      globalAudioRef.current.play().catch(() => {});
    }
  }, [showSlideshow, isAudioUnlocked, appStep]);

  const handlePreIntroClick = () => {
    if (globalAudioRef.current && !isAudioUnlocked) {
      globalAudioRef.current.volume = 0.3;
      globalAudioRef.current.play().then(() => setIsAudioUnlocked(true)).catch(() => {});
    }
    setAppStep(1);
  };

  const handleIntroClick = () => {
    setAppStep(2);
  };

  const revealGift = () => {
    setGiftRevealed(true);
    setTimeout(() => {
      setShowPopup(true);
    }, 1500);
  };

  const timelineEvents = [
    {
      id: 1,
      title: "The Hinge Match & The Epic Fail",
      icon: <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      image: ASSETS.images.hinge,
      content: `It all started with a swipe. I saw you liked "Death By Chocolate". Trying to be smooth, I messaged in Kannada: "Nimma delivery bandide madam". Your reply? "I don't understand Kannada." I was so embarrassed! But despite the 30km distance, we couldn't stop talking.`,
    },
    {
      id: 2,
      title: "Jumping at the Airport",
      icon: <Plane className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      image: ASSETS.images.airport,
      content: `I went to pick you up late at night. Through the sea of cars, I saw you literally jumping up and down looking for me. We ended up at Burger King (our technical first date!). Later, we shared our first kiss. I was such a noob I was running out of breath, but it was perfect.`,
    },
    {
      id: 3,
      title: "\"Love Ya Too\" & The Police Siren",
      icon: <Coffee className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      image: ASSETS.images.cops,
      content: `You said "I love you" first while I was on a trip. I was completely taken aback. Trying to play it cool, I just said "love ya too" 😂. And who could forget our long drive? We got carried away, a police van rolled up with sirens blaring, and we were terrified. Best funny memory ever.`,
    },
    {
      id: 4,
      title: "June 17, 2023",
      icon: <Heart className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" />,
      image: ASSETS.images.proposal,
      content: `You came to my house late at night. We tried to watch Jujutsu Kaisen Zero, but 10 mins in, we couldn't keep our hands off each other. Later, I whipped out my phone with my pre-written proposal. You got emotional, said yes, and the rest is history.`,
    },
    {
      id: 5,
      title: "The Thindlu Irony",
      icon: <MapPin className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      image: ASSETS.images.thindlu,
      content: `You wanted to move closer, so I suggested "Thindlu". You hated the name! You found a great 1BHK online in Vidyaranyapura. We finalized it... and guess what? It was in Thindlu! Fate has a sense of humor. We spent hours sitting in that parking lot before you moved to Mumbai.`,
    },
    {
      id: 6,
      title: "Why I Love You, Jaan",
      icon: <Star className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" />,
      image: ASSETS.images.saree,
      content: `I love your smile. I love the way you look at me, as if speaking directly with your eyes. I love how you dress up for me, especially in a beautiful saree. But most of all, I love how easy it is to be around you. You are my safe space and my best friend.`,
    }
  ];

  return (
    <>
      {/* Global Background Audio - Rendered at the root so it persists and plays seamlessly across screens */}
      <audio ref={globalAudioRef} src={ASSETS.songUrl} loop />

      {appStep === 0 && (
        <div 
          className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-6 relative overflow-hidden text-center cursor-pointer select-none"
          onClick={handlePreIntroClick}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes text-fade-in {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .animate-text-1 { animation: text-fade-in 1.5s ease-out 0.5s forwards; }
            .animate-text-2 { animation: text-fade-in 1.5s ease-out 2.5s forwards; }
            .animate-text-3 { animation: text-fade-in 1.5s ease-out 4.5s forwards; }
            .animate-text-4 { animation: text-fade-in 1.5s ease-out 6.5s forwards; }
          `}} />
          
          <div className="max-w-2xl mx-auto font-medium leading-relaxed space-y-8 text-3xl md:text-5xl" style={{ fontFamily: "'Caveat', cursive" }}>
            <p className="text-stone-300 opacity-0 animate-text-1">Hey Kajori...</p>
            <p className="text-stone-300 opacity-0 animate-text-2">I know I can't be there with you today.</p>
            <p className="text-rose-300 opacity-0 animate-text-3">But I hope you like this little surprise. ❤️</p>
          </div>

          <button className="absolute bottom-16 text-rose-400/60 uppercase tracking-[0.3em] text-xs font-bold opacity-0 animate-text-4 animate-pulse">
            [ Tap anywhere to continue ]
          </button>
        </div>
      )}

      {appStep === 1 && (
        <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
          <style dangerouslySetInnerHTML={{__html: `
            @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');
            .heart-beat { animation: heartbeat 1.5s infinite; }
            @keyframes heartbeat {
              0%, 28%, 70% { transform: scale(1); }
              14%, 42% { transform: scale(1.1); }
            }

            /* Cinematic Background Crossfade Animation */
            @keyframes cinematic-fade {
              0% { opacity: 0; transform: scale(1); }
              10% { opacity: 0.6; }
              20% { opacity: 0.6; transform: scale(1.05); }
              30% { opacity: 0; transform: scale(1.1); }
              100% { opacity: 0; transform: scale(1.1); }
            }
          `}} />

          {/* Fading Background Photos */}
          <div className="absolute inset-0 z-0">
            {ASSETS.introImages.map((img, index) => (
              <div 
                key={`intro-bg-${index}`}
                className="absolute inset-0 bg-cover bg-center opacity-0 animate-[cinematic-fade_24s_infinite]"
                style={{
                  backgroundImage: `url(${img})`,
                  /* A negative offset fast-forwards the first image so it starts perfectly visible! */
                  animationDelay: `${(index * 6) - 2.4}s` 
                }}
              />
            ))}
            {/* Dark Overlay to make sure text is still very readable */}
            <div className="absolute inset-0 bg-stone-950/70 pointer-events-none" />
          </div>

          <div onClick={handleIntroClick} className="cursor-pointer group relative z-10 transform transition duration-500 hover:scale-105">
            <div className="bg-white/95 backdrop-blur-xl p-10 md:p-14 rounded-3xl shadow-[0_0_60px_rgba(251,113,133,0.3)] border border-rose-200/50 text-center max-w-sm w-full">
              <div className="bg-rose-100 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-rose-200 transition-colors shadow-inner">
                <Heart className="w-14 h-14 text-rose-500 heart-beat" fill="currentColor" />
              </div>
              <h1 className="text-5xl text-rose-900 mb-3" style={{ fontFamily: "'Caveat', cursive" }}>For My Jaan</h1>
              <p className="text-rose-400 font-bold uppercase tracking-[0.3em] text-xs">Tap to open</p>
            </div>
          </div>
        </div>
      )}

      {appStep === 2 && (
        <div className="min-h-screen bg-stone-50 text-gray-800 overflow-x-hidden relative selection:bg-rose-200 selection:text-rose-900 flex flex-col">
          
          {/* Background Particles globally overlayed */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply">
            {[...Array(20)].map((_, i) => (
              <FloatingParticle key={i} delay={Math.random() * 5} left={Math.random() * 100} size={15 + Math.random() * 15} duration={15 + Math.random() * 15} />
            ))}
          </div>

          {/* The Central "Story Thread" Line integrating the whole site */}
          <div 
            className="hidden md:block absolute top-[100vh] bottom-[20vh] left-1/2 w-px border-l-2 border-dashed border-rose-300/60 -translate-x-1/2 z-0 pointer-events-none" 
            style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
          />

          {giftRevealed && <Confetti />}

          {/* Fixed Scroll Reminder */}
          {!hasOpenedMemoryLane && <ScrollReminder />}

          {/* Story Popup Modal */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-[110] bg-rose-950/70 backdrop-blur-md p-4 animate-fade-in">
              <div className="bg-white rounded-[2rem] p-10 max-w-md w-full shadow-2xl transform animate-bounce-in relative text-center border-4 border-rose-100">
                <button 
                  onClick={() => setShowPopup(false)}
                  className="absolute top-5 right-5 text-stone-400 hover:text-stone-600 transition bg-stone-100 p-2 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Gift className="w-10 h-10 text-rose-500" />
                </div>
                <h3 className="text-4xl text-rose-900 mb-4 font-bold" style={{ fontFamily: "'Caveat', cursive" }}>Surprise! 🎉</h3>
                <p className="text-lg text-stone-600 font-medium leading-relaxed mb-6">
                  "Nimma delivery bandide madam!" 🍫<br/><br/>
                  Now you can finally order that Death by Chocolate... or maybe get some non-veg Burger King this time 😉.
                </p>
                <p className="text-2xl text-rose-500 font-bold mb-8" style={{ fontFamily: "'Caveat', cursive" }}>Happy Birthday, beautiful! ❤️</p>
                <button 
                  onClick={() => setShowPopup(false)}
                  className="bg-rose-500 text-white px-8 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:bg-rose-600 active:scale-95 transition-all w-full text-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Hero Section */}
          <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-10 bg-stone-50 z-10">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
              style={{ backgroundImage: `url(${ASSETS.images.hero})`, backgroundAttachment: 'fixed' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50/70 via-stone-50/50 to-stone-50" />
            
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-[-5vh]">
              <div className="animate-[fade-in-up_1s_ease-out_forwards]">
                <span className="inline-block py-2 px-8 rounded-full bg-white/90 backdrop-blur-sm text-rose-600 font-bold tracking-[0.25em] text-xs mb-10 shadow-sm border border-rose-100">
                  MARCH 15, 2026
                </span>
                <h2 className="text-4xl md:text-6xl text-rose-500 mb-4 font-bold" style={{ fontFamily: "'Caveat', cursive" }}>
                  Happy 25th Birthday
                </h2>
                
                <div className="h-24 md:h-32 flex items-center justify-center">
                   <Typewriter words={["Kajori", "My Jaan", "My Love", "My Everything"]} />
                </div>
                
                <p className="text-lg md:text-2xl text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed font-medium mt-6 px-4">
                  From swiping right and terrible Kannada translations, to airport jumping and parking lot conversations. Here is the story of us.
                </p>
              </div>

              <div className="animate-[fade-in-up_1.5s_ease-out_forwards] opacity-0 w-full px-4">
                <TimeCounter />
              </div>

              <div className="mt-24 animate-bounce text-rose-400 opacity-80">
                <ChevronDown className="w-12 h-12" />
              </div>
            </div>
          </header>

          {/* Main Flow: Journey -> Mood -> Bridge -> Movie -> Game */}
          <div className="w-full relative z-10 flex flex-col bg-stone-50">
            
            {/* Story Timeline Button Section */}
            <main className="w-full px-4 py-28 md:py-40 flex flex-col items-center justify-center relative">
              <div className="text-center mb-16 relative bg-stone-50/90 backdrop-blur-sm px-10 py-8 rounded-[3rem] shadow-sm border border-stone-100">
                <h2 className="text-6xl md:text-7xl text-rose-900 font-bold" style={{ fontFamily: "'Caveat', cursive" }}>Our Journey</h2>
                <div className="h-1.5 w-32 bg-rose-300 mx-auto mt-8 rounded-full opacity-60" />
                <p className="mt-8 text-stone-500 font-medium text-xl">A look back at all our beautiful moments.</p>
              </div>

              {/* Absolute "Click Me!!!" Cloud Pointing Directly at the Button */}
              <div id="memory-btn-container" className="relative flex justify-center mt-6 mb-16">
                {!hasOpenedMemoryLane && (
                  <div className="absolute bottom-[110%] right-0 md:-right-12 transform translate-y-2 pointer-events-none z-20 flex flex-col items-center animate-[bounce-slight_3s_ease-in-out_infinite]">
                    <svg width="40" height="55" viewBox="0 0 60 100" fill="none" className="stroke-stone-700 ml-10" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M 30 0 C 50 20, -10 30, 10 50 C 30 70, 50 30, 20 70 C 5 90, 5 90, 5 90" />
                      <path d="M -5 75 L 5 90 L 20 85" />
                    </svg>
                  </div>
                )}

                <button 
                  onClick={() => {
                    setShowSlideshow(true);
                    setHasOpenedMemoryLane(true);
                }}
                  className="bg-rose-500 text-white px-12 py-6 rounded-full font-bold text-xl md:text-3xl hover:bg-rose-600 transition-all shadow-[0_0_40px_rgba(225,29,72,0.3)] hover:shadow-[0_0_50px_rgba(225,29,72,0.5)] flex items-center gap-5 transform hover:scale-105 active:scale-95 relative z-10"
                >
                  <Play className="w-10 h-10 fill-current" />
                  Open The Memory Lane
                </button>
              </div>
            </main>

            <MoodSection />

            {/* --- NIGHT SKY WRAPPER --- */}
            <div className="relative w-full overflow-hidden flex flex-col">
              <StarryBackground />
              
              {/* Smooth Fade-in for the stars from the white background */}
              <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-stone-50 to-transparent pointer-events-none z-0" />

              {/* Smooth Cinematic Bridge to Darkness */}
              <div className="w-full pt-48 pb-12 relative z-10 flex items-center justify-center text-center px-4">
                <p className="text-4xl md:text-6xl text-stone-300 font-medium drop-shadow-xl leading-snug" style={{ fontFamily: "'Caveat', cursive" }}>
                  But through the highs and the lows... <br/>
                  <span className="text-indigo-300 mt-6 inline-block drop-shadow-[0_0_15px_rgba(165,180,252,0.5)] font-bold">every single moment led up to this night.</span>
                </p>
              </div>

              {/* Movie Section */}
              <div className="w-full relative z-10 pt-10 pb-20 flex flex-col items-center">
                <MovieProposalSection />
              </div>

              {/* MASSIVE Dedicated Game Section */}
              <div className="w-full relative z-10 pt-24 pb-40 flex flex-col items-center bg-gradient-to-b from-transparent via-[#130f1c] to-transparent">
                <div className="text-center max-w-4xl px-4 mb-16">
                  <div className="inline-block p-6 bg-rose-500/10 rounded-full mb-8 backdrop-blur-md border border-rose-500/20 shadow-[0_0_30px_rgba(225,29,72,0.1)]">
                     <ShieldAlert className="w-16 h-16 text-rose-400 animate-pulse" />
                  </div>
                  <h2 className="text-6xl md:text-8xl text-rose-200 mb-8 drop-shadow-lg font-bold" style={{ fontFamily: "'Caveat', cursive" }}>The Long Drive Scare</h2>
                  <p className="text-indigo-200/90 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
                    Remember when we were outside of VET Ground? Let's see if you can sneak a kiss without getting caught by the cops this time! 😂
                  </p>
                </div>
                
                <button 
                  onClick={() => setShowGame(true)}
                  className="bg-rose-600 text-white px-16 py-8 rounded-full font-black text-2xl md:text-4xl hover:bg-rose-500 transition-all shadow-[0_0_60px_rgba(225,29,72,0.6)] hover:shadow-[0_0_80px_rgba(225,29,72,0.8)] flex items-center gap-6 transform hover:scale-105 active:scale-95 border-4 md:border-[6px] border-rose-400/30 group"
                >
                  <Car className="w-12 h-12 md:w-14 md:h-14 fill-current group-hover:animate-bounce-slight" />
                  PLAY MINI-GAME
                </button>
              </div>
            </div>
          </div>

          {/* Gift Section (Fades from deep theater stone into rich red Zomato theme) */}
          <section className="py-40 bg-gradient-to-b from-[#0B0B1A] to-rose-950 text-white text-center px-4 relative overflow-hidden z-10">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none mix-blend-overlay">
              <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-red-800 rounded-full blur-[120px] opacity-40" />
              <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-red-800 rounded-full blur-[120px] opacity-40" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
              <div className="inline-block p-6 bg-white/10 rounded-full mb-10 backdrop-blur-md border border-white/20 shadow-xl">
                <Gift className="w-14 h-14 text-rose-300 animate-bounce" />
              </div>
              <h2 className="text-6xl md:text-8xl font-bold mb-8 text-white drop-shadow-md" style={{ fontFamily: "'Caveat', cursive" }}>
                A Little Birthday Treat!
              </h2>
              <p className="text-2xl text-rose-200/90 mb-20 leading-relaxed font-medium max-w-2xl mx-auto">
                I wish I could be there to celebrate with you! But since I can't, here is something to make your day special.
              </p>

              {!giftRevealed ? (
                <button 
                  onClick={revealGift}
                  className="bg-white text-rose-950 px-12 py-6 rounded-full font-black text-2xl hover:bg-rose-50 transition-all shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:shadow-[0_0_70px_rgba(255,255,255,0.5)] flex items-center justify-center gap-4 mx-auto transform hover:scale-110 active:scale-95"
                >
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                  Reveal Your Gift!
                </button>
              ) : (
                <div className="animate-[scale-in_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
                  <div className="bg-gradient-to-br from-red-600 to-red-800 p-2 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-w-lg mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer">
                    <div className="bg-white text-stone-800 p-12 rounded-[2rem] border-4 border-dashed border-red-200/50 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-red-600 text-white px-8 py-2 rounded-bl-3xl rounded-tr-[1.5rem] font-black text-sm tracking-[0.2em] shadow-md">
                        ZOMATO
                      </div>
                      <img 
                        src="/images/zomato.jpg" 
                        alt="Zomato" 
                        className="h-10 mx-auto mb-10 object-contain drop-shadow-sm"
                      />
                      <h3 className="text-6xl font-black text-stone-900 mb-3 tracking-tighter">₹2,000</h3>
                      <p className="text-stone-500 font-bold text-lg mb-10 uppercase tracking-widest">Voucher to treat your cravings!</p>
                      
                      <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 shadow-inner flex flex-col gap-5">
                        <div>
                          <p className="text-xs text-stone-400 uppercase tracking-[0.2em] mb-2 font-bold">16-Digit Gift Code</p>
                          <div className="bg-white py-3 rounded-xl border border-stone-200 shadow-sm">
                            <p className="text-xl md:text-2xl font-mono font-black text-stone-800 tracking-[0.15em]">6004860020238313</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-stone-400 uppercase tracking-[0.2em] mb-2 font-bold">Gift PIN</p>
                          <div className="bg-white py-2 px-8 rounded-xl border border-stone-200 shadow-sm inline-block">
                            <p className="text-2xl font-mono font-black text-red-600 tracking-[0.25em]">110676</p>
                          </div>
                        </div>
                        
                        <p className="text-xs md:text-sm text-stone-500 mt-2 font-bold">Apply this Code and PIN in your Zomato App</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-20 text-5xl text-rose-300 font-bold drop-shadow-md" style={{ fontFamily: "'Caveat', cursive" }}>
                    I love you so much. Happy Birthday. ❤️
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Slideshow Overlay Modal */}
          {showSlideshow && (
            <JourneySlideshowOverlay 
              events={timelineEvents} 
              onClose={() => setShowSlideshow(false)} 
            />
          )}

          {/* Mini Game Overlay Modal */}
          {showGame && (
            <PoliceEscapeGame onClose={() => setShowGame(false)} />
          )}

          {/* Global utility animations */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fade-in-up {
              0% { opacity: 0; transform: translateY(30px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes scale-in {
              0% { opacity: 0; transform: scale(0.5); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
            .animate-blink { animation: blink 1s step-end infinite; }
            
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
            .animate-float { animation: float 4s ease-in-out infinite; }

            @keyframes confetti-fall {
              0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
            .animate-confetti-fall { animation: confetti-fall linear forwards; }

            @keyframes bounce-in {
              0% { transform: scale(0.8); opacity: 0; }
              60% { transform: scale(1.05); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }
            .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
            
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            @keyframes fade-in {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }
            
            /* Journal Lines for Card Back */
            .journal-lines {
              background-image: repeating-linear-gradient(transparent, transparent 27px, #f43f5e20 28px, #f43f5e20 29px);
              background-attachment: local;
            }
            
            /* Custom Scrollbar for Card Text */
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #fda4af; border-radius: 10px; }

            /* New Mood Animations */
            @keyframes pulse-slow {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.8; transform: scale(0.95); }
            }
            .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }

            @keyframes bounce-slight {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(10px); }
            }
            .animate-bounce-slight { animation: bounce-slight 3s ease-in-out infinite; }

            @keyframes spin-slow {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .animate-spin-slow { animation: spin-slow 12s linear infinite; }

            .animate-float-up {
              animation: float-up-fade 3s ease-in forwards infinite;
            }
            @keyframes float-up-fade {
              0% { transform: translateY(0) scale(0.5); opacity: 0; }
              20% { opacity: 1; }
              80% { opacity: 1; }
              100% { transform: translateY(-60px) scale(1.2); opacity: 0; }
            }

            /* Movie Section Styles */
            @keyframes slide-up-phone {
              0% { transform: translateY(150px) rotate(5deg); opacity: 0; }
              100% { transform: translateY(0) rotate(0deg); opacity: 1; }
            }
            .animate-slide-up-phone { animation: slide-up-phone 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
            
            .text-shadow-glow { text-shadow: 0 0 20px rgba(255,255,255,0.4); }

            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }

            /* Twinkling Stars Animation */
            @keyframes twinkle {
              0%, 100% { opacity: 0.2; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 8px rgba(255,255,255,0.8); }
            }
            .animate-twinkle { animation: twinkle infinite ease-in-out; }

            /* Police Siren Flash Animation */
            @keyframes siren {
              0%, 100% { background-color: rgba(220, 38, 38, 0.15); box-shadow: inset 0 0 100px rgba(220, 38, 38, 0.4); border-color: #dc2626; }
              50% { background-color: rgba(37, 99, 235, 0.15); box-shadow: inset 0 0 100px rgba(37, 99, 235, 0.4); border-color: #2563eb; }
            }
            .animate-siren { animation: siren 0.4s infinite; }
          `}} />
        </div>
      )}
    </>
  );
}