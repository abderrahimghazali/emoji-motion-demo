"use client";
import React, { useState, useEffect } from 'react';
// @ts-ignore
import EmojiMotion from "emoji-motion";
import { emojis } from './constants';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';

const INITIAL_LOAD = 10;
const LOAD_MORE = 10;
const LOAD_MORE_THRESHOLD = 200;

interface EmojiGridProps {
  prompt?: string;
}
interface Emoji {
  key: string;
  value: string;
  description: string;
}
export function EmojiGrid({ prompt }: EmojiGridProps) {
  const [filteredEmojis, setFilteredEmojis] = useState<Emoji[]>([]);
const [visibleEmojis, setVisibleEmojis] = useState<Emoji[]>([]);
  const [loadIndex, setLoadIndex] = useState(1);

  useEffect(() => {
    const filtered = prompt
      ? emojis.filter(emoji =>
          emoji.description?.toLowerCase().includes(prompt.toLowerCase())
        )
      : emojis;
    setFilteredEmojis(filtered);
    setVisibleEmojis(filtered.slice(0, INITIAL_LOAD));
    setLoadIndex(1);
  }, [prompt]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - LOAD_MORE_THRESHOLD &&
      visibleEmojis.length < filteredEmojis.length
    ) {
      loadMoreEmojis();
    }
  };

  const loadMoreEmojis = () => {
    const nextLoadIndex = loadIndex + 1;
    const nextEmojis = filteredEmojis.slice(0, INITIAL_LOAD + LOAD_MORE * nextLoadIndex);
    setVisibleEmojis(nextEmojis);
    setLoadIndex(nextLoadIndex);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadIndex, filteredEmojis]); 

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-stretch w-full group-hover:opacity-100">
          {visibleEmojis.map((emoji, index) => (
            <Dialog key={index}>
              <DialogTrigger><EmojiMotion emoji={emoji.value} variant="hover"/></DialogTrigger>
              <DialogContent className=''>
                <DialogHeader>
                  <DialogDescription>
                    <EmojiMotion emoji={emoji.value} />
                    <Button onClick={() => navigator.clipboard.writeText(`<EmojiMotion emoji={${emoji.value}} variant="hover"/>`)}>Copy to clipboard</Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
      </div>
    </div>
  );
}