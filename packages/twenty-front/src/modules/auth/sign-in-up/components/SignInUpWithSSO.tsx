import { IconGoogle, IconLock, MainButton } from 'twenty-ui';
import {
  SignInUpStep,
  signInUpStepState,
} from '@/auth/states/signInUpStepState';
import { HorizontalSeparator } from '@/auth/sign-in-up/components/HorizontalSeparator';
import { useTheme } from '@emotion/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useSSO } from '@/auth/sign-in-up/hooks/useSSO';
import { authProvidersState } from '@/client-config/states/authProvidersState';

export const SignInUpWithSSO = () => {
  const theme = useTheme();
  const setSignInUpStep = useSetRecoilState(signInUpStepState);
  const authProviders = useRecoilValue(authProvidersState);

  const signInUpStep = useRecoilValue(signInUpStepState);

  const { redirectToSSOLoginPage } = useSSO();

  const signInWithSSO = () => {
    if (authProviders.sso.length === 1) {
      return redirectToSSOLoginPage(authProviders.sso[0].id);
    }

    setSignInUpStep(SignInUpStep.SSOIdentityProviderSelection);
  };

  return (
    <>
      <MainButton
        Icon={() => <IconLock size={theme.icon.size.lg} />}
        title="Single sign-on (SSO)"
        onClick={signInWithSSO}
        variant={signInUpStep === SignInUpStep.Init ? undefined : 'secondary'}
        fullWidth
      />
      <HorizontalSeparator visible={false} />
    </>
  );
};
