import React from 'react';
import { withSection } from './../../../wrappers/Section';

//Components
import Section from './../Section';
import PageBoundary from './../../../objects/layout/boundary/PageBoundary';
import Carousel, { CarouselSlide } from './../../carousel/Carousel'

import CarouselSectionStyles from './CarouselSection.scss';

//Objects
import Image from './../../../objects/image/Image';
import Button from './../../../objects/button/Button';
import ContentBox from './../../../objects/content/box/ContentBox';
import { Title, Subtitle } from './../../../objects/typography/Typography';

const CarouselSectionSlide = (props) => {
  let { block, blockSettings, section, sectionSettings } = props;

  let {
    //Images
    image, imageMobile,

    //Titles
    title, subtitle,

    //Button
    buttonText, buttonUrl,

    //Colors
    titleColor, subtitleColor,

    //Positional
    contentPosition, textAlign
  } = blockSettings;

  //Elements
  let
    imageElement,
    imageMobileElement,
    contentElement,
    titleElement,
    subtitleElement,
    buttonElement,

    contentClazz
  ;

  //Image
  if(image) {
    let c = "c-carousel-section__slide-image";
    imageElement = <Image file={ image } className={c} />;

    let im = imageMobile && imageMobile.value ? imageMobile : image;
    imageMobileElement = <Image file={ im } className={c+" "+c+"--mobile"} />;
  }

  //Content Position
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
    subtitleElement = (
      <Subtitle className="c-carousel-section__slide-subtitle" color={ subtitleColor }>
        { subtitle.value }
      </Subtitle>
    );
  }

  //Button
  if(buttonText && buttonText.value) {
    let to = "#";
    if(buttonUrl && buttonUrl.value) to = buttonUrl.value;
    buttonElement = <Button to={to} className="c-carousel-section__slide-btn">{ buttonText.value }</Button>
  }

  //Text Align
  if(textAlign && textAlign.value) {
    contentClazz = "u-text--"+textAlign.value;
  }

  //Render...
  return (
    <CarouselSlide className="c-carousel-section__slide">
      { imageElement }
      { imageMobileElement }

      <ContentBox medium floating position={ contentPosition } className={contentClazz}>
        { titleElement }
        { subtitleElement }
        { buttonElement }
      </ContentBox>
    </CarouselSlide>
  );
};


export default withSection((props) => {
  let { section, sections, settings, blocks } = props;

  let slides = [];
  console.log(settings);

  blocks.forEach((block, i) => {
    //Add Slide
    slides.push(<CarouselSectionSlide
      block={block}
      index={i}
      blockSettings={block.settingsById}
      section={section}
      sectionSettings={settings}
      key={block.id}
    />);
  });


  //Carousel Settings
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
