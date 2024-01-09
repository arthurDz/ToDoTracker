import moment from 'moment';
import tinycolor from 'tinycolor2';

export const generateLighterShade = color => {
  const baseColor = tinycolor(color);

  const lighterShade = baseColor.saturate(20).lighten(20).toString();

  return lighterShade;
};

export const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Moment utils
export const formatTodoDueDate = dueDate => {
  const momentDueDate = moment(dueDate);

  const momentCurrentDate = moment();

  const isSameDate = momentDueDate.isSame(momentCurrentDate, 'day');

  if (isSameDate) return moment(dueDate).format('h:mm A');
  else return moment(dueDate).format('MMM Do YY, h:mm a');
};
