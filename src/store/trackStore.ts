import { useState, useEffect } from 'react';

export type StudyTrack = 'agile' | 'react';

const TRACK_STORAGE_KEY = 'fullstack2a_active_track';

let currentTrack: StudyTrack = 'agile';
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem(TRACK_STORAGE_KEY);
  if (saved === 'react' || saved === 'agile') {
    currentTrack = saved;
  }
}

const listeners = new Set<(track: StudyTrack) => void>();

export function getActiveTrack(): StudyTrack {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(TRACK_STORAGE_KEY);
    if (saved === 'react' || saved === 'agile') {
      return saved;
    }
  }
  return currentTrack;
}

export function setActiveTrack(track: StudyTrack) {
  currentTrack = track;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(TRACK_STORAGE_KEY, track);
    } catch (e) {
      // Ignore storage errors
    }
  }
  listeners.forEach(cb => cb(track));
}

export function useActiveTrack(): [StudyTrack, (track: StudyTrack) => void] {
  const [track, setTrack] = useState<StudyTrack>(getActiveTrack);

  useEffect(() => {
    const cb = (newTrack: StudyTrack) => setTrack(newTrack);
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, []);

  return [track, setActiveTrack];
}
