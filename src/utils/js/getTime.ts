enum EMonths {
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря'
}

function checkHours(hour: number): string {
  if (hour < 5 && hour > 1) return 'часа';
  if (hour === 1) return 'час';
  return 'часов';
}

export function getDateCreated(time: number): string {
  const currentData = new Date();
  const data = new Date(time * 1000);
  const month = data.getMonth();
  const day = data.getDate();
  const year = data.getFullYear();

  if (currentData.getMonth() === month && currentData.getDate() === day) {
    const difference = currentData.getHours() - data.getHours();
    return `${difference} ${checkHours(difference)} назад`;
  }

  return `${day} ${EMonths[month]} ${year}`;
}
