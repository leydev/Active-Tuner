import autoCorrelate from '@/utils/correlation';
import { useCallback } from 'react';

import notesFile from '@/assets/notes.json';

export interface Note {
  name: string,
  frequency: number
}

interface PairNotes {
  first: Note,
  second: Note
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
    let pairNotes: PairNotes;

    notes.forEach((note, index) => {
      const currentFrequency: number = note.frequency;
      const nextIndex: number = index + 1;
      let nextFrequency: number;

      if ((nextIndex) <= (notes.length - 1)) nextFrequency = notes[nextIndex].frequency;

      if (hertz >= currentFrequency && hertz <= nextFrequency) {
        pairNotes = {
          first: note,
          second: notes[nextIndex],
        };
      }
    });

    if (pairNotes) {
      const { first, second } = pairNotes;
      const A = first.frequency;
      const B = second.frequency;
      const X = hertz;

      const AY = Math.abs(A - X);
      const BY = Math.abs(B - X);

      return {
        note: (AY < BY) ? first : second,
        range: {
          out: false,
          at: 0,
        },
        accuracy: (AY < BY) ? AY : BY,
      };
    }

    const A = notes[0];
    const B = notes[notes.length - 1];
    const X = hertz;

    const AY = Math.abs(A.frequency - X);
    const BY = Math.abs(B.frequency - X);

    return {
      note: (hertz < A.frequency) ? A : B,
      range: {
        out: true,
        at: (hertz < A.frequency) ? -1 : 1,
      },
      accuracy: (AY < BY) ? AY : BY,
    };
  }, []);

  return {
    detect,
    getNote,
  };
}

export default usePitch;
