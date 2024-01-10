import LottieView from 'lottie-react-native';
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
  else return moment(dueDate).format('MMM Do, h:mm A');
};

export const getGreeting = () => {
  const currentTime = moment(); // Get the current time

  const currentHour = currentTime.hour();

  if (currentHour >= 6 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Good Afternoon';
  } else if (currentHour >= 18 && currentHour < 24) {
    return 'Good Evening';
  } else {
    return 'Good Might';
  }
};

export default function RefreshAnimation({style, name = 'refreshAnimation2'}) {
  return (
    <>
      {name === 'loadingAnimation' ? (
        <LottieView
          source={require(`../../assets/animations/refreshAnimation.json`)}
          autoPlay
          loop
          style={style}
          resizeMode="cover"
        />
      ) : (
        <LottieView
          source={require(`../../assets/animations/refreshAnimation2.json`)}
          autoPlay
          loop
          style={style}
          resizeMode="cover"
        />
      )}
    </>
  );
}
