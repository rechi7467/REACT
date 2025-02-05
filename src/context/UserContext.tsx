import  { createContext, Dispatch } from 'react';

export type User = {
    id:number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

export type Action = {
    type: 'CREATE' | 'UPDATE_USER'
    data: Partial<User>
}

export const initialUserState: User = {
        id:0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phone: '',
    };

export const UserReducer = (state: User, action: Action): User => {
    switch (action.type) {
        case 'CREATE':
            return { ...state, ...action.data };
        case 'UPDATE_USER':
            return { ...state, ...action.data };
        default:
            return state;
    }
};

export const UserContext = createContext<[User, Dispatch<Action>]>([initialUserState, () => { }])

