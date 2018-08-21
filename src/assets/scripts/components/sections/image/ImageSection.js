// Copyright (c) 2018 Dominic Masters
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React from 'react';
import Section from './../Section';
import Image from './../../image/Image';
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
