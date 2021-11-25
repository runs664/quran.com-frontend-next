import { useCallback } from 'react';

import useTranslation from 'next-translate/useTranslation';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import Section from './Section';
import styles from './TafsirSection.module.scss';

import DataFetcher from 'src/components/DataFetcher';
import Counter from 'src/components/dls/Counter/Counter';
import SelectionCard from 'src/components/dls/SelectionCard/SelectionCard';
import Skeleton from 'src/components/dls/Skeleton/Skeleton';
import { setSettingsView, SettingsView } from 'src/redux/slices/navbar';
import {
  MAXIMUM_FONT_STEP,
  MINIMUM_FONT_STEP,
  selectQuranReaderStyles,
  increaseTafsirFontScale,
  decreaseTafsirFontScale,
} from 'src/redux/slices/QuranReader/styles';
import { selectSelectedTafsirs } from 'src/redux/slices/QuranReader/tafsirs';
import QuranReaderStyles from 'src/redux/types/QuranReaderStyles';
import { makeTafsirsUrl } from 'src/utils/apiPaths';
import { areArraysEqual } from 'src/utils/array';
import { TafsirsResponse } from 'types/ApiResponses';

const TafsirSection = () => {
  const { t, lang } = useTranslation('common');
  const dispatch = useDispatch();
  const quranReaderStyles = useSelector(selectQuranReaderStyles, shallowEqual) as QuranReaderStyles;
  const { tafsirFontScale } = quranReaderStyles;
  const selectedTafsirs = useSelector(selectSelectedTafsirs, areArraysEqual);

  const tafsirLoading = useCallback(
    () => (
      <div>
        {selectedTafsirs.map((id) => (
          <Skeleton key={id}>
            <div>{id}</div>
          </Skeleton>
        ))}
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedTafsirs.length],
  );

  const renderTafsirs = useCallback(
    (data: TafsirsResponse) => {
      const firstSelectedTafsir = data.tafsirs.find((tafsir) => tafsir.id === selectedTafsirs[0]);

      let selectedValueString = t('settings.no-tafsir-selected');
      if (selectedTafsirs.length === 1) selectedValueString = firstSelectedTafsir.name;
      if (selectedTafsirs.length > 1)
        selectedValueString = t('settings.value-and-others', {
          value: firstSelectedTafsir.name,
          othersCount: selectedTafsirs.length - 1,
        });

      return (
        <SelectionCard
          label="Selected Translations"
          value={selectedValueString}
          onClick={() => dispatch(setSettingsView(SettingsView.Tafsir))}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedTafsirs.length],
  );

  return (
    <div className={styles.container}>
      <Section>
        <Section.Title>{t('tafsir.title')}</Section.Title>
        <Section.Row>
          <DataFetcher
            loading={tafsirLoading}
            queryKey={makeTafsirsUrl(lang)}
            render={renderTafsirs}
          />
        </Section.Row>
        <Section.Row>
          <Section.Label>{t('tafsir.font-size')}</Section.Label>
          <Counter
            count={tafsirFontScale}
            onDecrement={
              tafsirFontScale === MINIMUM_FONT_STEP
                ? null
                : () => dispatch(decreaseTafsirFontScale())
            }
            onIncrement={
              tafsirFontScale === MAXIMUM_FONT_STEP
                ? null
                : () => dispatch(increaseTafsirFontScale())
            }
          />
        </Section.Row>
      </Section>
    </div>
  );
};

export default TafsirSection;
