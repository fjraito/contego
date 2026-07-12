"use client";

import { useEffect, useRef, useState } from "react";

/* Five creator clips on a 3D ring. Rotation is driven by requestAnimationFrame
   (not CSS) so it always runs and can be paused precisely on hover. Hovering a
   clip pauses the ring and "plays" that clip (video autoplays if `src` is set,
   otherwise an animated placeholder). Leaving resumes the spin.
   Drop real files in /public/reel and set `src` to use real video. */
type Clip = { tint: string; caption: string; time: string; src?: string };

const CLIPS: Clip[] = [
  { tint: "150,80%", caption: "this actually works", time: "0:14" },
  { tint: "165,70%", caption: "3 days in, honest review", time: "0:22" },
  { tint: "140,75%", caption: "wait for the end", time: "0:11" },
  { tint: "158,72%", caption: "I was not expecting this", time: "0:18" },
  { tint: "148,78%", caption: "adding to cart now", time: "0:16" },
];

const RADIUS = 300;
const SPEED = 6; // degrees per second (~60s per full turn)

function Scene({ clip, playing }: { clip: Clip; playing: boolean }) {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(65% 42% at 28% 20%, hsla(${clip.tint},58%,.34), transparent 55%), radial-gradient(85% 60% at 80% 90%, rgba(44,122,77,.5), transparent 60%), linear-gradient(160deg,#12211a,#080c0a)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(115deg,transparent 42%,rgba(244,241,234,.12) 50%,transparent 58%)",
        }}
      />
      {/* play badge — hidden while playing */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: playing ? 0 : 1 }}
      >
        <span className="w-14 h-14 rounded-full bg-[#5AE48E] flex items-center justify-center shadow-[0_8px_30px_-6px_rgba(90,228,142,.7)]">
          <svg width="20" height="24" viewBox="0 0 10 12">
            <path d="M0 0l10 6-10 6z" fill="#07130c" />
          </svg>
        </span>
      </div>
      {/* audio waveform */}
      <div className="absolute left-0 right-0 bottom-[74px] flex justify-center gap-[3px] h-6 items-center px-6">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="reel-wave w-[3px] rounded-full bg-[#5AE48E]"
            style={{
              animationDelay: `${(i % 5) * 0.11}s`,
              animationDuration: playing ? "0.5s" : "1.2s",
              opacity: 0.4 + ((i * 7) % 6) / 12,
            }}
          />
        ))}
      </div>
      {/* scan sweep while playing */}
      {playing && (
        <div
          className="absolute inset-x-0 h-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg,transparent,rgba(90,228,142,.28),transparent)",
            animation: "reelscan 2s linear infinite",
          }}
        />
      )}
      <div className="absolute left-3 right-3 bottom-9 rounded-[7px] bg-black/55 backdrop-blur-sm px-2.5 py-2">
        <div className="font-mono text-[11px] text-[#eef2ee] leading-tight">
          {clip.caption}
        </div>
      </div>
      <div className="absolute left-3 right-3 bottom-4 flex items-center gap-2">
        <div className="h-[3px] flex-1 rounded-full bg-[#F4F1EA]/25 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#5AE48E] transition-[width] ease-linear"
            style={{
              width: playing ? "100%" : "34%",
              transitionDuration: playing ? "4s" : "0.4s",
            }}
          />
        </div>
        <span className="font-mono text-[9px] text-[#dfe4df]">{clip.time}</span>
      </div>
    </div>
  );
}

export default function HeroReel() {
  const ringRef = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const paused = useRef(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [s, setS] = useState(1); // responsive scale so the 3D spread fits
  const step = 360 / CLIPS.length;
  const radius = RADIUS * s;

  useEffect(() => {
    const fit = () => {
      const w = window.innerWidth;
      setS(w < 420 ? 0.5 : w < 560 ? 0.62 : w < 720 ? 0.78 : w < 900 ? 0.9 : 1);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    let raf = 0;
    let last: number | null = null;
    const loop = (t: number) => {
      if (last === null) last = t;
      const dt = (t - last) / 1000;
      last = t;
      if (!paused.current) {
        angle.current = (angle.current + SPEED * dt) % 360;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${angle.current}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const enter = (i: number) => {
    paused.current = true;
    setHovered(i);
    const v = videoRefs.current[i];
    if (v) v.play().catch(() => {});
  };
  const leave = (i: number) => {
    paused.current = false;
    setHovered((h) => (h === i ? null : h));
    const v = videoRefs.current[i];
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <div id="work" className="relative mx-auto mt-[64px] flex justify-center">
      <div
        className="absolute -inset-24 pointer-events-none blur-[55px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(90,228,142,.20), transparent 62%)",
        }}
      />
      <div className="reel-viewport relative">
        <div
          className="reel-stage relative"
          style={{ width: 220 * s, height: 391 * s, perspective: `${1300 * s}px` }}
        >
          <div ref={ringRef} className="reel-ring">
            {CLIPS.map((clip, i) => (
              <div
                key={i}
                className="reel-card cursor-pointer"
                style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}
                onMouseEnter={() => enter(i)}
                onMouseLeave={() => leave(i)}
              >
                <div
                  className="relative w-full h-full rounded-[22px] overflow-hidden border bg-[#0b0e0d] shadow-[0_30px_70px_-24px_rgba(0,0,0,.85)] transition-transform duration-300"
                  style={{
                    borderColor:
                      hovered === i
                        ? "rgba(90,228,142,.8)"
                        : "rgba(90,228,142,.3)",
                    transform: hovered === i ? "scale(1.06)" : "scale(1)",
                  }}
                >
                  {clip.src ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      className="absolute inset-0 w-full h-full object-cover"
                      src={clip.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <Scene clip={clip} playing={hovered === i} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
