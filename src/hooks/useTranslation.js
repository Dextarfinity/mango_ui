import { useAuth } from '../context/AuthContext';
import { t, getSection } from '../utils/translations';

/**
 * Custom hook to use translations based on user's language preference
 * @returns {object} Translation functions
 */
export const useTranslation = () => {
  const { user } = useAuth();
  const language = user?.language || 'en';

  /**
   * Get translation for a specific key
   * @param {string} section - Section name (e.g., 'dashboard', 'scan')
   * @param {string} key - Translation key
   * @returns {string} Translated text
   */
  const translate = (section, key) => {
    return t(language, section, key);
  };

  /**
   * Get all translations for a section
   * @param {string} section - Section name
   * @returns {object} All translations for the section
   */
  const translateSection = (section) => {
    return getSection(language, section);
  };

  return {
    t: translate,
    ts: translateSection,
    language,
    isFilipino: language === 'fil'
  };
};
