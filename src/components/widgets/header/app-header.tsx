import { SegmentedControl } from '@mantine/core';
import { CaretDown, MagnifyingGlass, MapPin } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from 'common/constants/app';
import { AssetPaths } from 'common/constants/assets';
import { buildUrl, NavigationRoutes } from 'common/routes';
import CityPickerModal from 'components/widgets/city-picker/city-picker-modal';
import { useCity } from 'hooks/use-city';
import useLanguage from 'hooks/use-language';
import type { Lang } from 'common/api/model';
import * as styles from './styles.css';

function SearchField() {
  const { t } = useTranslation('layout');
  const router = useRouter();
  const current =
    router.pathname === NavigationRoutes.Films &&
    typeof router.query.q === 'string'
      ? router.query.q
      : '';
  const [value, setValue] = React.useState(current);
  React.useEffect(() => setValue(current), [current]);

  return (
    <form
      role="search"
      className={styles.search}
      onSubmit={(e) => {
        e.preventDefault();
        const q = value.trim();
        router.push(
          buildUrl(NavigationRoutes.Films, { query: q ? { q } : undefined }),
        );
      }}
    >
      <MagnifyingGlass size={18} className={styles.searchIcon} aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder={t('header.searchPlaceholder')}
        aria-label={t('header.search')}
        className={styles.searchInput}
      />
    </form>
  );
}

export default function AppHeader() {
  const { t } = useTranslation('layout');
  const { city } = useCity();
  const { lang, setLanguage } = useLanguage();
  const [cityOpen, setCityOpen] = React.useState(false);

  return (
    <header className={styles.header}>
      {/* The sidebar holds the brand on wide screens */}
      <Link
        href={NavigationRoutes.Home}
        className={styles.compactBrand}
        aria-label={APP_NAME}
      >
        <Image src={AssetPaths.BrandMark} alt="" width={30} height={30} />
      </Link>
      <SearchField />
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cityButton}
          onClick={() => setCityOpen(true)}
          aria-label={`${t('header.city')}: ${city.name}`}
        >
          <MapPin size={16} weight="fill" aria-hidden />
          <span>{city.name}</span>
          <CaretDown size={12} aria-hidden />
        </button>
        <SegmentedControl
          size="xs"
          value={lang}
          onChange={(v) => setLanguage(v as Lang)}
          data={[
            { value: 'id', label: 'ID' },
            { value: 'en', label: 'EN' },
          ]}
          aria-label={t('header.language')}
        />
      </div>
      <CityPickerModal opened={cityOpen} onClose={() => setCityOpen(false)} />
    </header>
  );
}
