export interface loginPayload{
    name: string;
    email: string;
}

export interface registerPayload {
    name: string;
    email: string;
    password: string;
}
  
export interface user {
    id: string;
    name: string;
    email: string;
    password: string;
}