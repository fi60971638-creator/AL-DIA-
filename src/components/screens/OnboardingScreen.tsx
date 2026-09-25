import React from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { UserProfile } from '../../types';

interface OnboardingScreenProps {
  onStart: () => void;
  onRegisterSuccess?: (user: UserProfile) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onStart, onRegisterSuccess }) => {
  return (
    <WelcomeScreen
      onStart={onStart}
      onRegisterSuccess={(user) => {
        if (onRegisterSuccess) onRegisterSuccess(user);
      }}
    />
  );
};
