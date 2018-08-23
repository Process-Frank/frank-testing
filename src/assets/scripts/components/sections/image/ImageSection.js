import React from 'react';
import Section from './../Section';
import Image from './../../../objects/image/Image';
import ImageSectionStyles from './ImageSection.scss';

export default function(props) {
  let image;
  let clazz = "c-image-section";

  //You can either pass an <Image /> directly, otherwise you can pass a set of valid
  //Image attributes.
  if(props.image) {
    image = props.image;
  } else {
    image = <Image
      {...props}
      children={ null }
      className="c-image-section__image"
    />;
  }

  if(props.className) clazz += " " + props.className;

  return (
    <Section
      {...props}
      className={ clazz }
    >
      { image }
      <div className="c-image-section__content">
        <div className="c-image-section__content-inner">
          { props.children }
        </div>
      </div>
    </Section>
  );
}
