import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import AboutPage from "../pages/about"
import NotFoundPage from "../pages/not-found"
import SearchPage from "../pages/searching-page"
import ItemDetailPage from "../pages/item/item-detail-page"
import WhatsappPages from "../pages/whatsapp/whatsapp-page"
import { LandingPage } from "../pages/landing-page"
import { BambangAjiPangestuPage } from "../pages/bambang-aji-pangestu/bambang-aji-pangestu-page"
import GenerateResume from "../pages/generate-resume"
import { PortfolioBuilderPage } from "../pages/portfolio-builder-page"
import LoginPage from "../pages/auth/login-page"
import RegisterPage from "../pages/auth/register-page"
import ForgotPasswordPage from "../pages/auth/forgot-password-page"
import DesignExamplePage from "../pages/examples/design-example-page"
import AccountingExamplePage from "../pages/examples/accounting-example-page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "bambang-aji-pangestu", element: <BambangAjiPangestuPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "generate-resume", element: <GenerateResume /> },
      { path: "portofolio-editor", element: <PortfolioBuilderPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "examples/design", element: <DesignExamplePage /> },
      { path: "examples/accounting", element: <AccountingExamplePage /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "whatsapp", element: <WhatsappPages /> },
      { path: "product/:id", element: <ItemDetailPage /> },
    ],
  },
])

export default router
