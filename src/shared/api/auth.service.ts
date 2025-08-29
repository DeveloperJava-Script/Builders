import axiosInstance from './axiosInstance';

export const auth = () => {
  const telegram = window.Telegram.WebApp;
  const response = axiosInstance.post<AuthData>('/auth', {
    hash:
      telegram?.initData ||
      'user=%7B%22id%22%3A352152818%2C%22first_name%22%3A%22Bogdan%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22st2ck%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F61tn3Wdebg3DWXOG2uy8OoJrgaqr0Ry8OnYNbcd34pw.svg%22%7D&chat_instance=5126905326687644604&chat_type=sender&auth_date=1755857868&signature=h0hL3JM-BciWo0nDhe-r8h1bEIcrsWKBS7Ed18zDc8tVY89oUhfsLu942f3BFaNBiRNH_7ZEN9j6LsI-2cIqCA&hash=e72dea638dbf6a5cc711f43cdd4052c87c573c769a48c9d923cb0c843cc60125',
  });
  return response;
};

export const signIn = () => {
  const response = axiosInstance.post<User>('/auth/sign-in');
  return response;
};

export type User = {
  user: {
    created_at: string;
  };
  first_launch: boolean;
  referrals_count: number;
};

export type AuthData = {
  access_token: string;
  refresh_token: string;
  expires: string;
};
