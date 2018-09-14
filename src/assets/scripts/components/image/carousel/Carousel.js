import React from 'react';
import CarouselStyles from './CarouselStyles.scss';
import Slider from "react-slick";

//Slide Component
const CarouselSlide = (props) => {
  let clazz = "c-carousel__slide";
  if(props.className) clazz += " " + props.className;

  return (
    <div className={clazz}>
      { props.children }
    </div>
  );
};

//Carousel Wrapper
class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {

  }

  componentWillUmount() {

  }

  render() {
    let {
      children, className, settings
    } = this.props;

    //Setup ClassNames
    let clazz = "c-carousel";

    if(className) clazz += " " + className;

    return (
      <Slider {...settings} className={clazz}>
        { children }
      </Slider >
    );
  }
}

//Export
export {
  CarouselSlide
};

export default Carousel;
