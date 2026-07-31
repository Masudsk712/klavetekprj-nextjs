"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
 value: string;
 duration?: number;
 className?: string;
}

function parseValue(value: string) {
 const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
 if (!match) return { prefix: "", target: 0, suffix: value, isNumeric: false };
 const prefix = match[1] || "";
 const target = parseFloat(match[2]);
 const suffix = match[3] || "";
 return { prefix, target, suffix, isNumeric: true };
}

export default function AnimatedCounter({ value, duration = 2, className = "" }: AnimatedCounterProps) {
 const ref = useRef<HTMLSpanElement>(null);
 const [display, setDisplay] = useState(value);

 useEffect(() => {
 const node = ref.current;
 const { prefix, target, suffix, isNumeric } = parseValue(value);
 if (!isNumeric) {
 setDisplay(value);
 return;
 }

 const startTime = performance.now();
 const dur = duration * 1000;
 let raf: number;

 const tick = (now: number) => {
 const elapsed = now - startTime;
 const progress = Math.min(elapsed / dur, 1);
 const eased = 1 - Math.pow(1 - progress, 4);
 const current = target * eased;
 const rounded = Number.isInteger(target) ? Math.round(current) : Math.round(current * 10) / 10;
 setDisplay(`${prefix}${rounded}${suffix}`);
 if (progress < 1) {
 raf = requestAnimationFrame(tick);
 }
 };

 raf = requestAnimationFrame(tick);
 return () => cancelAnimationFrame(raf);
 }, [value, duration]);

 return <span ref={ref} className={className}>{display}</span>;
}
