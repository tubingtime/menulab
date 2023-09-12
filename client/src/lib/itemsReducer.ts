export type ItemAction = AddOrChangeOrDeleteItem | SetItem;

interface AddOrChangeOrDeleteItem {
    type: 'added' | 'changed' | 'deleted'
    item: Item
}

interface SetItem {
    type: 'set'
    items: Item[]
}

export interface Item {
    item_id: number
    name: string
    price: number
    description: string
    photo_reference: string
}



export default function itemsReducer(items: Item[], action: ItemAction) {
    switch (action.type) {
        case 'set': {
            return action.items;
        }
        case 'added': {
            return [action.item, ...items];
        }
        case 'changed': {
            return items.map((item) => {
                if (item.item_id === action.item?.item_id) {
                    return action.item;
                } else {
                    return item;
                }
            });
        }
        case 'deleted': {
            return items.filter((item) => item.item_id !== action.item?.item_id);
        }
        default: {
            throw Error('Unknown action: ' + JSON.stringify(action));
        }
    }
}