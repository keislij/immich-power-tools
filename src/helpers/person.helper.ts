import { PERSON_THUBNAIL_PATH } from "@/config/routes"
import { IPerson } from "@/types/person"
import { parseDate } from "./date.helper"

interface IAPIPerson extends Omit<IPerson, 'birthDate' | 'updatedAt' | 'name'> {
  name: string | null;
  updatedAt: string;
  birthDate: string | null;
}

export const normalizePersonName = (name: string | null | undefined) => {
  if (typeof name !== "string") return "";
  return name.trim();
}

export const getPersonDisplayName = (
  person: { name: string | null | undefined } | null | undefined,
  fallback = "Unknown"
) => {
  const name = normalizePersonName(person?.name);
  return name.length > 0 ? name : fallback;
}

export const cleanUpPerson = (person: IAPIPerson, skipMock?: boolean): IPerson => {
  return {
    ...person,
    name: normalizePersonName(person.name),
    thumbnailPath: PERSON_THUBNAIL_PATH(person.id),
    birthDate: person.birthDate ? new Date(person.birthDate) : null,
    updatedAt: new Date(person.updatedAt),
  }
}
