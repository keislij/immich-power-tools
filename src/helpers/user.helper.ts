import { ENV } from "@/config/environment"
import { IUser } from "@/types/user"

export const getUserHeaders = (user: {
  isUsingAPIKey?: boolean,
  accessToken?: string
} | null | undefined, otherHeaders?: {
  'Content-Type': string
}) => {
  let headers: {
    'Content-Type': string;
    'x-api-key'?: string;
    'Authorization'?: string
  } = {
    'Content-Type': 'application/json',
  }
  if (user?.isUsingAPIKey && ENV.IMMICH_API_KEY) {
    headers['x-api-key'] = ENV.IMMICH_API_KEY
  } else if (user?.accessToken) {
    headers['Authorization'] = `Bearer ${user.accessToken}`
  }
  
  return {...headers, ...otherHeaders}
}
