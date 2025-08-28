type TelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

export const getUserDisplayName = (user: TelegramUser | null | undefined) => {
  if (!user) return "User";

  const firstName = user.first_name?.trim();
  const lastName = user.last_name?.trim();
  const username = user.username?.trim();

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  if (firstName) {
    return firstName;
  }

  if (lastName) {
    return lastName;
  }

  if (username) {
    return username;
  }

  return "User";
};
