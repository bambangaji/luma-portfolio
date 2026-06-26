import { create } from 'zustand';

import dummyPortfolio from '../data/template-json-classification.json';

import type { PortfolioJson } from '../interface/portofolio-json.interface';
import { LandingPageService } from '../services/landing-page-service';

interface PortfolioStore {
  portfolio: PortfolioJson;

  selectedSection: string;

  setSection: (
    section: string
  ) => void;

  setPortfolio: (
    portfolio: PortfolioJson
  ) => void;

  updateHero: (
    hero: PortfolioJson['hero']
  ) => void;
}

export const usePortfolioStore =

  create<PortfolioStore>(
    set => ({
      portfolio:
        LandingPageService.getPortfolio(),

      selectedSection:
        'profile',

      setSection: section =>
        set({
          selectedSection:
            section,
        }),

      setPortfolio:
        portfolio =>
          set({
            portfolio,
          }),

      updateHero: hero =>
        set(state => ({
          portfolio: {
            ...state.portfolio,
            hero,
          },
        })),
    })
  );