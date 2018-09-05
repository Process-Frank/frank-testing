import React from 'react';
import ImageSection from './../image/ImageSection';
import PageBoundary from './../../../objects/layout/boundary/PageBoundary';
import { withSection } from './../../../wrappers/Section';

class BannerSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { section, settings } = this.props;
    let { title, image } = settings || {};

    return (
      <ImageSection {...this.props} file={ image }>
        <PageBoundary>
          { title.value }
        </PageBoundary>
      </ImageSection>
    );
  }
}

export default withSection(BannerSection);
