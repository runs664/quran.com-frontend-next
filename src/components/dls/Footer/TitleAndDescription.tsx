/* eslint-disable i18next/no-literal-string */
import Image from 'next/image';
// import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';

import styles from './Footer.module.scss';
// import FooterThemeSwitcher from './FooterThemeSwitcher';

// import Link, { LinkVariant } from '@/dls/Link/Link';
// import QuranTextLogo from '@/icons/quran-text-logo.svg';
// import { logButtonClick } from '@/utils/eventLogger';

const TitleAndDescription = () => {
  const { t } = useTranslation('common');

  // const onHiringAnnouncementClicked = () => {
  //   logButtonClick('footer_hiring_announcement');
  // };

  return (
    <div className={styles.titleAndDescriptionContainer}>
      <div className={styles.headingContainer}>
        <div className={styles.iconContainer}>
          <Image
            src="/icons/tsirwah-logo.png"
            alt={t('quran-com')}
            width={120}
            height={40}
            quality={100}
          />
        </div>
        {/* <div className={styles.themeContainer}>
          <FooterThemeSwitcher />
        </div> */}
        {/* <div className={styles.title}>Alquran yang Mulia - Alquran Tsirwah</div> */}
      </div>
      {/* <p className={styles.description}>
        Sesungguhnya Allah mengangkat derajat seseorang dengan kitab ini (Alquran) dan merendahkan
        yang lain dengan kitab ini.
      </p> */}
      {/* <div className={styles.hiringAnnouncementContainer}>
        <Trans
          components={{
            link: (
              <Link
                href="https://www.quran.foundation/careers"
                variant={LinkVariant.Blend}
                onClick={onHiringAnnouncementClicked}
                isNewTab
              />
            ),
          }}
          i18nKey="common:footer.hiring"
        />
      </div> */}
    </div>
  );
};

export default TitleAndDescription;

// change this
