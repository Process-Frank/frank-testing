import React from 'react';
import { withSection } from './../../../wrappers/Section';

//Components
import Section from './../Section';
import PageBoundary from './../../../objects/layout/boundary/PageBoundary';
import Carousel, { CarouselSlide } from './../../carousel/Carousel'

//Objects
import Image from './../../../objects/image/Image';
import Button from './../../../objects/button/Button';
import ContentBox from './../../../objects/content/box/ContentBox';
import { Title, Subtitle } from './../../../objects/typography/Typography';

export default withSection((props) => {
  let { section, sections, settings, blocks } = props;

  let slides = [];
  console.log(settings);

  blocks.forEach((block) => {
    /*** Slides ***/
    let blockSettings = block.settingsById;
    let {
      image, imageMobile,
      title, subtitle,
      buttonText, buttonUrl,
      titleColor,
      contentPosition
    } = blockSettings;

    let
      imageElement,
      contentElement,
      titleElement,
      subtitleElement,
      buttonElement
    ;
    console.log(blockSettings);

    //Image
    if(image) {
      imageElement = <Image file={ image } className="c-carousel-section__slide-image" />;
    }

    contentPosition = contentPosition && contentPosition.value ? contentPosition.value : "center middle";

    //Title(s)
    if(title && title.value) {
      titleElement = (
        <Title className="c-carousel-section__slide-title" color={ titleColor }>
          { title.value }
        </Title>
      );
    }

    if(subtitle && subtitle.value) {
      subtitleElement = <Subtitle className="c-carousel-section__slide-subtitle">{ subtitle.value }</Subtitle>
    }

    //Button
    if(buttonText && buttonText.value) {
      let to = "#";
      if(buttonUrl && buttonUrl.value) to = buttonUrl.value;
      buttonElement = <Button to={to} className="c-carousel-section__slide-btn">{ buttonText.value }</Button>
    }

    console.log(contentPosition);

    slides.push(
      <CarouselSlide key={ block.id } className="c-carousel-section__slide">
        { imageElement }

        <ContentBox floating position={ contentPosition } className="u-text--center">
          { titleElement }
          { subtitleElement }
          { buttonElement }
        </ContentBox>
      </CarouselSlide>
    );
  });

  let set = {
    arrows: settings.arrows && settings.arrows.value,
    dots: settings.dots && settings.dots.value,
    autoplay: settings.autoplay && settings.autoplay.value,
    adaptiveHeight: settings.autoheight && settings.autoheight.value
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
