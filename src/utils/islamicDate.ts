export function getIslamicDate(): string {
  const date = new Date();
  const options = {
    calendar: 'islamic',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  } as Intl.DateTimeFormatOptions;

  return new Intl.DateTimeFormat('en-US-u-ca-islamic', options).format(date);
}