import { hashSync, compareSync } from 'bcryptjs';

export const generateHash = (plainText: string, salt: number): string => {
    return hashSync(plainText, salt);
};

export const compareHash = (plainText: string, hashValue: string): boolean => {
    return compareSync(plainText, hashValue);
};