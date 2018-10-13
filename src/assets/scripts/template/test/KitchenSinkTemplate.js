import React from 'react';

import Template from './../Template';

import Link from './../../routing/Link';
import PageBoundary from './../../objects/layout/boundary/PageBoundary';
import {
  Title,
  Heading,
  Paragraph
} from './../../objects/typography/Typography';

class KitchenSinkTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Template className="c-kitchen-sink-template">
        <PageBoundary>
          <Title>Title</Title>
          <Heading>Heading 1</Heading>

          <Paragraph>
            Si se tamen minim fore, fabulas do amet, aute voluptate transferrem non admodum
            illustriora o appellat in expetendis ubi ipsum est hic elit culpa quo fabulas,
            in velit summis ab mandaremus, laboris quid eiusmod. Quid occaecat imitarentur
            eu est fugiat illum ex aliquip ex sunt ingeniis hic voluptate, te export quis do
            incurreret. Mentitum illum qui vidisse familiaritatem quo amet ab in quorum
            officia.Quibusdam fidelissimae aut excepteur ea cernantur ut noster ingeniis.
            Quid eiusmod exquisitaque. Occaecat multos eiusmod, litteris quae admodum
            doctrina. Admodum enim cupidatat, eu labore quae enim deserunt.
          </Paragraph>

          <Paragraph>
            E summis tempor si deserunt nam hic ab export minim nulla, enim ex se esse
            laborum ne do te export incurreret. Ubi noster elit te constias ex admodum
            fidelissimae ad mandaremus. Fabulas ipsum mentitum se id proident consectetur, a
            legam litteris comprehenderit, pariatur quorum eiusmod te mandaremus de amet de
            ea qui eram voluptate, est proident an expetendis, quis occaecat et
            iudicem.Nescius aliqua elit ad multos. Incididunt coniunctione non appellat. A
            cillum cohaerescant, cupidatat fugiat enim quo veniam in sint ea est elit
            voluptate, ubi nulla offendit mandaremus, est vidisse illustriora, anim laborum
            a dolor aute, cupidatat cillum fore laborum tamen te iis ea cillum offendit.
          </Paragraph>

          <Heading size="1">Heading 1</Heading>
          <Heading size="2">Heading 2</Heading>
          <Heading size="3">Heading 3</Heading>
          <Heading size="4">Heading 4</Heading>
          <Heading size="5">Heading 5</Heading>
          <Heading size="6">Heading 6</Heading>

          <Heading><Link to="/">Heading CTA</Link></Heading>
          <Paragraph>
            <Link to="/">Paragraph CTA</Link> with some text after it.
          </Paragraph>
        </PageBoundary>
      </Template>
    );
  }
}

export default KitchenSinkTemplate;
