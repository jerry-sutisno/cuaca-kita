import { FC } from 'react';
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  CloudSnow,
  HelpCircle,
} from 'lucide-react';
import type { WeatherIconGroup } from '../../lib/weatherCodes';

interface WeatherIconProps {
  iconGroup: WeatherIconGroup;
  isDay?: boolean;
  className?: string;
  size?: number;
}

export const WeatherIcon: FC<WeatherIconProps> = ({
  iconGroup,
  isDay = true,
  className = 'w-6 h-6',
  size,
}) => {
  switch (iconGroup) {
    case 'clear':
      return isDay ? (
        <Sun
          size={size}
          className={`text-amber-500 fill-amber-400/20 ${className}`}
          aria-hidden="true"
        />
      ) : (
        <Moon
          size={size}
          className={`text-indigo-400 fill-indigo-400/20 ${className}`}
          aria-hidden="true"
        />
      );

    case 'partly-cloudy':
      return isDay ? (
        <CloudSun
          size={size}
          className={`text-amber-500 ${className}`}
          aria-hidden="true"
        />
      ) : (
        <CloudMoon
          size={size}
          className={`text-indigo-400 ${className}`}
          aria-hidden="true"
        />
      );

    case 'cloudy':
      return (
        <Cloud
          size={size}
          className={`text-slate-400 fill-slate-300/30 ${className}`}
          aria-hidden="true"
        />
      );

    case 'fog':
      return (
        <CloudFog
          size={size}
          className={`text-slate-400 ${className}`}
          aria-hidden="true"
        />
      );

    case 'drizzle':
      return (
        <CloudDrizzle
          size={size}
          className={`text-sky-500 ${className}`}
          aria-hidden="true"
        />
      );

    case 'rain':
      return (
        <CloudRain
          size={size}
          className={`text-sky-600 ${className}`}
          aria-hidden="true"
        />
      );

    case 'rain-heavy':
      return (
        <CloudRain
          size={size}
          className={`text-blue-700 stroke-[2.5] ${className}`}
          aria-hidden="true"
        />
      );

    case 'snow':
      return (
        <CloudSnow
          size={size}
          className={`text-sky-300 ${className}`}
          aria-hidden="true"
        />
      );

    case 'thunderstorm':
      return (
        <CloudLightning
          size={size}
          className={`text-amber-600 fill-amber-400/30 ${className}`}
          aria-hidden="true"
        />
      );

    default:
      return (
        <HelpCircle
          size={size}
          className={`text-slate-400 ${className}`}
          aria-hidden="true"
        />
      );
  }
};
