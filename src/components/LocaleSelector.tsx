import { Button, Menu, MenuItem, Stack } from '@mui/material';
import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { languages, currencies } from '@/config/i18n';
import LanguageIcon from '@mui/icons-material/Language';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function LocaleSelector() {
  const { language, setLanguage, currency, setCurrency } = useLocale();
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);
  const [currAnchor, setCurrAnchor] = useState<null | HTMLElement>(null);

  const handleLangClick = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchor(event.currentTarget);
  };

  const handleCurrClick = (event: React.MouseEvent<HTMLElement>) => {
    setCurrAnchor(event.currentTarget);
  };

  const handleLangClose = () => {
    setLangAnchor(null);
  };

  const handleCurrClose = () => {
    setCurrAnchor(null);
  };

  const handleLangSelect = (lang: string) => {
    setLanguage(lang as any);
    handleLangClose();
  };

  const handleCurrSelect = (curr: string) => {
    setCurrency(curr as any);
    handleCurrClose();
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        startIcon={<LanguageIcon />}
        onClick={handleLangClick}
        size="small"
        color="inherit"
      >
        {languages[language]}
      </Button>
      <Menu
        anchorEl={langAnchor}
        open={Boolean(langAnchor)}
        onClose={handleLangClose}
      >
        {Object.entries(languages).map(([code, name]) => (
          <MenuItem
            key={code}
            onClick={() => handleLangSelect(code)}
            selected={code === language}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>

      <Button
        startIcon={<MonetizationOnIcon />}
        onClick={handleCurrClick}
        size="small"
        color="inherit"
      >
        {currency}
      </Button>
      <Menu
        anchorEl={currAnchor}
        open={Boolean(currAnchor)}
        onClose={handleCurrClose}
      >
        {Object.entries(currencies).map(([code, name]) => (
          <MenuItem
            key={code}
            onClick={() => handleCurrSelect(code)}
            selected={code === currency}
          >
            {code} - {name}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
} 