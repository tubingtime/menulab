export type SectionAction = AddOrChangeOrDeleteSection | SetSection;

interface AddOrChangeOrDeleteSection {
    type: 'added' | 'changed' | 'deleted'
    section: Section
}

interface SetSection {
    type: 'set'
    sections: Section[]
}

export interface Section {
    section_id: number
    name: string
}

const sectionComparator = (a, b) => a.name.localeCompare(b.name);

export default function sectionsReducer(sections: Section[], action: SectionAction): Section[] {
    switch (action.type) {
        case 'set': {
            return action.sections;
        }
        case 'added': {
            return [action.section, ...sections].sort(sectionComparator);
            ;
        }
        case 'changed': {
            return sections.map((section) => {
                if (section.section_id === action.section?.section_id) {
                    return action.section;
                } else {
                    return section;
                }
            });
        }
        case 'deleted': {
            return sections.filter((section) => section.section_id !== action.section?.section_id);
        }
        default: {
            throw Error('Unknown action: ' + JSON.stringify(action));
        }
    }
}
