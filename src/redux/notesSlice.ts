// store/notesSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { NotesState,Note,UpdateNotePayload } from "../interfaces/types";

const initialState: NotesState = {
  notes: [],
  deletedNotes: []
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: {
      reducer: (state, action: PayloadAction<Note>) => {
        state.notes.push(action.payload);
      },
      prepare: (title: string, content: string, isPinned: boolean) => ({
        payload: {
          uid: uuidv4(),
          title,
          content,
          reminder: "",
          imageUrl: "",
          isPinned,
          isArchived: false,
          color: "transparent"
        },
      }),
    },
    updateNote: (state, action: PayloadAction<UpdateNotePayload>) => {
      const index = state.notes.findIndex(
        (note) => note.uid === action.payload.uid
      );
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], ...action.payload };
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const noteIndex = state.notes.findIndex(
        (note) => note.uid === action.payload
      );
      if (noteIndex !== -1) {
        const [deletedNote] = state.notes.splice(noteIndex, 1);
        state.deletedNotes.push(deletedNote);
      }
    },
  },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
