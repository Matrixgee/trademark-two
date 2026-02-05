import { jwtDecode } from "jwt-decode";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=])[A-Za-z\d@$!%*?&#^()_+=]{8,}$/;

export const validateEmail = (email: string) => emailRegex.test(email);

export const validatePassword = (password: string) =>
  passwordRegex.test(password);

interface DecodedToken {
  exp: number;
}

export const isTokenExpired = (token: string) => {
  try {
    const { exp } = jwtDecode<DecodedToken>(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};
