import React from 'react';
import { connect } from 'react-redux';

class Image extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = Object.assign({}, this.props);//Let's clone the props

    if(props.asset) {
      //Asset URL
      let asset = ""+props.asset;
      delete props.asset;

      //This is a Shopify based image (maybe, it could also just be an SVG)
      if(this.props.theme.isShopifyImage(asset)) {
        //This is a Shopify Image! Generate a set of requested sizes.
        let sizes = props.sizes || [500, 750, 1000];
        let width = props.width || props.size || 1400;
        if(sizes.indexOf(width) === -1) sizes.push(width);

        //TODO: We may end up adding support for scales here...
        props.sources = props.sources || [];
        for(let i = 0; i < sizes.length; i++) {
          let s = sizes[i];

          props.sources.push({
            width: s,
            src: this.props.theme.getImageURL(asset, s)
          });
        }
      } else {
        props.src = this.props.theme.getAsset(asset);
      }
    }

    //Props.image is essentialy a "detect if sources or src"
    if(props.image) {
      if(Array.isArray(props.image)) {
        props.sources = props.image;
      } else {
        props.src = props.image;
      }
      delete props.image;
    }

    if(props.src) {
      if(props.src.images) props.sources = props.src.images;
      if(props.src.width) props.width = props.src.width;
      if(props.src.height) props.height = props.src.height;
    }

    //Image
    let sourceElements = [];
    let sources = {};

    let defaultSrc = props.src;
    let defaultAlt = props.alt;
    let defaultWidth = props.width;
    let defaultHeight = props.height;

    if(props.sources) {
      //Iterate over supplied sources
      for(let i = 0; i < props.sources.length; i++) {
        let x = props.sources[i];
        let width = x.size || x.width;
        let isLast = (i+1) === props.sources.length;

        for(let scale = 1; scale <= 4; scale++) {
          let scaledWidth = Math.round(width / scale);
          let o = Object.assign({}, x);
          o.scale = scale;
          o.isLast = isLast;
          sources[scaledWidth] = sources[scaledWidth] || [];
          sources[scaledWidth].push(o);
        }
      }

      let keys = Object.keys(sources);
      keys.sort((l, r) => {
        return parseInt(l) - parseInt(r);
      });
      let breakNext = false;
      for(let i = 0; i < keys.length; i++) {
        if(breakNext) break;
        let k = keys[i];//The pixel size

        let ss = sources[k];//Sources at this pixel resolution
        let mediaQuery = '(max-width:'+k+'px)';
        let sss = [];

        let isNextBreak = false;
        if(this.props.maxWidth && (i+1 < keys.length)) {
          if(keys[i+1] > parseInt(this.props.maxWidth)) isNextBreak = true;
        }
        if(isNextBreak) {
          breakNext = true;
          mediaQuery = '(min-width:'+k+'px)';
        }

        if(ss.length && ss[0].isLast) {
          let prev = i > 0 ? keys[i-1] : 0;
          mediaQuery = '(min-width:'+prev+'px)';
        }

        for(let x = 0; x < ss.length; x++) {
          let scale = ss[x];
          let source = scale.src || scale.path;
          sss.push( source + (scale.scale && scale.scale!=1 ? " "+scale.scale+"x" : "") );
        }

        sourceElements.push(
          <source media={mediaQuery} srcSet={ sss.join(", ") } key={i} />
        );
      }
    }

    return (
      <picture>
        { sourceElements }
        <img
          src={ defaultSrc }
          alt={ defaultAlt }
          className={ props.className }
          width={ defaultWidth }
          height={ defaultHeight }
          title={props.title}
        />
      </picture>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    theme: state.theme
  }
}

export default connect(mapStateToProps)(Image);
