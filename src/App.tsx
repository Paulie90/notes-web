import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { Layout } from "components/Layout/Layout";

import { AppRoutes } from "views/views";

import "./i18n";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Layout>
          <AppRoutes />
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
