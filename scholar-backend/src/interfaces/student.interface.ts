export interface StudentInterface {
    lastname: string;
    firstname: string;
    email: string;
    sexe: "M" | "F";
    age: number;
}

enum Sexe {
    "M",
    "F"
}