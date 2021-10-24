export function getPostPath(date: string, fileName: string): string {
  return `/${date}/${fileName}`;
}

export interface DateJson {
  year: number;
  month: number;
  day: number;
}

/**
 * YYYY/MM/DD
 */
export function getDateJson(dateString: string): DateJson {
  const dateArray: string[] = dateString.split('/');
  return {
    year: Number(dateArray[0]),
    month: Number(dateArray[1]),
    day: Number(dateArray[2]),
  };
}
