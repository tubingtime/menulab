import { createContext, Dispatch } from 'react'
import { Section, SectionAction } from './sectionsReducer';

export const SectionsContext = createContext<Section[]>([]);
export const SectionsDispatchContext = createContext<Dispatch<SectionAction>>((_) => null);
