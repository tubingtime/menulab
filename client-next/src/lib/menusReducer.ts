export type MenuAction = AddOrChangeOrDeleteMenu | SetMenus;

interface AddOrChangeOrDeleteMenu {
    type: 'added' | 'changed' | 'deleted'
    menu: Menu
}

interface SetMenus {
    type: 'set'
    menus: Menu[]
}

export interface Menu {
    menu_id: number
    name: string
}


export default function menusReducer(menus: Menu[], action: MenuAction): Menu[] {
    switch (action.type) {
        case 'set': {
            return action.menus;
        }
        case 'added': {
            return [action.menu, ...menus];
            ;
        }
        case 'changed': {
            return menus.map((menu) => {
                if (menu.menu_id === action.menu?.menu_id) {
                    return action.menu;
                } else {
                    return menu;
                }
            });
        }
        case 'deleted': {
            return menus.filter((menu) => menu.menu_id !== action.menu?.menu_id);
        }
        default: {
            throw Error('Unknown action: ' + JSON.stringify(action));
        }
    }
}
