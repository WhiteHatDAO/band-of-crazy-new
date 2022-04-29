import React, { forwardRef, useCallback, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import PropTypes from "prop-types";

const Page = forwardRef(({ children, title = "", ...rest }, ref) => {
  const sendPageViewEvent = useCallback(() => {
    // TODO analytics add this page view
  }, []);

  useEffect(() => {
    sendPageViewEvent();
  }, [sendPageViewEvent]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{"Band Of Crazy - " + title}</title>
      </Helmet>
      {children}
    </HelmetProvider>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Page;
