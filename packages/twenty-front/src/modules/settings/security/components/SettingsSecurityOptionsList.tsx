import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { SettingsOptionCardContentToggle } from '@/settings/components/SettingsOptions/SettingsOptionCardContentToggle';
import { SnackBarVariant } from '@/ui/feedback/snack-bar-manager/components/SnackBar';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  IconLink,
  Card,
  IconGoogle,
  IconMicrosoft,
  IconPassword,
} from 'twenty-ui';
import { useUpdateWorkspaceMutation } from '~/generated/graphql';
import { AuthProviders } from '~/generated-metadata/graphql';
import { capitalize } from '~/utils/string/capitalize';
import { SSOIdentitiesProvidersState } from '@/settings/security/states/SSOIdentitiesProviders.state';
import { isDefined } from '~/utils/isDefined';

const StyledSettingsSecurityOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const SettingsSecurityOptionsList = () => {
  const { enqueueSnackBar } = useSnackBar();
  const SSOIdentitiesProviders = useRecoilValue(SSOIdentitiesProvidersState);

  const [currentWorkspace, setCurrentWorkspace] = useRecoilState(
    currentWorkspaceState,
  );

  const [updateWorkspace] = useUpdateWorkspaceMutation();

  const isValidAuthProvider = (
    key: string,
  ): key is Exclude<keyof typeof currentWorkspace, '__typename'> => {
    if (!currentWorkspace) return false;
    return Reflect.has(currentWorkspace, key);
  };

  const toggleAuthMethod = async (
    authProvider: keyof Omit<AuthProviders, '__typename' | 'magicLink' | 'sso'>,
  ) => {
    if (!currentWorkspace?.id) {
      throw new Error('User is not logged in');
    }

    const key = `is${capitalize(authProvider)}AuthEnabled`;

    if (!isValidAuthProvider(key)) {
      throw new Error('Invalid auth provider');
    }

    const allAuthProvidersEnabled = [
      ...Object.entries(currentWorkspace).filter(
        ([k, v]) => k.startsWith('is') && k.endsWith('AuthEnabled') && v,
      ),
      ...((SSOIdentitiesProviders?.length ?? 0) > 0 ? [{ sso: true }] : []),
    ];

    if (currentWorkspace[key] === true && allAuthProvidersEnabled.length <= 1) {
      return enqueueSnackBar(
        'At least one authentication method must be enabled',
        {
          variant: SnackBarVariant.Error,
        },
      );
    }

    setCurrentWorkspace({
      ...currentWorkspace,
      [key]: !currentWorkspace[key],
    });

    updateWorkspace({
      variables: {
        input: {
          [key]: !currentWorkspace[key],
        },
      },
    }).catch((err) => {
      // rollback optimistic update if err
      setCurrentWorkspace({
        ...currentWorkspace,
        [key]: !currentWorkspace[key],
      });
      enqueueSnackBar(err?.message, {
        variant: SnackBarVariant.Error,
      });
    });
  };

  const handleChange = async (value: boolean) => {
    try {
      if (!currentWorkspace?.id) {
        throw new Error('User is not logged in');
      }
      await updateWorkspace({
        variables: {
          input: {
            isPublicInviteLinkEnabled: value,
          },
        },
      });
      setCurrentWorkspace({
        ...currentWorkspace,
        isPublicInviteLinkEnabled: value,
      });
    } catch (err: any) {
      enqueueSnackBar(err?.message, {
        variant: SnackBarVariant.Error,
      });
    }
  };

  return (
    <StyledSettingsSecurityOptionsList>
      {currentWorkspace && (
        <>
          <Card>
            <SettingsOptionCardContentToggle
              Icon={IconGoogle}
              title="Google"
              description="Allow logins through Google's single sign-on functionality."
              checked={currentWorkspace.isGoogleAuthEnabled}
              advancedMode
              onChange={() => toggleAuthMethod('google')}
            />
            <SettingsOptionCardContentToggle
              Icon={IconMicrosoft}
              title="Microsoft"
              description="Allow logins through Microsoft's single sign-on functionality."
              checked={currentWorkspace.isMicrosoftAuthEnabled}
              advancedMode
              onChange={() => toggleAuthMethod('microsoft')}
            />
            <SettingsOptionCardContentToggle
              Icon={IconPassword}
              title="Password"
              description="Allow users to sign in with an email and password."
              checked={currentWorkspace.isPasswordAuthEnabled}
              advancedMode
              onChange={() => toggleAuthMethod('password')}
            />
          </Card>
          <Card rounded>
            <SettingsOptionCardContentToggle
              Icon={IconLink}
              title="Invite by Link"
              description="Allow the invitation of new users by sharing an invite link."
              checked={currentWorkspace.isPublicInviteLinkEnabled}
              advancedMode
              onChange={() =>
                handleChange(!currentWorkspace.isPublicInviteLinkEnabled)
              }
            />
          </Card>
        </>
      )}
    </StyledSettingsSecurityOptionsList>
  );
};
