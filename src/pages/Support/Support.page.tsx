import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaDiscord, FaTelegram } from 'react-icons/fa';

import { Content } from 'src/components/layout/Content';
import { Divider } from 'src/components/layout/Divider';
import { HeroBlue } from 'src/components/layout/Hero/HeroBlue';
import { Page } from 'src/components/layout/Page';
import { DISCORD_LINK, TELEGRAM_LINK } from 'src/constants';
import styled from 'styled-components/macro';

const SupportChannelWrapper = styled.a`
  border: 1px solid var(--border-color);
  padding: 1rem 1.5rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  border-radius: 5px;
  svg {
    height: 30px;
    width: 30px;
    margin-right: 0.5rem;
  }
  & + & {
    margin-left: 1rem;
  }
`;

const SupportChannel: React.FC<{
  name: string;
  icon: React.ReactNode;
  href: string;
}> = ({ name, icon, href }) => {
  return (
    <SupportChannelWrapper
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      {icon}
      <div className="name">{name}</div>
    </SupportChannelWrapper>
  );
};

export const SupportPage = () => {
  return (
    <Page>
      <Helmet>
        <title>Support</title>
      </Helmet>
      <HeroBlue>
        <Content md>
          <h1>Support</h1>
        </Content>
      </HeroBlue>
      <Content md paddingLg>
        <h2>Contact Flexpool Support</h2>
        <p>
          Hi! Before you reach out, we would like to warn you that we do not
          provide assistance on hardware-related topics. This includes
          overclocking GPUs and further advanced configuration of the mining
          software. We provide only pool-related support. If you want to get
          help on overclocking GPUs, optimizing mining software, etc., you can
          join our community and talk with people who want share their
          experience.
        </p>
        <Divider margin />
        <h2>Reach us via the Website Messenger</h2>
        <p>
          The best way to reach us to get assistance is to use the built-in
          website messenger. You can find it in the bottom-right corner.
        </p>
        <Divider margin />
        <h2>Join our Community</h2>
        <p>
          We also provide an official Discord Server and a Telegram Group, so
          you can talk with other Flexpool miners, and get assistance from our
          team there as well.
        </p>
        <div className="support-channels">
          <SupportChannel
            name={'Discord'}
            icon={<FaDiscord />}
            href={DISCORD_LINK}
          />
          <SupportChannel
            name={'Telegram'}
            icon={<FaTelegram />}
            href={TELEGRAM_LINK}
          />
        </div>
        <Divider margin />
        <h2>Reach us via Email</h2>
        <p>
          We provide Email support, but we do not guarantee fast response time
          via this support channel. We are available at{' '}
          <a href="mailto:support@flexpool.io">support@flexpool.io</a>.
        </p>
        <Divider margin />
        <h2>Other questions</h2>
        <p>
          For business-related questions, please, contact us at{' '}
          <a href="mailto:hq@flexpool.io">hq@flexpool.io</a>. Please, note that
          we do not provide support via this Email.
        </p>
      </Content>
    </Page>
  );
};

export default SupportPage;
