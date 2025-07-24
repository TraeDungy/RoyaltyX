import { MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const value = i18n.language.startsWith('es') ? 'es' : 'en';

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      variant="standard"
      sx={{ minWidth: 60 }}
    >
      <MenuItem value="en">EN</MenuItem>
      <MenuItem value="es">ES</MenuItem>
    </Select>
  );
}
