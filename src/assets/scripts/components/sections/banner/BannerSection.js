import React from 'react';
import ImageSection from './../image/ImageSection';
import PageBoundary from './../../../objects/layout/boundary/PageBoundary';

export default class BannerSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { title, image } = this.props.data.settingsById;

    return (
      <ImageSection {...this.props} file={ image.value }>
        <PageBoundary>
          { title.value }
        </PageBoundary>
      </ImageSection>
    );
  }
}
