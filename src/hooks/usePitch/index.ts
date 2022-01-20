import autoCorrelate from '@/utils/correlation';
import { useCallback } from 'react';

import notesFile from '@/assets/notes.json';

export interface Note {
  name: string,
  frequency: number
}

export interface NoteResult {
  /** A object contain name and frequency note */
  note: Note,
  /** Informe if is in range of assets/notes.json */
  range: {
    /** true if is out of range */
    out: boolean,
    /** -1 below, 0 between and 1 above */
    at: -1 | 0 | 1
  };
  /** proximity accuracy */
  accuracy: number;
}

function usePitch() {
  const detect = useCallback((buffer: Float32Array, sampleRate: number) => {
    const hertz = autoCorrelate(buffer, sampleRate);
    return hertz;
  }, []);

  const getNote = useCallback((hertz: number): NoteResult => {
    const notes: Array<Note> = notesFile;
    let currentNoteIndex = -1;

    for (let i = 0; i < notes.length; i += 1) {
      const currentFrequency: number = notes[i].frequency;

      if (hertz <= currentFrequency) {
        currentNoteIndex = i;
        break;
      }
    }

    if (currentNoteIndex === 0) {
      return {
        note: notes[0],
        range: {
          out: true,
          at: -1,
        },
        accuracy: Math.abs(notes[0].frequency - hertz),
      };
    }

    if (currentNoteIndex === -1) {
      return {
        note: notes[notes.length - 1],
        range: {
          out: true,
          at: 1,
        },
        accuracy: Math.abs(notes[notes.length - 1].frequency - hertz),
      };
    }

    const prevNote = notes[currentNoteIndex - 1];
    const nextNote = notes[currentNoteIndex];

    const prevDelta = Math.abs(prevNote.frequency - hertz);
    const nextDelta = Math.abs(nextNote.frequency - hertz);

    return {
      note: (prevDelta < nextDelta) ? prevNote : nextNote,
      range: {
        out: false,
        at: 0,
      },
      accuracy: (prevDelta < nextDelta) ? prevDelta : nextDelta,
    };
  }, []);

  return {
    detect,
    getNote,
  };
}

export default usePitch;
