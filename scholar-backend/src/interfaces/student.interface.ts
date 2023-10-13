export interface StudentInterface {
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    sexe: "M" | "F";
    age: number;
}

export interface LoginInterface {
    email: string;
    password: string;
}