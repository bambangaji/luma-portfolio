import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import AboutPage from "../pages/about"
import NotFoundPage from "../pages/not-found"
import SearchPage from "../pages/searching-page"
import ItemDetailPage from "../pages/item/item-detail-page"
import WhatsappPages from "../pages/whatsapp/whatsapp-page"
import { LandingPage } from "../pages/landing-page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage/> },
      { path: "about", element: <AboutPage /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "whatsapp", element: <WhatsappPages /> },
      { path: "product/:id", element: <ItemDetailPage /> },
    ],
  },
])

export default router
