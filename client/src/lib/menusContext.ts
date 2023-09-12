import { createContext, Dispatch } from 'react'
import { Menu, MenuAction } from './menusReducer';

export const MenusContext = createContext<Menu[]>([]);
export const MenusDispatchContext = createContext<Dispatch<MenuAction>>((_) => null);
