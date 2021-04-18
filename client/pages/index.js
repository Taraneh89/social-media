import React from 'react';
import ProductCategories from '../components/IndexPage/assets/ProductCategories';
import ProductSmokingHero from '../components/IndexPage/assets/ProductSmokingHero';
import AppFooter from '../components/IndexPage/assets/AppFooter';
import ProductHero from '../components/IndexPage/assets/ProductHero';
import ProductValues from '../components/IndexPage/assets/ProductValues';
import ProductHowItWorks from '../components/IndexPage/assets/ProductHowItWorks';
import ProductCTA from '../components/IndexPage/assets/ProductCTA';
import AppAppBar from '../components/IndexPage/assets/AppAppBar';
import withRoot from '../components/IndexPage/withRoot';
import { useSelector } from 'react-redux';

function Index() {
  const state = useSelector((state) => state);

  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
