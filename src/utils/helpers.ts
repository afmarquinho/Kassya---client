export const formattedDate = (date: Date) => {
  return new Date(`${date}T00:00:00.000Z`);
};

export function desformatearFecha(isoDate: Date): string {
  const date = new Date(isoDate);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

