import React from 'react';
import { FaCog } from 'react-icons/fa';
import { Button } from 'src/components/Button';
import { ScrollArea } from 'src/components/layout/ScrollArea';
import Modal from 'src/components/Modal/Modal';
import { useOpenState } from 'src/hooks/useOpenState';
import { useActiveCoin } from 'src/rdx/localSettings/localSettings.hooks';
import { useReduxState } from 'src/rdx/useReduxState';
import styled from 'styled-components';
import { NotificationSettings } from './NotificationSettings';
import { PayoutSettings } from './PayoutSettings';

const Split = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Nav = styled.div`
  width: 200px;
  flex-grow: 0;
  flex-shrink: 0;
  border-right: 1px solid var(--border-color);
  padding: 0.5rem;
  @media screen and (max-width: 768px) {
    display: flex;
    padding: 1rem 1.25rem;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    width: 100%;
  }
`;

const NavItem = styled(Button)`
  width: 100%;
  border: none;
  @media screen and (max-width: 768px) {
    width: auto;
  }
`;

const PageWrapper = styled(ScrollArea)`
  padding: 1rem 1.25rem;
  flex-grow: 1;
  @media screen and (max-width: 768px) {
    height: 1px;
  }
  & > * {
    width: 100%;
  }
`;

const navItems = [
  {
    val: 'payouts',
    title: 'Payouts',
  },
  {
    val: 'notifications',
    title: 'Notifications',
  },
];

const pageComponents = {
  payouts: PayoutSettings,
  notifications: NotificationSettings,
};

type SettingsPageKey = keyof typeof pageComponents;

const SettingsBtn = styled(Button)`
  span {
    margin-left: 0.5rem;
  }
  @media screen and (max-width: 768px) {
    width: 42px;
    padding: 0;
    justify-content: center;
    span {
      display: none;
    }
  }
`;

export const MinerSettingsModal = () => {
  const openState = useOpenState();
  const [page, setPage] = React.useState<SettingsPageKey>('payouts');

  const activeCoin = useActiveCoin();
  const minerSettings = useReduxState('minerDetails');
  const minerHeaderStats = useReduxState('minerHeaderStats');

  // disable opening when data is not loaded
  const disabled = !activeCoin || !minerSettings.data || !minerHeaderStats.data;

  const handleChangePage = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setPage((e.target as HTMLButtonElement).value as SettingsPageKey);
    },
    []
  );

  const PageComponent = pageComponents[page];

  return (
    <>
      <SettingsBtn
        disabled={disabled}
        onClick={openState.handleOpen}
        size="sm"
        variant="primary"
      >
        <FaCog /> <span>Settings</span>
      </SettingsBtn>
      <Modal mobileFull {...openState.modalProps}>
        <Modal.Header>
          <h2>Settings</h2>
        </Modal.Header>
        <Split>
          <Nav>
            {navItems.map((item) => (
              <NavItem
                key={item.val}
                onClick={handleChangePage}
                value={item.val}
                size="sm"
                variant={item.val === page ? 'primary' : undefined}
              >
                {item.title}
              </NavItem>
            ))}
          </Nav>
          <PageWrapper>
            <PageComponent />
          </PageWrapper>
        </Split>
      </Modal>
    </>
  );
};
