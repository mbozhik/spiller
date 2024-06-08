import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5)
}

export const revalidateOnTime = 30
