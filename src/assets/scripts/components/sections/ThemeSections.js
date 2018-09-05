import React from 'react';
import SectionImportWrapper from './../../wrappers/SectionImportWrapper'

export default {
  BannerSection: SectionImportWrapper(() => import('./banner/BannerSection'))
}
