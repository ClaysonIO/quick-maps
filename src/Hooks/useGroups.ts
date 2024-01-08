export interface IGroup {
    _id: string;
    name: string;
    className: string;
}

export function useGroups() {
    const groups: IGroup[] = [
        {_id: 'A', name: 'Group A', className: 'group-A'},
        {_id: 'B', name: 'Group B', className: 'group-B'},
        {_id: 'C', name: 'Group C', className: 'group-C'},
        {_id: 'D', name: 'Group D', className: 'group-D'},
        {_id: 'E', name: 'Group E', className: 'group-E'},
        {_id: 'F', name: 'Group F', className: 'group-F'},
        {_id: 'G', name: 'Group G', className: 'group-G'},
        {_id: 'H', name: 'Group H', className: 'group-H'},
        {_id: 'I', name: 'Group I', className: 'group-I'},
        {_id: 'J', name: 'Group J', className: 'group-J'},
        {_id: 'K', name: 'Group K', className: 'group-K'},
        {_id: 'L', name: 'Group L', className: 'group-L'},
        {_id: 'M', name: 'Group M', className: 'group-M'},
        {_id: 'N', name: 'Group N', className: 'group-N'},
        {_id: 'O', name: 'Group O', className: 'group-O'},
        {_id: 'P', name: 'Group P', className: 'group-P'},
        {_id: 'Q', name: 'Group Q', className: 'group-Q'},
        {_id: 'R', name: 'Group R', className: 'group-R'},
        {_id: 'S', name: 'Group S', className: 'group-S'},
        {_id: 'T', name: 'Group T', className: 'group-T'},
        {_id: 'U', name: 'Group U', className: 'group-U'},
        {_id: 'V', name: 'Group V', className: 'group-V'},
        {_id: 'W', name: 'Group W', className: 'group-W'},
        {_id: 'X', name: 'Group X', className: 'group-X'},
        {_id: 'Y', name: 'Group Y', className: 'group-Y'},
        {_id: 'Z', name: 'Group Z', className: 'group-Z'},
    ]
    return {groups}
}