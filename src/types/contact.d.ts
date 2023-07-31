export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  tags: Record<ContactTag, boolean>;
  photoURL: string;
}

export type ContactTag = "family" | "friends" | "work" | "other";
