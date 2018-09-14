import React from 'react';
import { withSection } from './../../../../wrappers/Section';
import Section from './../../Section';
import PageBoundary from './../../../../objects/layout/boundary/PageBoundary';
import Carousel, { CarouselSlide } from './../../../image/carousel/Carousel'

export default withSection((props) => {
  let { section, sections, settings, blocks } = props;

  let slides = [];
  console.log(settings);

  for(let i = 0; i < 10; i++) {
    slides.push(
      <CarouselSlide key={i}>
        Slide {i}
      </CarouselSlide>
    );
  }

  let set = {

  };

  return (
    <Section className={ "c-carousel-section" + (props.className ? " " + props.className : "") }>
      <PageBoundary>
        <Carousel settings={ set }>
          { slides }
        </Carousel>
      </PageBoundary>
    </Section>
  );
});
