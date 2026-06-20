'use client';

import React, { useLayoutEffect } from 'react';

export const WithBodyBackground = (Component: React.ComponentType) => {
  const WrappedComponent = (props: any) => {
    useLayoutEffect(() => {
      const body = document.body;

      body.style.setProperty('backgroundColor', '#F9FAFB');

      return () => {
        body.style.removeProperty('backgroundColor');
      };
    }, []);

    return Component;
  };

  return WrappedComponent;
};
